//interface git user repo object
export interface UserRepo {
  name: string;
  owner: {
    login: string;
  };
  fork : boolean;
}
