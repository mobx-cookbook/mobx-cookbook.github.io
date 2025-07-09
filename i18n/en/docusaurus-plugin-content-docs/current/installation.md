# Installation

### Getting Started

First, make sure you have [Node.js and npm](https://nodejs.org/en/download/) installed on your computer. We recommend using the latest LTS version. In this guide, we'll use TypeScript code examples and React integration, so we need an environment for transpiling and building the project. [Vite](https://vitejs.dev/) is perfect for this purpose:

```sh
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

### MobX

MobX is installed via npm just like any other package:

```sh
npm install mobx
```

### React

There are two packages for integrating MobX with React: `mobx-react-lite` supports only functional components, while `mobx-react` supports both functional and class components.

Due to the widespread adoption of React hooks, it makes sense to enforce the use of functional components. Therefore, installing the `mobx-react-lite` package will be sufficient:

```sh
npm install mobx-react-lite
```