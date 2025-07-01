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
// import cors from "cors";
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
app.set("port", process.env.PORT || 8000);
app.use(cookieParser());

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://miteo-a-realtimecommunication.onrender.com"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );
// app.options("*", cors());
const server = createServer(app);
const io = connectToSocket(server);


app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/miteo/user", userRoutes);

server.listen(app.get("port"), () => {
  console.log(`app starts listning on ${app.get("port")}`);
});
