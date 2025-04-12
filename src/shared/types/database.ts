export type Track = { id: number; name: string };
export type Tracks = Track[];

export type User = {
  id: number;
  fullName: string;
  role: { id: number; name: string };
};
export type Users = User[];

export type Tag = { id: number; name: string };
export type Tags = Tag[];

export type Project = {
  grade: number;
  id: number;
  title: string;
  description: string;
  repo: string;
  screenshots: string[];
  tags: Tags;
  users: Users;
  track: Track;
};
export type Projects = Project[];

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
