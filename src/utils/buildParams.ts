import type { GetMethodBaseQueryParams } from "@/types";

export const buildParams = (params: GetMethodBaseQueryParams): Record<string, any> => {
  const { limit = 10, offset = 0, startDate, endDate, searchQuery, type } = params;

  const query: Record<string, any> = { limit, offset };

  if (startDate) query.startDate = startDate;
  if (endDate) query.endDate = endDate;
  if (searchQuery?.trim()) query.search = searchQuery;
  if (type) query.type = type;

  return query;
};
