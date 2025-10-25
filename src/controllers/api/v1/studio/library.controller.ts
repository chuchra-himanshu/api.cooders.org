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

const getLibrary = asyncHandler(async (req: Request, res: Response) => {
  const { library_id } = req.params;

  if (!library_id) {
    return res.status(403).json(
      APIError.send({
        status: 403,
        message: "Please provide a valid library ID",
      })
    );
  }

  const library = await Library.findOne({
    _id: library_id,
    isDeleted: false,
    visibility: true,
  });
  if (!library) {
    return res.status(404).json(
      APIError.send({
        status: 404,
        message: "Library not found",
      })
    );
  }

  return res.status(200).json(
    APIResponse.send({
      status: 200,
      message: "Library details fetched successfully",
      data: library,
    })
  );
});

const getLibraries = asyncHandler(async (req: Request, res: Response) => {
  const libraries = await Library.find({ isDeleted: false, visibility: true });

  if (!libraries || libraries.length === 0) {
    return res.status(404).json(
      APIError.send({
        status: 404,
        message: "Libraries not found",
      })
    );
  }

  return res.status(200).json(
    APIResponse.send({
      status: 200,
      message: "Libraries details fetched successfully",
      data: libraries,
    })
  );
});

const updateLibrary = asyncHandler(async (req: Request, res: Response) => {
  const { title, logo, platformURL, slug, visibility } = req.body;

  const { library_id } = req.params;

  if (!library_id) {
    return res.status(403).json(
      APIError.send({
        status: 403,
        message: "Please provide a valid library ID",
      })
    );
  }

  const library = await Library.findById(library_id);
  if (!library) {
    return res.status(404).json(
      APIError.send({
        status: 404,
        message: "Library not found",
      })
    );
  }

  if (library.title !== title || library.slug !== slug) {
    const existingLibrary = await Library.findOne({
      $or: [{ title }, { slug }],
    });
    if (existingLibrary) {
      return res.status(409).json(
        APIError.send({
          status: 409,
          message:
            library.title !== title
              ? "Title already taken, Please choose another"
              : "Slug already taken, Please choose another",
        })
      );
    }
  }

  const updatedLibrary = await Library.findByIdAndUpdate(
    library_id,
    {
      title,
      logo,
      platformURL,
      slug,
      visibility,
    },
    {
      new: true,
    }
  );

  if (!updatedLibrary) {
    return res.status(500).json(
      APIError.send({
        status: 500,
        message: "Something went wrong! Library not updated",
      })
    );
  }

  return res.status(200).json(
    APIResponse.send({
      status: 200,
      message: "Library updated successfully",
    })
  );
});

const deleteLibrary = asyncHandler(async (req: Request, res: Response) => {
  const { library_id } = req.params;

  if (!library_id) {
    return res.status(403).json(
      APIError.send({
        status: 403,
        message: "Please provide a valid library ID",
      })
    );
  }

  const library = await Library.findOne({ _id: library_id, isDeleted: false });
  if (!library) {
    return res.status(404).json(
      APIError.send({
        status: 404,
        message: "Library not found!",
      })
    );
  }

  library.isDeleted = true;
  await library.save();

  return res.status(200).json(
    APIResponse.send({
      status: 200,
      message: "Library deleted successfully",
    })
  );
});

export default {
  createLibrary,
  getLibrary,
  getLibraries,
  updateLibrary,
  deleteLibrary,
};
