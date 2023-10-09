import { auth } from "@/config/auth"
import { sign, verify } from "jsonwebtoken"


interface JWTData {
  userId: string
  token: string
}

interface JWTTokenPayload {
  exp: number
  sub: string
}

export class JWT {
  public readonly userId: string,
  public readonly token: string,

  private constructor({ userId, token }: JWTData) {
    this.userId = userId
    this.token = token
  }

  static decodeToken(token: string): JWTTokenPayload {
    try {
      const decoded = verify(token, auth.secretKey) as JWTTokenPayload

      return decoded
    } catch (err: any) {
      throw new Error("Error aqui" + err)
    }
  }

  static signUser(userId: string): JWT {
    const token = sign({}, auth.secretKey, {
      subject: userId,
      expiresIn: auth.expiresIn
    })

    const jwt = new JWT({ userId: userId, token })

    return jwt

  }

}