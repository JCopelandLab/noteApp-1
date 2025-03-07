## OPTIONS FOR RUNNING THE APPLCATION

## creating the server USING db.json file. Required to get data

npx json-server --port=<portNumberHere> --watch db.json

## Start Application

npm run dev

## Run JSON-Server from project directory without specifying parameters

npm run server

npm run dev

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

index.html CSP; Content-Security Policy meta tag:

<meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *;**script-src 'self' http://localhost:300/ 'unsafe-inline' 'unsafe-eval';** "
    />

    - Sometimes, the meta tag is the only way to deliver the Content-Secuirty Policy to the page.

    - There is no strict default-src directives; https://csp.withgoogle.com/docs/strict-csp.html

<!--
quandary: the siimplicity of data manipulation based on resources' button clicks.
No string user input = limit data sanitation on specific functions
 -->
