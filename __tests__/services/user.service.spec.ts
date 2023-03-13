import { UserRepo } from "../../src/interfaces/user.interface";
import { getReposByUser, getUser } from "../../src/services/user.service";

describe('getReposByUser', () => {
  it('should return an array of user repositories', async () => {
    const repos : UserRepo[] = await getReposByUser('octocat');
    expect(Array.isArray(repos)).toBe(true);
    expect(repos.length).not.toBeNull()
    expect(repos.length).toBeGreaterThan(0);
    expect(repos[0]).toHaveProperty('name');
    expect(repos[0]).toHaveProperty('fork');
  });
  it('should throw an error for a non-existent user', async () => {
    try {
      await getReposByUser('JDRIBEIRO0912384127312');
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe('getUser', () => {
  it('should throw an error for a non-existent user', async () => {
    try {
      await getUser('JDRIBEIRO0912384127312');
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
