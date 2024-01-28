import Taskrecords from "../models/taskrecords.js";
import Task from "../models/task.js";


export const addTaskEmp = async (req, res) => {
    const { employeeId, taskId } = req.params;

    try {

        const task = await Task.findById(taskId);
        if (task.Estimation < 1) {
            return res.status(403).end("tache deja attribuée")
        }

        

        const taskrecords = new Taskrecords({
            employeeId,
            taskId
        });

        await taskrecords.save()
        res.status(200).json(taskrecords)

    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error")
    }
}

export const getEmpTask = async (req, res) => {
    const { employeeId } = req.params;

    try {
        const reservations = await Taskrecords.find({ employeeId });
        res.status(200).json(reservations)

    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error")
    }
}
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.clientId;
        const deletedClient = await Client.findByIdAndDelete(taskId);

        if (!deletedClient) {
            return res.status(404).json({
                message: "task not found"
            });
        }

        res.status(200).json(deletedClient);
    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error");
    }
}