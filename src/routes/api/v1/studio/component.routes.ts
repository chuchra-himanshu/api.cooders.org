import express, { type Router } from "express";
import CONTROLLERS from "../../../../controllers";

const router: Router = express.Router();
const {
  createComponent,
  getComponent,
  getComponents,
  updateComponent,
  deleteComponent,
} = CONTROLLERS.V1_CONTROLLERS.COMPONENT_CONTROLLERS;

router.route("/").post(createComponent).get(getComponents);
router
  .route("/:component_id")
  .get(getComponent)
  .patch(updateComponent)
  .delete(deleteComponent);

export default router;
