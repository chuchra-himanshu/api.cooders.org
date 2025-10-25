import { Request, Response } from "express";
import { APIError, APIResponse, asyncHandler } from "../../../../handlers";
import { Component, Library } from "../../../../models";

const createComponent = asyncHandler(async (req: Request, res: Response) => {
  const { title, logo, docURL, slug, visibility } = req.body;
  const { library_id } = req.params;

  const library = await Library.findById(library_id);
  if (!library) {
    return res.status(404).json(
      APIError.send({
        status: 404,
        message: "Library not found",
      })
    );
  }

  const existingComponent = await Component.findOne({
    $or: [{ title }, { slug }],
  });
  if (existingComponent) {
    return res.status(409).json(
      APIError.send({
        status: 409,
        message:
          existingComponent.title === title
            ? "Component already exists!"
            : "Slug already associated with another component",
      })
    );
  }

  const component = await Component.create({
    library: library_id,
    title,
    logo,
    docURL,
    slug,
    visibility,
  });

  if (!component) {
    return res.status(500).json(
      APIError.send({
        status: 500,
        message: "Something went wrong! Component not created",
      })
    );
  }

  return res.status(201).json(
    APIResponse.send({
      status: 201,
      message: "Component created successfully",
    })
  );
});

const getComponent = asyncHandler(async (req: Request, res: Response) => {
  const { component_id } = req.params;

  if (!component_id) {
    return res.status(403).json(
      APIError.send({
        status: 403,
        message: "Please provide a valid component ID",
      })
    );
  }

  const component = await Component.findOne({
    _id: component_id,
    visibility: true,
    isDeleted: false,
  });
  if (!component) {
    return res.status(404).json(
      APIError.send({
        status: 404,
        message: "Component not found",
      })
    );
  }

  return res.status(200).json(
    APIResponse.send({
      status: 200,
      message: "Component details fetched successfully",
      data: component,
    })
  );
});

const getComponents = asyncHandler(async (req: Request, res: Response) => {
  const components = await Component.find({
    visibility: true,
    isDeleted: false,
  });

  if (!components || components.length === 0) {
    return res.status(404).json(
      APIError.send({
        status: 404,
        message: "Components not found",
      })
    );
  }

  return res.status(200).json(
    APIResponse.send({
      status: 200,
      message: "Components details fetched successfully",
      data: components,
    })
  );
});

const updateComponent = asyncHandler(async (req: Request, res: Response) => {});

const deleteComponent = asyncHandler(async (req: Request, res: Response) => {});

export default {
  createComponent,
  getComponent,
  getComponents,
  updateComponent,
  deleteComponent,
};
