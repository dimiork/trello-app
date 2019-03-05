export type Role = 'guest' | 'user' | 'admin';

export class User {
  username: string;
  pwdHash?: string;
  role: Role;
  token: string;
}
