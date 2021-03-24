export enum MemberRankType {
  Member = 0,
  Manager = 1,
  Owner = 2,
}

export const parseMemberRankType = (type: MemberRankType): number => {
  if (type === MemberRankType.Manager) {
    return 1;
  }
  if (type === MemberRankType.Owner) {
    return 2;
  }

  return 0;
};
