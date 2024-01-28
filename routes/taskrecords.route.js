import { Router } from "express";
import { addTaskEmp, getEmpTask,deleteTask } from "../controllers/taskrecords.controller.js";
import { body } from "express-validator";
const router = Router();
router.get("/assign/:employeeId/:taskId", addTaskEmp)
router.get("/:employeeId/", getEmpTask)
router.delete("/delete/:taskId",
    body("taskId").isMongoId(), 
    deleteTask
);

export default router;