import * as bcrypt from "bcrypt";

export class Bcrypt {
  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
