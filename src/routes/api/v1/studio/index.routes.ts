import express, { type Router } from "express";
import libraryRouter from "./library.routes";

const router: Router = express.Router();

router.use("/libraries", libraryRouter);

export default router;
