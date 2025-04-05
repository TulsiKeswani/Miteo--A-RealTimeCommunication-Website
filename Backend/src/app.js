import dotenv from "dotenv";

if(process.env.NODE_ENV != "production"){
  dotenv.config();
  console.log("NODE_ENV:", dotenv.config());
}
console.log("NODE_ENV:", process.env.NODE_ENV);

import express from "express";

import { createServer } from "node:http";
import { Server } from "socket.io";
import { mongoose } from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";


main()
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(
    process.env.DB_URL
  );
}
const app = express();

app.use(cookieParser());

app.use(
  cors({
  origin: ["https://miteo-a-realtimecommunication.onrender.com",`http://localhost:${app.get("port")}`],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const server = createServer(app);
const io = connectToSocket(server);
app.set("port", process.env.PORT || 8000);

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/miteo/user", userRoutes);

server.listen(app.get("port"), () => {
  console.log(`app starts listning on ${app.get("port")}`);
});
