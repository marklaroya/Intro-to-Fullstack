import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  // you can change this to your frontend's URL in production
  // example: http://myfrontend.com if deployed or http://localhost:3000 if running locally
  // for production, you should set this to the actual domain of your frontend application
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
console.log("CORS Options", corsOptions);

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// routes to be imported

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

// declare the routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


// example route: http://localhost:4000/api/v1/users/register

export default app;