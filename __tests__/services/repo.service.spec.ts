import axios from "axios";
import { getBranchByRepo } from "../../src/services/repo.service";
import { UserRepo } from "../../src/interfaces/user.interface";

describe('getBranchByRepo', () => {
  it('should return an array of branches', async () => {
  const username = 'octocat';
  const repo : UserRepo = { name: 'Spoon-Knife', owner: { login: "octocat" }, fork : false };
  const branches = await getBranchByRepo(username, repo);
  expect(Array.isArray(branches)).toBe(true);
  branches.forEach((branch) => {
    expect(branch).toHaveProperty('name');
    expect(branch).toHaveProperty('commit');
    expect(branch.commit).toHaveProperty('sha');
  });
  });
});
