import { z } from "zod";

export const borrowBookSchema = z.object({
  quantity: z.coerce
    .number()
    .min(1, { message: "You must borrow at leas one book!" }),
  dueDate: z.string().min(1, { message: "Please select the due date." }),
});
