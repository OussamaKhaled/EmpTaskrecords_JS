import { Router } from "express";
import { addTask, getTaskgById, getTasks, patchTaskById,deleteParkingById,deleteAllParkings } from "../controllers/task.controller.js";
import { body,param,query } from "express-validator";

const router = Router();


router.post("/",
    body("Label").isLength({ min: 8 }),
    body("Description").isLength({ min: 8 }),
    body("Estimation").isNumeric(),
    addTask);

router.get("/", getTasks)
router.get("/:id", getTaskgById)
router.patch("/:id",
    body("Label").isLength({ min: 8 }),
    patchTaskById)

router.delete("/",
    query("id").isMongoId(), // Validate that the 'id' query parameter is a valid MongoDB ObjectId
    deleteParkingById)

router.delete("/delete-all",
    deleteAllParkings
);

export default router;