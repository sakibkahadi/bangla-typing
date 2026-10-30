# Bangla Typing Practice — Next.js

This is a Next.js App Router conversion of the provided standalone HTML practice page.

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Features
- Bangla typing practice with optional live character-color feedback, off by default
- Font selection (SutonnyMJ, Nirmala UI, Times New Roman) and font size
- Bangla and English typing practice, including a 500-word English passage about Tarique Rahman's Japan visit
- Preset passages and editable custom text
- Selectable practice duration
- Live word count, timer, WPM and accuracy
- Restart and end-of-session results with a modal showing word-level errors

## WPM rule
WPM is calculated as **whitespace-separated words typed ÷ elapsed time in minutes**. For example, 17 words typed in 1 minute displays 17 WPM. This intentionally follows the requested rule rather than the conventional 5-characters-per-word typing-test formula.

## SutonnyMJ note
SutonnyMJ must be installed on the computer to display with that font. The text still needs to be Bijoy-encoded for correct legacy-font rendering.
