import { Router } from "express";
import { registerUser , loginUser ,logOutUser , getUsersByRole
} 
from "../controller/user.controller.js";
// import { verifyJwt as verifyRoute } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
  registerUser
);

router.route("/login").post(loginUser);


//secure routes 

router.get('/users', getUsersByRole);

// router.route("/logout").post(verifyRoute , logOutUser);


export default router;
 