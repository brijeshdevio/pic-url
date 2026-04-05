import z from "zod";

export const CreateProjectSchema = z
  .object({
    name: z
      .string("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be at most 30 characters"),

    expireAt: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }) // Check if the date is valid
      .transform((val) => new Date(val)) // Convert to Date object
      .refine((date) => date >= new Date(), {
        message: "Date must be after today",
      })
      .refine((date) => date <= new Date(2050, 0, 1), {
        message: "Date must be before 2050",
      })
      .optional(),
  })
  .strict();

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = z
  .object({
    name: z
      .string("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be at most 30 characters")
      .optional(),
  })
  .strict();

export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;
