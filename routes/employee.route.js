import { Router } from "express";
import { signIn,getAllemployees, Create , updateClient , deleteClient,checkClientExistenceByFirstName } from "../controllers/employee.controller.js";
import { body , param ,query} from "express-validator";
import multerConfig from "../middlewares/multer-config.js";

//import morgan from "morgan";

const router = Router();


//router.use(morgan("dev"))
router.post("/create",
    multerConfig("image"),
    body("Name").isLength({ min: 3, max: 30 }),
    body("Department").isLength({ min: 3, max: 30 }),
    body("HireDate").isLength({ min: 3, max: 30 }),
    Create
);
router.get("/getAll", getAllemployees)

router.post("/signin",
    //morgan("dev"),
    body("password").isLength({ min: 3, max: 30 }),
    param("phone").isNumeric().isLength({ min: 8, max: 8 }),
    signIn
)

router.put("/update/:clientId",
    multerConfig("image"),
    body("firstName").isLength({ min: 3, max: 30 }),
    body("lastName").isLength({ min: 3, max: 30 }),
    body("password").isLength({ min: 3, max: 30 }),
    body("phone").isNumeric().isLength({ min: 8, max: 8 }),
    updateClient
);

router.delete("/delete/:clientId",
    body("clientId").isMongoId(), // Validate that the 'clientId' in the request body is a valid MongoDB ObjectId
    deleteClient
);

router.get("/check-existence",
    query("firstName").isString().notEmpty(), // Validate that 'firstName' is provided in the query parameters
    checkClientExistenceByFirstName
);
/*router.get("/check-existence/:firstName",
    param("firstName").isString().notEmpty(), // Validate that 'firstName' is provided in the route parameters
    checkClientExistenceByFirstName
);*/
export default router;