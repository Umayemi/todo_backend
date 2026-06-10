import { ZodError } from "zod";

export function formatZodErrors(
  issues: ZodError["issues"]
) {
  return issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}