import { Request, Response } from "express";
import { APIError, APIResponse, asyncHandler } from "../../../../handlers";
import { Library } from "../../../../models";

const createLibrary = asyncHandler(async (req: Request, res: Response) => {
  const { title, logo, platformURL, slug, visibility } = req.body;

  const existingLibrary = await Library.findOne({ $or: [{ title }, { slug }] });
  if (existingLibrary) {
    return res.status(409).json(
      APIError.send({
        status: 409,
        message:
          existingLibrary.title === title
            ? "Library already exists!"
            : "Slug already associated with another library",
      })
    );
  }

  const library = await Library.create({
    title,
    logo,
    platformURL,
    slug,
    visibility,
  });

  if (!library) {
    return res.status(500).json(
      APIError.send({
        status: 500,
        message: "Something went wrong! Library not created",
      })
    );
  }

  return res.status(201).json(
    APIResponse.send({
      status: 201,
      message: "Library created successfully",
    })
  );
});

const getLibrary = asyncHandler(async (req: Request, res: Response) => {});

const getLibraries = asyncHandler(async (req: Request, res: Response) => {});

const updateLibrary = asyncHandler(async (req: Request, res: Response) => {});

const deleteLibrary = asyncHandler(async (req: Request, res: Response) => {});

export default {
  createLibrary,
  getLibrary,
  getLibraries,
  updateLibrary,
  deleteLibrary,
};
