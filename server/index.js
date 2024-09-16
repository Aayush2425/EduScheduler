// alll imports are defined here
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const createClient = require("redis").createClient;
const mongoose = require("mongoose");
const GenerateTimeTable = require("./logic/TimeTableGenerater.js");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "../.env" });
const app = express();
const adminRouter = require("./routes/AdminRouter.js");
const generalDetailsRoutes = require("./routes/GeneralDetailsRouter.js");
const facultyRoutes = require("./routes/FacultyRouter.js");
const resourceRoutes = require("./routes/ResourceRouter.js");
const timetableRoutes = require("./routes/TimeTableRouter.js");
const universityRoutes = require("./routes/UniversityRouter.js");

// routes and middlewares are defined here

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// server and database connection is defined here
app.use(cookieParser());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const client = createClient({
  password: process.env.REDISPASSWORD,
  socket: {
    host: "redis-17169.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17169,
    ConnectionTimeoutError: 1000,
  },
});

app.use("/admin", adminRouter);
app.use("/generalDetails", generalDetailsRoutes);
app.use("/faculty", facultyRoutes);
app.use("/resources", resourceRoutes);
app.use("/timetable", timetableRoutes);
app.use("/university", universityRoutes);
// client.on("error", (err) => {
//   console.log("Redis Client Error", err);
//   if (err.errno == -3008) {
//     console.log("check internet connection");

//     let timeout = 10,
//       count = 1;
//     const interval = setInterval(() => {
//       if (count == 10) {
//         console.log(`retrying in ${timeout} secs`);
//         if (timeout == 0) {
//           clearInterval(interval);
//         }
//         timeout--;
//         count = 1;
//       }
//       count++;
//     }, 100);
//   }
// });

// (async () => {
//   try {
//     await client.connect();
//     console.log("Redis client connected successfully.");

//     // Check if the client is ready before running any commands
//     const pingResult = await client.ping();
//     console.log("Redis Client Ping:", pingResult);

// app.use("/generalDetails", generalDetailsRoutes);
// app.use("/faculty", facultyRoutes);
// app.use("/resources", resourceRoutes);
// app.use("/timetable", timetableRoutes);
// app.use("/university", universityRoutes);
// app.use("/admin", adminRouter);
//   } catch (err) {
//     console.error("Failed to connect to Redis:", err);
//   }
// })();

module.exports = client;
