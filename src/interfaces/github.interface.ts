//interface service response object
import { Branch } from "./repo.interface";

export interface RepoInfo {
  RepoName: string;
  OwnerName: string;
  Branchs : Branch[]
}