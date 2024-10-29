import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).optional(),
});
export type SingupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type SinginType = z.infer<typeof signinInput>;

export const creatBlogInput = z.object({
  title: z.string().max(40),
  content: z.string(),
  publish: z.boolean().optional(),
});
export type CreateBlogType = z.infer<typeof creatBlogInput>;

export const updateBlogInput = z.object({
  title: z.string().max(40),
  content: z.string(),
});
export type UpdateBlogType = z.infer<typeof updateBlogInput>;

export class HttpError extends Error {
  message: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
