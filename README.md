# Todo App API

Simple todo API built with Node.js and TypeScript. It uses a local JSON file for storage, so no database is required.

## Setup

```bash
npm install
```

## Run in development

```bash
npm run dev
```

This uses `nodemon` to watch your TypeScript files and restart the server automatically when you save changes.

## Build

```bash
npm run build
```

## Start production build

```bash
npm start
```

## API endpoints

- `GET /todos` list all todos
- `GET /todos/:id` get one todo
- `POST /todos` create a todo
- `PATCH /todos/:id` update title or status
- `DELETE /todos/:id` delete a todo

## Example request

```http
POST /todos
Content-Type: application/json

{
  "title": "Learn TypeScript",
  "status": "todo"
}
```
