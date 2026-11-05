import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todoRoutes";

const app = express();
const port = config.port;
//parser
app.use(express.json());
//initialize database
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World! hello");
});

//post users data into DB
app.use("/users", userRoutes);

/*------------------TODO TABLE CRUD----------------*/

//post todo
app.use("/todos", todoRoutes);




//not found route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
