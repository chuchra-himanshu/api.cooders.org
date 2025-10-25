import mongoose, { type Schema } from "mongoose";

const componentSchema: Schema = new mongoose.Schema<ComponentSchemaInterface>(
  {
    library: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
    },
    docURL: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    visibility: {
      type: Boolean,
      required: true,
      default: true,
    },
    deprecated: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default componentSchema;
