# Deploying modulsdom-brest.by (Hoster.by)

The Hoster.by shared host can't build Next.js (its process limits kill the build
workers). So we **build locally**, publish the compiled `.next` as a GitHub Release,
and **install that artifact on the server**. Two steps: publish (your machine) →
install (Hoster terminal).

Full mechanics live in [deploy-hoster.sh](deploy-hoster.sh).

---

## Step 1 — Publish a build (on your Mac)

Commit and push your changes first (the publish refuses to run with a dirty tree),
then:

```bash
cd ~/Documents/projects/modular-house
./deploy-hoster.sh publish
```

This validates TypeScript, builds Next.js, packages `.next`, and creates a GitHub
Release. When it finishes it prints the exact install command with the build tag, e.g.:

```
./deploy-hoster.sh install hoster-build-92fea28
```

Copy that tag — you need it in Step 2. (The tag is `hoster-build-<short commit sha>`.)

> If you only changed content already deployed and just want to restart the running
> app, skip to **Restart only** below — no publish needed.

---

## Step 2 — Install on the Hoster.by terminal

### 2a. Log in over SSH

The exact `ssh …` command **and** the password are in **`.hoster-credentials`**
(git-ignored, in the project root — this repo is public, so the login is kept out of
git). Run the `ssh` line from that file; when prompted, paste the password — the
terminal won't show characters as you type.

### 2b. Go to the site directory, pull the repo, install the build

```bash
cd ~/www/modulsdom-brest.by
git pull origin main
./deploy-hoster.sh install hoster-build-92fea28
```

Replace `hoster-build-92fea28` with the tag printed in Step 1.

That single `install` command does everything:
- downloads the compiled `.next` from the GitHub Release,
- swaps it in,
- restarts the app under PM2 (`pm2 restart modulsdom-brest`),
- saves the PM2 process list.

On success it prints:

```
Deployment complete: https://modulsdom-brest.by
```

### 2c. Verify

Open <https://modulsdom-brest.by> (hard-refresh, Cmd+Shift+R). Quick check that the
favicon now serves:

```bash
curl -sI https://modulsdom-brest.by/favicon.ico | head -1   # expect: HTTP/… 200
```

---

## Restart only (no new build)

If the app is misbehaving and you just want to bounce it, from the Hoster terminal:

```bash
export PATH="/var/www/h211034/data/.nvm/versions/node/v26.4.0/bin:/usr/lib/ispnodejs/bin:$PATH"
pm2 restart modulsdom-brest --update-env
pm2 status modulsdom-brest
```

> The `export PATH` line is needed because Hoster doesn't expose Node in plain SSH
> sessions, and PM2 itself calls `node`.

---

## Troubleshooting

```bash
# from the Hoster terminal, after the export PATH line above:
pm2 status                 # is modulsdom-brest "online"?
pm2 logs modulsdom-brest   # tail runtime logs (Ctrl+C to exit)
pm2 describe modulsdom-brest
```

- **`node: command not found` when running pm2** → you skipped the `export PATH` line.
- **`install` says "archive has no BUILD_ID"** → the release didn't upload correctly;
  re-run `./deploy-hoster.sh publish` on your Mac and use the new tag.
- **`git pull` conflicts** → the server repo should only ever be fast-forwarded; run
  `git reset --hard origin/main` then re-pull (safe: `.env.production` is git-ignored
  and stays put).
- **`.env.production` lives only on the server** — never overwritten by deploys. If
  it's missing, the lead email/env-based features won't work.

## Reference

| Thing            | Value                                            |
|------------------|--------------------------------------------------|
| SSH login        | see `.hoster-credentials` (git-ignored — host + password) |
| Site dir         | `~/www/modulsdom-brest.by`                       |
| PM2 app name     | `modulsdom-brest`                                |
| GitHub repo      | `Yury-Soika/modular-house` (deploys from `main`) |
| Live URL         | https://modulsdom-brest.by                       |

---

## Hoster REST API (DNS / cloud — not the deploy)

Separate from SSH: Hoster's HTTP API manages **DNS records and cloud VMs**, not the
shared-hosting site or its deploy. Credentials (`ACCESS_KEY` / `SECRET_KEY`) live in
the git-ignored `.hoster-credentials`; [hoster-api.sh](hoster-api.sh) uses them:

```bash
./hoster-api.sh token              # verify auth (prints userId + access token)
./hoster-api.sh get /dns/orders    # list DNS orders
./hoster-api.sh get /cloud/orders  # list cloud orders
```

It exchanges the key pair for a short-lived Access-Token, then sends the
`X-User-Id` + `Access-Token` headers each endpoint needs. The Hoster API is
IP-filtered — run it from your machine (it may time out elsewhere). Override the base
with `HOSTER_API_BASE=…` if `https://api.hoster.by` isn't the right host for your
account.
