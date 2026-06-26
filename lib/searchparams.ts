import {
  parseAsBoolean,
  parseAsInteger,
  parseAsStringEnum,
  createSearchParamsCache,
  createSerializer,
} from "nuqs/server";

export const searchParams = {
  page: parseAsInteger.withDefault(1).withOptions({
    shallow: false,
    limitUrlUpdates: {
      method: "debounce",
      timeMs: 100,
    },
  }),
  limit: parseAsInteger.withDefault(10).withOptions({
    shallow: false,
    limitUrlUpdates: {
      method: "debounce",
      timeMs: 100,
    },
  }),
  isActive: parseAsBoolean.withOptions({
    shallow: false,
    limitUrlUpdates: {
      method: "debounce",
      timeMs: 100,
    },
  }),
  sortBy: parseAsStringEnum(["name", "createdAt", "startsAt", "endsAt"])
    .withDefault("createdAt")
    .withOptions({
      shallow: false,
      limitUrlUpdates: {
        method: "debounce",
        timeMs: 100,
      },
    }),
  sortOrder: parseAsStringEnum(["asc", "desc"])
    .withDefault("desc")
    .withOptions({
      shallow: false,
      limitUrlUpdates: {
        method: "debounce",
        timeMs: 100,
      },
    }),
};

export const searchParamsCache = createSearchParamsCache(searchParams);

export const serialize = createSerializer(searchParams);
