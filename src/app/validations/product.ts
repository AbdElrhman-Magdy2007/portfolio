import { z } from "zod";
import { PackageOption } from "@prisma/client";

// Centralized error messages for user-friendly feedback
export const errorMessages = {
  requiredName: "Product name is required",
  requiredDescription: "Product description is required",
  requiredCategory: "Category is required",
  requiredImage: "Product image is required",
  invalidImage: "Image must be a valid file (JPEG, PNG, GIF, WebP, SVG, BMP) under 15MB",
  requiredTechName: "Technology name is required",
  requiredAddon: "Exactly one addon is required",
  invalidAddon: "Addon must be a valid package option (FullStack, Backend, Frontend, UI, UX)",
  tooManyAddons: "Only one addon is allowed",
  invalidLiveDemoLink: "Live demo link must be a valid URL",
  invalidGitHubLink: "GitHub link must be a valid GitHub repository URL (e.g., https://github.com/user/repo)",
};

// Image validation constants
const MAX_IMAGE_SIZE = 150 * 1024 * 1024; // 15MB
const VALID_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
];

/**
 * Sanitizes input strings to prevent XSS by removing script tags and HTML.
 * @param value - Input string to sanitize.
 * @returns Sanitized string.
 */
const sanitizeString = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
};

/**
 * Validates an image file for type, size, and presence.
 * @param isRequired - Whether the image is required (true for add, false for update).
 * @returns Zod schema for image validation.
 */
const imageValidation = (isRequired: boolean) =>
  z
    .instanceof(File, { message: errorMessages.invalidImage })
    .optional()
    .refine(
      (file) => (isRequired ? file !== undefined && file !== null : true),
      { message: errorMessages.requiredImage }
    )
    .refine(
      (file) =>
        !file || (VALID_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE),
      { message: errorMessages.invalidImage }
    );

/**
 * Defines validation schemas for product technologies and addons.
 * @returns Object containing Zod schemas for productTechs and productAddons.
 */
const getOptionsValidations = () => ({
  productTechs: z
    .array(
      z.object({
        name: z.string().trim().min(1, { message: errorMessages.requiredTechName }),
      })
    )
    .optional()
    .default([]),
  productAddons: z
    .array(
      z.object({
        name: z.enum(Object.values(PackageOption) as [string, ...string[]], {
          message: errorMessages.invalidAddon,
        }),
      })
    )
    .min(1, { message: errorMessages.requiredAddon })
    .max(1, { message: errorMessages.tooManyAddons }),
});

/**
 * Defines common validations for product fields with sanitization.
 * @returns Object containing Zod schemas for common fields.
 */
const getCommonValidations = () => ({
  name: z.preprocess(
    sanitizeString,
    z.string().trim().min(1, { message: errorMessages.requiredName })
  ),
  description: z.preprocess(
    sanitizeString,
    z.string().trim().min(1, { message: errorMessages.requiredDescription })
  ),
  categoryId: z.string().min(1, { message: errorMessages.requiredCategory }),
  liveDemoLink: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().url().safeParse(val).success,
      { message: errorMessages.invalidLiveDemoLink }
    ),
  gitHubLink: z
    .string()
    .optional()
    .refine(
      (val) => !val || (
        z.string().url().safeParse(val).success &&
        /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w-]+(\/.*)?$/.test(val)
      ),
      { message: errorMessages.invalidGitHubLink }
    ),
  ...getOptionsValidations(),
});

/**
 * Type definition for validated product data.
 */
export type ProductValidatedData = z.infer<ReturnType<typeof addProductSchema>>;

/**
 * Validation schema for adding a new product.
 * @returns Zod schema for adding a product.
 */
export const addProductSchema = () =>
  z.object({
    ...getCommonValidations(),
    image: imageValidation(true),
  });

/**
 * Validation schema for updating an existing product.
 * @returns Zod schema for updating a product.
 */
export const updateProductSchema = () =>
  z.object({
    ...getCommonValidations(),
    image: imageValidation(false),
  });

/**
 * Interface for validation errors returned to the client.
 */
export interface ValidationError {
  [key: string]: string | undefined;
}