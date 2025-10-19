import mongoose from "mongoose";
import { librarySchema } from "../../schemas";

const Library = mongoose.model<LibrarySchemaInterface>(
  "Library",
  librarySchema
);
export default Library;
