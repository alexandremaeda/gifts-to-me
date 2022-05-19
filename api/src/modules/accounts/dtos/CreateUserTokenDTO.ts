interface ICreateUserTokenDTO {
  userId: string;
  refreshToken: string;
  expiresAt: Date;
}

export default ICreateUserTokenDTO;
