import express, { type Router } from "express";
import v1Router from "./v1/index.routes";

const router: Router = express.Router();

router.use("/v1", v1Router);

export default router;
