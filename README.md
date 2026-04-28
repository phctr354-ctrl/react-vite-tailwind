# React + Vite + TypeScript + Tailwind CSS

A minimal web app scaffold built with modern tooling.

## Tech Stack

- **[Vite](https://vitejs.dev/)** – lightning-fast build tool and dev server
- **[React 18](https://react.dev/)** – UI library
- **[TypeScript](https://www.typescriptlang.org/)** – static type checking
- **[Tailwind CSS](https://tailwindcss.com/)** – utility-first CSS framework

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- npm v9 or newer (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/phctr354-ctrl/react-vite-tailwind.git
cd react-vite-tailwind

# 2. Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page hot-reloads on file changes.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
react-vite-tailwind/
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx          # Root component
│   ├── index.css        # Tailwind directives
│   └── main.tsx         # React entry point
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## License

[Apache 2.0](./LICENSE)