#!/usr/bin/env bash
#
# Thin client for the Hoster.by REST API (cloud VMs + DNS records + billing).
#
# It reads ACCESS_KEY / SECRET_KEY from .hoster-credentials (git-ignored),
# exchanges them for a short-lived Access-Token via
# POST /service/account/create/token, then calls the API with the
# X-User-Id + Access-Token headers the endpoints require.
#
# NOTE: this API manages cloud/DNS resources — it does NOT SSH into the shared
# host and is NOT part of the modulsdom-brest.by deploy (see DEPLOY.md for that).
#
# Usage:
#   ./hoster-api.sh token                 # print userId + access token
#   ./hoster-api.sh get   /dns/orders
#   ./hoster-api.sh get   /cloud/orders
#   ./hoster-api.sh post  /dns/orders/<id>/records/a  '{"name":"@","ip":"1.2.3.4"}'
#   ./hoster-api.sh patch /cloud/orders/<id>/vm/<vmId>/reboot
#
# Override the base URL if needed:
#   HOSTER_API_BASE=https://api.hoster.by ./hoster-api.sh get /dns/orders
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CRED="$ROOT/.hoster-credentials"
BASE="${HOSTER_API_BASE:-https://api.hoster.by}"

[[ -f "$CRED" ]] || { echo "Missing $CRED (holds ACCESS_KEY/SECRET_KEY)." >&2; exit 1; }
ACCESS_KEY="$(grep -E '^ACCESS_KEY=' "$CRED" | tail -1 | cut -d= -f2-)"
SECRET_KEY="$(grep -E '^SECRET_KEY=' "$CRED" | tail -1 | cut -d= -f2-)"
[[ -n "${ACCESS_KEY:-}" && -n "${SECRET_KEY:-}" ]] || {
  echo "ACCESS_KEY/SECRET_KEY not found in $CRED" >&2; exit 1; }

# Exchange the long-lived key pair for a short-lived access token.
# Prints:  <userId><TAB><accessToken>
get_token() {
  local resp
  resp="$(curl -sS -m 30 -X POST "$BASE/service/account/create/token" \
    -H "Access-Key: $ACCESS_KEY" -H "Secret-Key: $SECRET_KEY" \
    -H "Content-Type: application/json")" || {
      echo "!! Token request failed (network / base URL). BASE=$BASE" >&2; return 1; }
  printf '%s' "$resp" | python3 -c '
import sys, json
try:
    p = json.load(sys.stdin).get("payload", {})
except Exception:
    print("!! Unexpected auth response:", file=sys.stderr); sys.exit(1)
uid, tok = p.get("userId", ""), p.get("accessToken", "")
if not tok:
    sys.exit(1)
print(f"{uid}\t{tok}")
'
}

cmd="${1:-help}"; shift || true
case "$cmd" in
  token)
    if ! line="$(get_token)"; then echo "Auth failed." >&2; exit 1; fi
    printf 'userId=%s\naccessToken=%s\n' "${line%%$'\t'*}" "${line#*$'\t'}"
    ;;
  get|post|patch|delete|put)
    path="${1:-}"; body="${2:-}"
    [[ -n "$path" ]] || { echo "Usage: $0 $cmd /path [json-body]" >&2; exit 1; }
    if ! line="$(get_token)"; then echo "Auth failed." >&2; exit 1; fi
    uid="${line%%$'\t'*}"; tok="${line#*$'\t'}"
    args=(-sS -m 60 -X "$(printf '%s' "$cmd" | tr '[:lower:]' '[:upper:]')" "$BASE$path"
          -H "X-User-Id: $uid" -H "Access-Token: $tok" -H "Content-Type: application/json")
    [[ -n "$body" ]] && args+=(-d "$body")
    curl "${args[@]}"; echo
    ;;
  *)
    sed -n '2,30p' "$0" | sed 's/^# \{0,1\}//; s/^#$//'
    ;;
esac
