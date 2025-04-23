import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./utils/db";
import userRouter from "./routes/user";
import exerciseRouter from "./routes/exercise";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

databaseConnection()
  .then(() => {
    console.log("database has been connected!");
  })
  .catch(() => {
    console.log("error while connection to mongodb database");
  });

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/exercise", exerciseRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
