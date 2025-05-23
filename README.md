# Template Project

Minimal Webpack starter: development server + production build.

## Requirements
- Node.js ≥14  
- npm ≥6  

## Installation
```bash
git clone <repo-url>
cd template-repo
npm install
```

## Scripts
- `npm start` → dev server (webpack.dev.js)  
- `npm run build` → prod bundle (webpack.prod.js)  

## Project Structure
```
template-repo/
├─ src/
│  ├─ index.html
│  ├─ scripts/
│  │  └─ index.js
│  └─ styles/
│     ├─ reset.css
│     ├─ style.css
│     └─ fonts.css
├─ webpack.common.js
├─ webpack.dev.js
├─ webpack.prod.js
├─ package.json
└─ .gitignore
```