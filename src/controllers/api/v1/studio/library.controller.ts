import { Request, Response } from "express";
import { asyncHandler } from "../../../../handlers";

const createLibrary = asyncHandler(async (req: Request, res: Response) => {});
const getLibraries = asyncHandler(async (req: Request, res: Response) => {});
const updateLibrary = asyncHandler(async (req: Request, res: Response) => {});
const deleteLibrary = asyncHandler(async (req: Request, res: Response) => {});

export default {
  createLibrary,
  getLibraries,
  updateLibrary,
  deleteLibrary,
};
