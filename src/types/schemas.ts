import { z } from "zod";

export const tagSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

export const tagsSchema = z.array(tagSchema);

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
  id: z.number(),
  name: z.string(),
  closed: z.any(),
});

export const tracksSchema = z.array(trackSchema);

export const projectSchema = z.object({
  id: z.number().int(),
  track: trackSchema,
  title: z.string(),
  description: z.string().nullable(),
  grade: z.number(),
  repo: z.string().url(),
  screenshots: z.array(z.string()),
  presentation: z.string().url(),
  tags: tagsSchema,
  users: usersSchema,
  date: z.any(),
});

export const projectsSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;
export type Projects = Project[];

export type Tags = z.infer<typeof tagsSchema>;
