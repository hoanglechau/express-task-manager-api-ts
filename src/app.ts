import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();
// create express app
const app: Express = express();
// import routes
import tasks from "./routes/tasks";
// connect to database
import connectDB from "./db/connect";
// import middleware to display 404 Page not found
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

// middleware
app.use(express.static("./public")); // to run the static frontend website
app.use(express.json());

// use routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
// start server
const start = async () => {
  if (process.env.MONGO_URI) {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () => {
        console.log(
          `⚡️[server]: Server is running at http://localhost:${port}`
        );
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Error: Missing MONGO URI");
    return;
  }
};

start();
