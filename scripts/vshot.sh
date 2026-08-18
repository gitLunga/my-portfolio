#!/usr/bin/env bash
# Viewport-height capture of every route in both themes. Much cheaper than the
# full-page variant in baseline.sh and enough to catch cascade regressions.
set -euo pipefail
LABEL="${1:?usage: vshot.sh <label>}"
BASE="${BASE_URL:-http://localhost:4173/my-portfolio}"
OUT="${SHOT_DIR:?SHOT_DIR must be set}/$LABEL"
mkdir -p "$OUT"
for route in "home:/" "about:/about" "projects:/project" "resume:/resume" "contact:/contact"; do
  name="${route%%:*}"; path="${route#*:}"
  for theme in dark light; do
    node scripts/shot.mjs "$BASE$path" "$OUT/${name}-${theme}.png" \
      --reduced --width=1400 --height=900 --theme="$theme" >/dev/null
  done
done
echo "captured -> $OUT"
