import { ITokenService } from "./ITokenService";
//@ts-ignore
// eslint-disable-next-line import/no-unresolved
import { TokenServiceBase } from "./base/token.service.base";
//@ts-ignore
export class TokenService extends TokenServiceBase implements ITokenService {
//   decodeToken(bearer: string) {
//     throw new Error("Method not implemented.");
//   }
/**
 * @param bearer
 * @returns the username from a jwt token
 */
 decodeToken(bearer: string): string {
    return this.jwtService.verify(bearer).username;
  }
  
}
