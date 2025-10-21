import express, { type Router } from "express";
import CONTROLLERS from "../../../../controllers";

const router: Router = express.Router();
const {
  createLibrary,
  getLibrary,
  getLibraries,
  updateLibrary,
  deleteLibrary,
} = CONTROLLERS.V1_CONTROLLERS.LIBRARY_CONTROLLERS;

router.route("/").post(createLibrary).get(getLibraries);
router
  .route("/:library_id")
  .get(getLibrary)
  .patch(updateLibrary)
  .delete(deleteLibrary);

export default router;
