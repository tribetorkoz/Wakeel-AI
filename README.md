<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/banner-light.svg">
  <img src="./assets/banner-dark.svg" alt="Wakeel banner" width="100%">
</picture>

<br>

<img src="https://img.shields.io/badge/React-161B22?style=flat-square&labelColor=0D1117&logo=react&logoColor=F97316" alt="React">
<img src="https://img.shields.io/badge/TypeScript-161B22?style=flat-square&labelColor=0D1117&logo=typescript&logoColor=F97316" alt="TypeScript">
<img src="https://img.shields.io/badge/Gemini-161B22?style=flat-square&labelColor=0D1117&logo=googlegemini&logoColor=F97316" alt="Gemini">
<img src="https://img.shields.io/badge/Arabic-161B22?style=flat-square&labelColor=0D1117&logo=googletranslate&logoColor=F97316" alt="Arabic">

<br><br>

<a href="#quick-start">Quick Start</a> · <a href="#features">Features</a>

</div>

## Overview

Legal work in Arabic is not English legal work with a different font. Terminology, citation conventions, and the structure of an argument all differ. **Wakeel** is an Arabic-first assistant: you bring case material, and it drafts and reasons in Arabic rather than translating into English and back.

> **Status:** under active development. The previous deployment is offline and will be relinked once an authenticated demo is available.

## Features

| | |
|---|---|
| **Arabic-native drafting** | Prompts and output are structured in Arabic from the start, not translated |
| **Case-grounded reasoning** | Reasons over supplied material rather than generic legal knowledge |
| **RTL-first interface** | Layout and typography built for right-to-left reading |
| **Gemini integration** | Model calls isolated behind a single service boundary |

## Stack

React 18 · TypeScript · Vite · Google Gemini · Tailwind CSS

## Quick Start

```bash
git clone https://github.com/tribetorkoz/wakeel-legal-ai.git
cd wakeel-legal-ai
npm install
cp .env.example .env    # GEMINI_API_KEY
npm run dev
```

> No `.env.example` yet? Create one with `GEMINI_API_KEY=`. This project requires a Google AI Studio key.


## License

MIT
