## Pipeline Database

Web app with simple user interface and intuitive functionality for tracking pipeline integrity.

## Getting Started

Install dependencies by typing either of following comands in root directory:

```bash
npm i
# or
yarn i
```

This project uses some WebAssembly functions written in Rust language. To Compile .rs files to .wasm install Rust by following these [`instructions`](https://www.rust-lang.org/tools/install).

### Build with `wasm-pack build`

```
cd wasm
wasm-pack build
```
Check out [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) to learn how communication between WebAssembly and JavaScript works in Rust.

<br />

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the app.
