// alll imports are defined here
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/AdminRouter.js");
const generalDetailsRoutes = require("./routes/GeneralDetailsRouter.js");
const facultyRoutes = require("./routes/FacultyRouter.js");
const resourceRoutes = require("./routes/ResourceRouter.js");
const timetableRoutes = require("./routes/TimeTableRouter.js");
const universityRoutes = require("./routes/UniversityRouter.js");

dotenv.config({ path: "../.env" });
const app = express();

// routes and middlewares are defined here

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/admin", adminRoutes);
app.use("/generalDetails", generalDetailsRoutes);
app.use("/faculty", facultyRoutes);
app.use("/resources", resourceRoutes);
app.use("/timetable", timetableRoutes);
app.use("/university", universityRoutes);

// server and database connection is defined here
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
