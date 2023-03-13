import { getUserRepoInfo } from '../../src/api/github';
import { NotFoundError } from '../../src/errors/customErrors';
import { RepoInfo } from '../../src/interfaces/github.interface';

const request = require("supertest");

describe('getUserRepoInfo', () => {
    let req: any;
    let res: any;
    let next: any;

  it("should respond with a 200 status code and an array of RepoInfo objects, each containing 'RepoName' and 'OwnerName' properties", async () => {
    req = {
      headers: {},
      query : {
        username: "DRibeiroFaria"
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    next = jest.fn();

    await getUserRepoInfo(req, res , next);
    
    expect(res.status).toHaveBeenCalledWith(200);
    res.send.mock.calls[0][0].forEach((item: RepoInfo) => {
    expect(item).toHaveProperty("RepoName");
    expect(item).toHaveProperty("OwnerName");
    });
   });

    it("should throw 404 when user not found", async () => {
    req = {
      headers: {},
      query : {
        username: "JDRIBEIRO0912384127312"
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    next = jest.fn();
    
    await getUserRepoInfo(req, res , next);
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.json.mock.lastCall[0]).toHaveProperty("message");
    expect(res.json.mock.lastCall[0]).toHaveProperty("status");
   });
   
});