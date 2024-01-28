import {Schema , model, Types } from "mongoose";

const taskrecordsSchema = new Schema(
    {
        TaskId: {
            type: Types.ObjectId,
            ref: "task"
        },
        EmployeeId: {
            type: Types.ObjectId,
            ref: "employee"
        },
        StartDate: {
            type: Date,
            default: new Date()
        }
    }
);


export default model("taskrecords", taskrecordsSchema);