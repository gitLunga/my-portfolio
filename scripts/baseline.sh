#!/usr/bin/env bash
# Captures every route in both themes into a named folder, so a refactor can
# be checked for visual parity instead of eyeballed.
#
#   bash scripts/baseline.sh before
#   ...refactor...
#   bash scripts/baseline.sh after
#   node scripts/compare.mjs before after
set -euo pipefail

LABEL="${1:?usage: baseline.sh <label>}"
BASE="${BASE_URL:-http://localhost:4173/my-portfolio}"
OUT="${SHOT_DIR:?SHOT_DIR must be set}/$LABEL"

mkdir -p "$OUT"

for route in "home:/" "about:/about" "projects:/project" "resume:/resume" "contact:/contact"; do
  name="${route%%:*}"
  path="${route#*:}"
  for theme in dark light; do
    node scripts/shot.mjs "$BASE$path" "$OUT/${name}-${theme}.png" \
      --reduced --full --width=1440 --height=900 --theme="$theme"
  done
done

echo "captured -> $OUT"
