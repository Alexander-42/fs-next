import type { blogs, readingList, users } from "@/db/schema"

export type FullBlog = typeof blogs.$inferSelect

export type ReadingListEntry = typeof readingList.$inferSelect & {
  blog: FullBlog
}

export type BlogContent = Omit<FullBlog, "id" | "likes" | "userId">

export type User = typeof users.$inferSelect

export type RegistrationFormValues = Omit<User, "id" | "passwordHash" | "token" > & { password: string }

type ValidationError = {
  error: string;
}

export type BlogCreationValidationErrors = {
  titleError?: ValidationError;
  urlError?: ValidationError;
  authorError?: ValidationError;
}

export type RegistrationValidationErrors = {
  usernameError?: ValidationError;
  passwordError?: ValidationError;
  passwordConfirmError?: ValidationError;
  usernameExistsError?: ValidationError;
}

export type BlogCreationState = {
  errors: BlogCreationValidationErrors;
  values: BlogContent;
  success: boolean;
}

export type RegistrationState = {
  errors: RegistrationValidationErrors;
  values: RegistrationFormValues;
  success: boolean;
}

export type TokenGenerationState = {
  error: string;
  token: string | null;
  success: boolean;
}