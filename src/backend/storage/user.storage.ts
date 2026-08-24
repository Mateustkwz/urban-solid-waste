import { UserModel } from "@models/user.model";

interface UserSchema {
  "@user": {
    [key: string]: UserModel;
  };
}

export { UserSchema };
