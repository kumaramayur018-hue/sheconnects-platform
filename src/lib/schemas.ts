import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const productSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters.' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  quantity: z.coerce.number().int().min(0, { message: 'Quantity must be a non-negative integer.' }),
  images: z
    .array(z.custom<File>())
    .min(1, "Please upload at least one image.")
    .max(5, "You can upload a maximum of 5 images.")
    .refine(
        (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
        `Max file size is 5MB.`
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  shortDescription: z.string().min(10, { message: 'Short description must be at least 10 characters.' }).max(100, { message: 'Short description must be 100 characters or less.' }),
  longDescription: z.string().min(20, { message: 'Long description must be at least 20 characters.' }),
  tags: z.string().min(1, { message: 'Please enter at least one tag.' }),
  attributes: z.array(z.string()).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;