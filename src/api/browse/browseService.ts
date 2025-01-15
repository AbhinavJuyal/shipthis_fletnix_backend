import { ServiceResponse } from "@/common/models/serviceResponse";
import { BrowseRepository } from "./browseRepository";
import { Media } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { idValidatior } from "@/common/utils/validators";
import { Request, Response } from "express";
import { PaginatedResponse } from "@/common/types";
import z from "zod";

const searchTypeSchema = z
  .union([
    z.literal("Movie"),
    z.literal("TV Show"),
    z.literal("Cast"),
    z.literal(""),
  ])
  .optional();

const getAllPagedSchema = z.object({
  page: idValidatior,
  pageSize: idValidatior,
  searchTerm: z.string().optional(),
  searchType: searchTypeSchema,
});

export class BrowseService {
  private browseRepository: BrowseRepository;

  constructor(browseRepository: BrowseRepository = new BrowseRepository()) {
    this.browseRepository = browseRepository;
  }

  public async getAll(): Promise<ServiceResponse<Media[] | null>> {
    try {
      const titles = await this.browseRepository.getAll();
      return ServiceResponse.success<Media[]>("Titles Found", titles);
    } catch (error) {
      console.log(error, "error");
      return ServiceResponse.failure(
        "An error occured while retriving titles",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAllPaged(
    req: Request,
    res: Response,
  ): Promise<ServiceResponse<PaginatedResponse<Media> | null>> {
    const query = req.query;
    const user = res.locals.user;
    try {
      const { success: validationSuccess } = getAllPagedSchema.safeParse(query);

      if (!validationSuccess) {
        return ServiceResponse.failure(
          "invalid query params provided. Allowed are page, pageSize, searchTerm and searchType",
          null,
        );
      }

      const page = Number(query.page);
      const pageSize = Number(query.pageSize);
      const searchTerm = String(query.searchTerm ?? "");
      const searchType = String(query.searchType ?? "") as TitleSearchType;

      const { records, totalRecords } = await this.browseRepository.getAllPaged(
        page,
        pageSize,
        searchTerm,
        searchType,
        user,
      );

      return ServiceResponse.success<PaginatedResponse<Media>>("Titles Found", {
        records,
        page,
        pageSize,
        totalRecords,
      });
    } catch (error) {
      console.log(error);
      return ServiceResponse.failure(
        "An error occured while retriving titles",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getById(req: Request): Promise<ServiceResponse<Media | null>> {
    const mediaId = req.params.id;
    try {
      const { success: validationSuccess } = z.string().safeParse(mediaId);

      if (!validationSuccess) {
        return ServiceResponse.failure("invalid id provided", null);
      }

      const record = await this.browseRepository.getById(mediaId);

      if (!record) {
        return ServiceResponse.failure("invalid value", null);
      }

      return ServiceResponse.success<Media>("Titles Found", record);
    } catch (error) {
      console.log(error);
      return ServiceResponse.failure(
        "An error occured while retriving title",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

const browserService = new BrowseService();

export default browserService;
