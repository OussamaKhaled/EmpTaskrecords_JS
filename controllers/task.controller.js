import { validationResult } from "express-validator";
import Task from "../models/task.js";

export const addTask = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({
            validationError: validationResult(req).array()
        });
    }
    try {
        const task = new Task(req.body);
        

        await task.save();
        const response = await Task.findById(task._id).select('_id Label Description Estimation').exec();
        res.status(201).json(response)
        
    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error")
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .where("Estimation").gt(1)
            .select("_id Label Description Estimation createdAt updatedAt ")
            .exec();

        res.status(200).json(tasks)
    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error")
    }
}
export const getTaskgById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        res.status(200).json(task)
    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error")
    }
}


export const patchTaskById = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({
            validationError: validationResult(req).array()
        });
    }
    
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndUpdate(id, { Label: req.body.Label }, { new: true });

        res.status(200).json(task)
    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error")
    }
}

export const deleteParkingById = async (req, res) => {
    try {
        const id = req.query.id;

        // Validate id or handle it appropriately based on your use case

        const deletedParking = await Task.findByIdAndDelete(id);

        if (!deletedParking) {
            return res.status(404).json({
                message: "Parking not found"
            });
        }

        res.status(200).json(deletedParking);
    } catch (e) {
        console.error(e);
        res.status(500).end("Internal Server Error");
    }
}
export const deleteAllParkings = async (req, res) => {
    try {
        // Perform the deletion of all parkings
        const result = await Task.deleteMany({});

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "No parkings found to delete"
            });
        }

        res.status(200).json({
            message: "All parkings deleted successfully",
            deletedCount: result.deletedCount
        });
    } catch (e) {
        console.error(e);
        res.status(500).end("Internal Server Error");
    }
}