#!/bin/bash
# usage: run.sh <name> "<subject>" "<style>"
name=$1; subj=$2; style=$3
cd /c/Users/ameer/Desktop/personal/solarlink/website
timeout 12m "$LOCALAPPDATA/agy/bin/agy.exe" -p "Generate ONE image with your image generation tool and save it as a PNG at C:\Users\ameer\Desktop\personal\solarlink\website\design\img\$name.png (overwrite if present). $style Subject: $subj No people, no text, no logos, no brand names, no watermark. Do not modify any other file. End your reply with only: DONE <path> or FAILED <reason>." --print-timeout 10m0s --add-dir "C:\Users\ameer\Desktop\personal\solarlink\website\design\img" 2>&1 | tail -n 3
