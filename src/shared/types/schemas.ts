import { z } from "zod";

export const tagSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});
export const tagsSchema = z.array(tagSchema);

export const dateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});
export const datesSchema = z.array(dateSchema);

export const userSchema = z.object({
  id: z.number().int(),
  fullName: z.string(),
  role: z.object({
    id: z.number().int(),
    name: z.string(),
  }),
  login: z.any(),
  email: z.any(),
  imagePath: z.any(),
});

export const usersSchema = z.array(userSchema);

export const trackSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  closed: z.any(),
});

export const tracksSchema = z.array(trackSchema);

export const projectSchema = z.object({
  id: z.number().int(),
  track: trackSchema.nullable(),
  title: z.string(),
  description: z.string().nullable(),
  grade: z.number().nullable(),
  repo: z.string(),
  screenshots: z.array(z.instanceof(File)).nullable(),
  presentation: z.string().nullable(),
  tags: tagsSchema.nullable(),
  users: usersSchema,
  date: z.object({ id: z.number(), name: z.string() }).nullable(),
  mainScreenshot: z.instanceof(File).nullable(),
});

export const createProjectSchema = z.object({
  trackId: z.number().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  repo: z.string(),
  screenshots: z.array(z.instanceof(File)).nullable(),
  presentation: z.string().nullable(),
  tagsId: z.array(z.number()).nullable(),
  usersId: z.array(z.number()).nullable(),
  dateId: z.number().nullable(),
  mainScreenshot: z.instanceof(File).nullable(),
});
export const projectsSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;
export type Projects = Project[];
export type CreateProject = z.infer<typeof createProjectSchema>;

export type Tag = z.infer<typeof tagSchema>;
export type Tags = Tag[];

export type Date = z.infer<typeof dateSchema>;
export type Dates = Date[];

export type User = z.infer<typeof userSchema>;
export type Users = User[];

export type AuthUser =
  | {
      accessToken: string;
      attributes: {
        email: string;
        picture: string;
        name: string;
      };
    }
  | undefined;
