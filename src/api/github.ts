import { getReposByUser, getUser } from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import { UserRepo } from "../interfaces/user.interface";
import { Branch } from "../interfaces/repo.interface";
import { getBranchByRepo } from "../services/repo.service";
import { RepoInfo } from "../interfaces/github.interface";
import { errorHandler } from "../handler/errorHandler";
import { HttpError, NotFoundError } from "../errors/customErrors";


/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */

 /**
     * Initially I didn't make the call to getUser because in the getReposByUser response when the user didn't exist already had the 404 error, 
     * but I made some tests and with the "octocate" in the user service it returned 404 and getReposByUser returns [] 
     * with "kasdkasdkasd" returns 404 in both
  */

export async function getUserRepoInfo(req: Request, res: Response, next: NextFunction) {

  let repoInfo: RepoInfo[] = [];
  const username: any = req.query.username;

  try {
    await getUser(username) 

    const repos: UserRepo[] = await getReposByUser(username);

    // loop through each repository and retrieve its branches and their commit information.
    for (const repo of repos) {
      if (!repo.fork) {
        const branches: Branch[] = await getBranchByRepo(username, repo);
        let branchList: Branch[] = [];
        branchList = branches.map(branch => ({name: branch.name, commit: {sha: branch.commit.sha}}));
        repoInfo.push({
            RepoName: repo.name,
            OwnerName: repo.owner.login,
            Branchs: branchList
        });
      }
    }
     res.status(200).send(repoInfo);
  } catch (err : any) {
    if (!(err.response && err.response.status === 404)) {
      // call Function errorHandler with HttpError object in case of unexpected Errors
      errorHandler(new HttpError(err.response.status, err.response.data.message),req,res,next)  
    } else {
      // call Function errorHandler with NotFoundError object in case of HTTP Status code 404 Not Found
      errorHandler(new NotFoundError(),req,res,next) 
    }
  }
}