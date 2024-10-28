export type Project = {
  grade: number;
  id: number;
  pptxUrl: string;
  screenshots: string[];
  tags: number[];
  team: number[];
  thumbnail: string;
  title: string;
  track: number;
  trackName: string;
};
export type Projects = Project[];

export type Track = {
  id: number;
  name: string;
};
export type Tracks = Track[];

export type User = {
  id: number;
  fullName: string;
};
export type Users = User[];
