import { sendRecoveryRequest } from "controllers"
import express from "express"

const recoveryRouter = express.Router()

recoveryRouter.post("/recovery", sendRecoveryRequest)
recoveryRouter.put("/reset" )

export default recoveryRouter