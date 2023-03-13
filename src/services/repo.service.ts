import axios from 'axios';
import { UserRepo } from '../interfaces/user.interface';
import { Branch } from '../interfaces/repo.interface';
import * as dotenv from "dotenv";
dotenv.config();

// .env const URL TOKEN
const URL = process.env.GITHUB_URL;
const TOKEN = process.env.GITHUB_TOKEN
const ACCEPT = process.env.ACCEPT;

/**
 * Function to get branches by repo given a 
 * @username and @repo name
 * which returns an array of branch objects 
 * */ 

export async function getBranchByRepo(username: string, repo: UserRepo): Promise<Branch[]> {

  let data: Branch[] = [];   // array to hold all branches
  let pageNumber : number = 1;  // page number to fetch from GitHub
  let responseHasData : boolean = true; // boolean flag to check when to stop querying Github APIs
  const per_page : number = 100; // number of repos to be fetched per page limit

  while (responseHasData) {
    // config object with parameters and .env const
    const config = {
      method: 'get',
      url: `${URL}/repos/${username}/${repo.name}/branches`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: ACCEPT,
      },
      params: {
        per_page: per_page,
        age: pageNumber
      },
    };

    await axios(config)
      .then(function(response) {
        if (response.data.length > 0) {
          data = data.concat(response.data);
          pageNumber++;
          if (response.data.length < per_page) {
            responseHasData = false;
          }
          } else {
            responseHasData = false;
          }
          })
          .catch(function(error) {
            responseHasData = false;
          });
    }
    
    return data;
}
