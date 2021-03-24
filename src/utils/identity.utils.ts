export const getNameFromSocial = (email: string, name?: string): string => {
  if (!name) {
    return email.split('@')[0];
  }

  return name;
};

export const getUserNameFromSocial = (email: string, name?: string): string => {
  if (!name) {
    return email.split('@')[0];
  }

  return name.toLowerCase();
};
