import { prisma } from "@/db";
import { Media, Users } from "@prisma/client";

const createWhereQuery = (
  searchTerm: string,
  searchType: TitleSearchType,
  user: Partial<Users>,
) => {
  const obj: Record<string, Record<string, string>> = {};
  const { age = 18 } = user;
  if (searchType === "Cast") {
    obj.cast = {
      contains: searchTerm,
      mode: "insensitive",
    };
  } else {
    if (searchTerm) obj.title = { contains: searchTerm, mode: "insensitive" };
    if (searchType) obj.type = { equals: searchType };
  }
  if (Number(age) < 18) {
    obj.rating = {
      not: "R",
    };
  }
  return { where: obj };
};

export class BrowseRepository {
  async getAll(): Promise<Media[]> {
    const titles = await prisma.media.findMany();
    return titles;
  }

  async getAllPaged(
    page: number = 1,
    pageSize: number = 10,
    searchTerm: string,
    searchType: TitleSearchType,
    user: Partial<Users>,
  ): Promise<{ records: Media[]; totalRecords: number }> {
    const queryResponse = await prisma.$transaction(async (tx) => {
      const whereClause = createWhereQuery(searchTerm, searchType, user);
      const records = await tx.media.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        ...whereClause,
      });

      const totalRecords = await tx.media.count({
        ...whereClause,
      });

      return { records, totalRecords };
    });

    return queryResponse;
  }

  async getById(id: string): Promise<Media | null> {
    const queryResponse = await prisma.media.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return queryResponse;
  }
}
