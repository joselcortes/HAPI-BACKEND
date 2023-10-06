import jsonToken from "jsonwebtoken";
import 'dotenv/config';

export class Token {

  private secret: string;
  private payload: {};
  private token: string;
  private dataToken: {};

  constructor() {
    process.env.PORT = '3003';
    process.env.SECRET_TOKEN = 'MILuLTRAsECRETO';
    process.env.TZ = 'UTC';
    this.secret = process.env.SECRET_TOKEN! as string;
    this.payload = {};
    this.token = "";
    this.dataToken = {};

  }

  formarPayload(idUser: number, roleUser: string) {
    this.payload = {
      sub: idUser,
      scope: roleUser,
    };
    return this.payload;
  }

  generarToken(){

    this.token = jsonToken.sign(this.payload, process.env.SECRET_TOKEN!, {expiresIn: '5h'});

    return this.token;
  }

  verificarToken(token:string) {
    this.dataToken = jsonToken.verify(token, process.env.SECRET_TOKEN!);
    return this.dataToken;
  }
}
