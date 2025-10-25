import express, { type Router } from "express";
import libraryRouter from "./library.routes";
import componentRouter from "./component.routes";

const router: Router = express.Router();

router.use("/libraries", libraryRouter);
router.use("/libraries/:library_id/components", componentRouter);

export default router;
