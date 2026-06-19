import express from "express";
import routes from "./todos.route";
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
    ],
    credentials: true,
  })
);
app.use(routes);


app.use((req, res) => {
  res.status(404).send({ message: `Route ${req.method} ${req.url} not found` });
});


export default app;
