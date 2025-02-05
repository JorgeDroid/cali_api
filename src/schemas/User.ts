// import pg from "pg";

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: Date;
}

// export const UserSchema = new pg.InferSchema();
