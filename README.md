# Backend

## Development server

Create .env file, you can refer to .env.example file for the environment variables

To start a local development server, run:

```bash
npm run dev
```

Once the server is running, open your browser and navigate to `http://localhost:8080/`. 
Please refer API endpoints in detail through swagger api at `/` route.

## Features

- Prisma ORM used to connect with database
- Paginated API with filtering in `/browse` endpoint for performant lookup up through the media titles in client side
- Encrypts password using `bcrypt` package before saving it to the mongodb database
- Generates JWT based access tokens, which can be used to access protected endpoints. (`/browse`)

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. To run the build version use the command:

```bash
npm run start
```
