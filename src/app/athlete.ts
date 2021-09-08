import { Gender } from "./gender";

export interface Athlete {
  athleteId: number;
  athleteGender: Gender;
  athleteName: string;
  athleteSport: string;
  athleteCommitee: string;
  athleteDob: Date;
  imageUrl: string;
  athleteEmail: string;
}
