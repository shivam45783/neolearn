import prisma from "../utils/db.js";

export const getUserWithOAuthId = async ({ email, provider }) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      oauthAccounts: {
        some: {
          provider: provider,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      isEmailVerified: true,
      oauthAccounts: {
        select: {
          providerAccountId: true,
          provider: true,
        },
      },
    },
  });
  return user;
};

export const linkUserWithOauth = async({userId, provider, providerAccountId})=>{

}