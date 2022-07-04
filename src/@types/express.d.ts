interface IUser {
  id: string | undefined | (() => string)
}
declare namespace Express {
  interface Request {
    user: IUser
  }
}
