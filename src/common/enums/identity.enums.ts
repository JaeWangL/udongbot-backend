export enum SocialSignInType {
  Google = 0,
  Apple = 1,
}

export const parseSocialSignInType = (type: SocialSignInType): number => {
  if (type === SocialSignInType.Apple) {
    return 1;
  }

  return 0;
};
