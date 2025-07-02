import { z } from "zod";

export const bookFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  author: z
    .string()
    .min(2, { message: "Author name must be at least 2 character." }),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().min(10, { message: "ISBN must be at least 10 characters." }),
  description: z.string().optional(),
  copies: z.coerce.number().min(0, { message: "Copies can'nt be negative." }),
  available: z.boolean().optional(),
});
