import { Router } from "express";
import { createPixPayment } from "../controllers/payment-controller";

const router = Router();

router.post("/payments", createPixPayment);

export {router};