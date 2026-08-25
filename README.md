# operations-dashboard

![React](https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript&logoColor=white)
![styled-components](https://img.shields.io/badge/styled--components-5-DB7093?logo=styledcomponents&logoColor=white)

Login-protected operations dashboard SPA built in 2021 as a client project:
calculation setups, operational records and a summary dashboard behind JWT
authentication.

## Features

- JWT-based authentication flow with protected routes
- Operations area for day-to-day records
- Configurable calculation setups
- Summary dashboard

## Tech stack

| Layer | Tools |
|---|---|
| Language | TypeScript |
| UI | React 17, Create React App, styled-components, react-select, react-input-mask |
| Forms and data | react-hook-form, axios, js-cookie, react-jwt |
| Routing | react-router-dom 5 |

## How to run

```bash
# requirements: Node.js 14-16 era runtime (see legacy note)
yarn install
cp .env.example .env    # set APP_WEB_URL
yarn start              # http://localhost:3000
```

The app expects a companion REST API; point `APP_WEB_URL` at the correct
callback URL for your environment.

## Legacy note

Client project from 2021 with era-pinned dependencies (React 17, CRA 4,
TypeScript 4.3). Expect friction on current Node versions without upgrades.
Estimated modernization effort if picked up later: small (half-day), mainly
migrating CRA to Vite and bumping dependencies. No fixes are planned as part
of this cleanup phase.

## License

[MIT](LICENSE)

## Author

Built by [Tiago Gonçalves de Castro](https://github.com/tiagogcastro)
· [LinkedIn](https://www.linkedin.com/in/tiagogcastro)
