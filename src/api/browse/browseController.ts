import { Request, RequestHandler, Response } from "express";
import browserService from "./browseService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

export class BrowseController {
  public getTitles: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await browserService.getAll();
    handleServiceResponse(serviceResponse, res);
  };

  public getTitlesPaged: RequestHandler = async (
    req: Request,
    res: Response,
  ) => {
    const serviceResponse = await browserService.getAllPaged(req, res);
    handleServiceResponse(serviceResponse, res);
  };

  public getTitleById: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await browserService.getById(req);
    handleServiceResponse(serviceResponse, res);
  };
}

export const browserController = new BrowseController();
