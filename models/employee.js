import {Schema , model} from "mongoose";

const employeeSchema = new Schema(
    {
        Name: String,
        Department: String,
        HireDate: Date,
        image: String
    }
);


export default model("employee", employeeSchema);