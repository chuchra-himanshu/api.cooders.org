import mongoose from "mongoose";
import { componentSchema } from "../../schemas";

const Component = mongoose.model<ComponentSchemaInterface>(
  "Component",
  componentSchema
);
export default Component;
