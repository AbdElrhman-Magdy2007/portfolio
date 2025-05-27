"use server";

import { addCategorySchema, updateCategorySchema } from "@/app/validations/category";
import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// واجهة للحالة المعادة من الدوال
interface ActionResult {
  status: number;
  message: string;
  error?: Record<string, string[] | string>;
}

// مسارات إعادة التحقق المشتركة
const PATHS_TO_REVALIDATE = [
  `/${Routes.ADMIN}/${Pages.CATEGORIES}`,
  `/${Routes.MENU}`,
];

/**
 * إعادة التحقق من المسارات المحددة
 * @param paths - قائمة المسارات لإعادة التحقق
 */
const revalidatePaths = (paths: string[]) => {
  paths.forEach((path) => revalidatePath(path));
};

/**
 * معالجة الأخطاء وإرجاع استجابة موحدة
 * @param error - الخطأ الذي تم التقاطه
 * @returns كائن ActionResult مع حالة الخطأ
 */
const handleError = (error: unknown): ActionResult => {
  console.error("Error:", error);
  return {
    status: 500,
    message: "An unexpected error occurred.",
  };
};

/**
 * إضافة فئة جديدة إلى قاعدة البيانات
 * @param prevState - الحالة السابقة (غير مستخدمة)
 * @param formData - بيانات النموذج
 * @returns نتيجة العملية
 */
export const addCategory = async (
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> => {
  const result = addCategorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
      message: "Invalid input data.",
    };
  }

  try {
    const { categoryName } = result.data;
    await db.category.create({ data: { name: categoryName } });
    revalidatePaths(PATHS_TO_REVALIDATE);

    return {
      status: 201,
      message: "Category added successfully.",
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * تحديث فئة موجودة في قاعدة البيانات
 * @param id - معرف الفئة
 * @param prevState - الحالة السابقة (غير مستخدمة)
 * @param formData - بيانات النموذج
 * @returns نتيجة العملية
 */
export const updateCategory = async (
  id: string,
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> => {
  // التحقق من صحة المعرف
  if (!id || typeof id !== "string") {
    return {
      status: 400,
      message: "Invalid category ID.",
    };
  }

  const result = updateCategorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
      message: "Invalid input data.",
    };
  }

  try {
    const { categoryName } = result.data;
    await db.category.update({
      where: { id },
      data: { name: categoryName },
    });
    revalidatePaths(PATHS_TO_REVALIDATE);

    return {
      status: 200,
      message: "Category updated successfully.",
    };
  } catch (error) {
    // التحقق من أخطاء قاعدة البيانات (مثل الفئة غير موجودة)
    if (error instanceof Error && error.message.includes("RecordNotFound")) {
      return {
        status: 404,
        message: "Category not found.",
      };
    }
    return handleError(error);
  }
};

/**
 * حذف فئة من قاعدة البيانات
 * @param id - معرف الفئة
 * @returns نتيجة العملية
 */
export const deleteCategory = async (id: string): Promise<ActionResult> => {
  // التحقق من صحة المعرف
  if (!id || typeof id !== "string") {
    return {
      status: 400,
      message: "Invalid category ID.",
    };
  }

  try {
    await db.category.delete({ where: { id } });
    revalidatePaths(PATHS_TO_REVALIDATE);

    return {
      status: 200,
      message: "Category deleted successfully.",
    };
  } catch (error) {
    // التحقق من أخطاء قاعدة البيانات
    if (error instanceof Error && error.message.includes("RecordNotFound")) {
      return {
        status: 404,
        message: "Category not found.",
      };
    }
    return handleError(error);
    
  }
};