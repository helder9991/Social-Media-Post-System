interface IUser {
  id: string
}

interface IFile {
  location: string;
  key: string;
}

declare namespace Express {
  interface Request {
    user: IUser
    file: IFile
  }
}
