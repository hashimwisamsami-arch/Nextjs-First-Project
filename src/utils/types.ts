export type Articale = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type JWTPayload = {
  id: number;
  isAdmin: boolean;
  username: string;
};
