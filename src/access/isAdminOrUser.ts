export const isAdminOrUser = ({ req: { user } }) => {
  if (user && user.role === "admin") {
    return true;
  }

  if (user) {
    return {
      user: {
        equals: user.id,
      },
    };
  }
  return false;
};
