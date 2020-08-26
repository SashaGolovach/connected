export interface IUserMe {
  Id: string;
  Email: string;
  Username: string;
  FirstName: string;
  LastName: string;
  BirthDate: string;
  ConnectedServices: string[];
}

export interface IUser extends IUserMe {}

export interface IUsersObj {
  userMe: IUserMe;
  users: IUser[];
}
