#!/usr/bin/env bash
set -euo pipefail

if rg -n "^(<<<<<<<|=======|>>>>>>>)" . >/tmp/conflict_markers.txt; then
  echo "Conflict markers found:"
  cat /tmp/conflict_markers.txt
  exit 1
fi

echo "No merge conflict markers found."
