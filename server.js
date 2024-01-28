import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { errorHandler, notFoundError } from "./middlewares/error-handler.mjs";
import employeeRouter from "./routes/employee.route.js";
import taskRouter from "./routes/task.route.js";
import taskrecordsRouter from "./routes/taskrecords.route.js";

const app = express();

mongoose.connect("mongodb://localhost:27017/examen2cinfo2324", { family: 4 })
    .then(() => {
        console.log("database connected");
    })
    .catch((e) => {
        console.log(e);
    });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));



const PORT = process.env.PORT || 9090;
const hostname = "127.0.0.1";

app.use("/employees", employeeRouter)
app.use("/tasks", taskRouter)
app.use("/taskrecords", taskrecordsRouter)


app.use(notFoundError)
app.use(errorHandler)
app.listen(PORT, hostname, () => {
    console.log(`server running on http://${hostname}:${PORT}`);
})