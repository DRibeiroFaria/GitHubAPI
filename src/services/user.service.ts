import axios from 'axios'; 
import * as dotenv from "dotenv";
import { UserRepo } from '../interfaces/user.interface';
dotenv.config(); 

// .env const URL TOKEN
const URL = process.env.GITHUB_URL;
const TOKEN = process.env.GITHUB_TOKEN;
const ACCEPT = process.env.ACCEPT;
/**
 * Function to get user given a 
 * @username
 * */ 
export async function getUser(username:string): Promise<void> {
    await axios({
      method: 'get', 
      url: `${URL}/users/${username}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: ACCEPT,
      }
    })
}

/**
 * Function to get repositories given a 
 * @username
 * which returns an array of UserRepo objects 
 * */ 

export async function getReposByUser(username:string): Promise<UserRepo[]> {

  let data: UserRepo[] = [];    // array to hold all repos
  let pageNumber : number = 1;  // page number to fetch from GitHub
  let responseHasData : boolean = true; // boolean flag to check when to stop querying Github APIs
  const per_page : number = 100;  // number of repos to be fetched per page limit

  while (responseHasData) {
    // config object with parameters and .env const
    const config = {
      method: 'get',
      url: `${URL}/users/${username}/repos`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: ACCEPT,
      },
      params: {
        per_page: per_page,
        page: pageNumber,
        type: 'owner',
        sort: 'updated',
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
  } 
  return data;    
}

