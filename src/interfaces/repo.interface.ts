//interface git branch object
export interface Branch {
  name: string;
  commit: {
    sha: string;
  };
}
