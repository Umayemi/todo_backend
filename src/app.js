import express from "express";
import routes from "./todos.route.js";

const app = express();

app.use(express.json());

app.use(routes);


app.use((req, res) => {
  res.status(404).send({ message: `Route ${req.method} ${req.url} not found` });
});


export default app;
