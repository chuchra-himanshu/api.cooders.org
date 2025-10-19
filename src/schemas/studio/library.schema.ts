import mongoose, { type Schema } from "mongoose";

const librarySchema: Schema = new mongoose.Schema<LibrarySchemaInterface>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
    },
    platformURL: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default librarySchema;
