#!/usr/bin/env bash

# Repeatable deployment for modulsdom-brest.by on Hoster.by.
#
# Why this exists:
# Hoster.by can run the Next.js server, but its shared-hosting process limits
# abort Next.js page-generation workers. We therefore build on the development
# machine, publish only the compiled .next directory as a GitHub Release asset,
# and install that artifact on the host before restarting PM2.
#
# Publish from the local project:
#   ./deploy-hoster.sh publish
#
# Install on Hoster.by after publishing (the publish command prints the tag):
#   cd ~/www/modulsdom-brest.by
#   git pull origin main
#   ./deploy-hoster.sh install hoster-build-<commit>
#
# Keep .env.production only on the server. It is intentionally ignored by Git.

set -euo pipefail

REPOSITORY="Yury-Soika/modular-house"
APP_NAME="modulsdom-brest"
SOCKET_PATH="/var/www/h211034/data/nodejs/5.sock"
NODE_PATH="/var/www/h211034/data/.nvm/versions/node/v26.4.0/bin/node"
PM2_PATH="/usr/lib/ispnodejs/bin/pm2"

# Hoster.by does not expose Node in non-login SSH sessions. PM2 itself uses
# /usr/bin/env node, so both the selected application runtime and ISP binaries
# must be available before any PM2 command runs.
export PATH="$(dirname "$NODE_PATH"):/usr/lib/ispnodejs/bin:$PATH"

publish() {
  command -v gh >/dev/null || { echo "GitHub CLI (gh) is required." >&2; exit 1; }
  command -v npm >/dev/null || { echo "npm is required." >&2; exit 1; }

  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "Commit your tracked changes before publishing a release." >&2
    exit 1
  fi

  local revision tag asset archive
  revision="$(git rev-parse --short HEAD)"
  tag="hoster-build-${revision}"
  asset="modulsdom-next-${revision}.tar.gz"
  archive="${TMPDIR:-/tmp}/${asset}"

  echo "Validating TypeScript..."
  npx tsc --noEmit

  echo "Building Next.js locally..."
  NEXT_TELEMETRY_DISABLED=1 npm run build

  echo "Packaging .next without the build cache..."
  tar -czf "$archive" --exclude='.next/cache' .next

  if gh release view "$tag" --repo "$REPOSITORY" >/dev/null 2>&1; then
    echo "Release $tag already exists; replacing its deployment asset..."
    gh release upload "$tag" "$archive" --repo "$REPOSITORY" --clobber
  else
    gh release create "$tag" "$archive" \
      --repo "$REPOSITORY" \
      --target main \
      --title "Hoster.by build ${revision}" \
      --notes "Compiled Next.js production output for Hoster.by. Source commit: ${revision}."
  fi

  rm -f "$archive"

  echo
  echo "Release published. On Hoster.by run:"
  echo "  cd ~/www/modulsdom-brest.by"
  echo "  git pull origin main"
  echo "  ./deploy-hoster.sh install $tag"
}

install_release() {
  local tag="${1:-}"
  if [[ -z "$tag" || "$tag" != hoster-build-* ]]; then
    echo "Usage: ./deploy-hoster.sh install hoster-build-<commit>" >&2
    exit 1
  fi

  local revision asset archive url
  revision="${tag#hoster-build-}"
  asset="modulsdom-next-${revision}.tar.gz"
  archive="${TMPDIR:-$HOME/tmp}/${asset}"
  url="https://github.com/${REPOSITORY}/releases/download/${tag}/${asset}"

  echo "Installing production dependencies..."
  npm ci --omit=dev --no-audit --no-fund

  if test -f .env.production && grep -Eq '^DATABASE_URI=.+' .env.production && grep -Eq '^PAYLOAD_SECRET=.+' .env.production; then
    echo "Applying PostgreSQL migrations..."
    PAYLOAD_LOAD_PRODUCTION_ENV=1 npm run cms:migrate

    if [[ -n "${CMS_ADMIN_EMAIL:-}" && -n "${CMS_ADMIN_PASSWORD:-}" ]]; then
      echo "Seeding CMS content and administrator..."
      PAYLOAD_LOAD_PRODUCTION_ENV=1 npm run cms:seed
    fi
  else
    echo "Payload is inactive: DATABASE_URI and PAYLOAD_SECRET are not configured. Skipping CMS migrations."
  fi

  mkdir -p media

  mkdir -p "$(dirname "$archive")"
  echo "Downloading $tag..."
  curl -fL "$url" -o "$archive"

  echo "Installing compiled build..."
  rm -rf .next
  tar -xzf "$archive"
  rm -f "$archive"
  test -f .next/BUILD_ID || { echo "Deployment archive has no BUILD_ID." >&2; exit 1; }

  echo "Restarting $APP_NAME..."
  if "$PM2_PATH" describe "modulsdom-brest.by" >/dev/null 2>&1; then
    "$PM2_PATH" delete "modulsdom-brest.by"
  fi
  if "$PM2_PATH" describe "$APP_NAME" >/dev/null 2>&1; then
    # Recreate the entry so legacy npm wrappers/cluster settings cannot survive.
    "$PM2_PATH" delete "$APP_NAME"
  fi
  HOSTER_NODE_PATH="$NODE_PATH" "$PM2_PATH" start ecosystem.config.cjs --only "$APP_NAME"

  "$PM2_PATH" save
  "$PM2_PATH" status "$APP_NAME"
  echo "Deployment complete: https://modulsdom-brest.by"
}

case "${1:-}" in
  publish)
    publish
    ;;
  install)
    install_release "${2:-}"
    ;;
  *)
    echo "Usage:"
    echo "  ./deploy-hoster.sh publish"
    echo "  ./deploy-hoster.sh install hoster-build-<commit>"
    exit 1
    ;;
esac
