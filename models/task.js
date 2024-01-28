import {Schema , model} from "mongoose";

const taskSchema = new Schema(
    {
        Label: String,
        Description: String,
        Estimation: Number,
        
    },
    {
        timestamps: true
    }
);

export default model("task", taskSchema);