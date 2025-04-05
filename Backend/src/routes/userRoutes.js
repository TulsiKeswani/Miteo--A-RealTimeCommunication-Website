import {Router} from "express";
import {login,register,checkCookie,logout,getAllActivities,addToActivites} from "../controllers/user.controller.js"


const router = Router();

router.route("/login").post(login)
router.route("/signup").post(register)
router.route("/add_to_activity").post(addToActivites)
router.route("/get_all_activity").get(getAllActivities)
router.route("/getCookie").get(checkCookie)
router.route("/logout").post(logout)

export default router;