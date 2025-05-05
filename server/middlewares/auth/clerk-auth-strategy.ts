import { Request } from 'express';
import { clerkClient, getAuth } from '@clerk/express';

import { AuthMethod, User } from '@server/models';
import { extractClerkUserAuthData } from '@server/utils/auth';
import { IUser } from '@shared/types/api/user';
import { AuthStrategy } from '@server/types/auth';

export const clerkAuthStrategy: AuthStrategy = async (req: Request) => {
  const auth = getAuth(req);
  const clerkUserData = await clerkClient.users.getUser(auth.userId!);
  const clerkIdentifier = clerkUserData.id;
  const primaryEmailAddress = clerkUserData.emailAddresses.find(
    (obj) => obj.id == clerkUserData.primaryEmailAddressId
  )!;

  const existingAuthMethod = await AuthMethod.findOne(
    { clerkIdentifier },
    {},
    { populate: 'user' }
  );

  if (existingAuthMethod) {
    return existingAuthMethod.user as IUser;
  }

  const { name, email, strategy, provider, externalIdentifier } =
    extractClerkUserAuthData(clerkUserData, primaryEmailAddress);

  const user =
    (await User.findOne({ email })) ?? (await new User({ name, email }).save());

  const authMethod = new AuthMethod({
    clerkIdentifier,
    strategy,
    provider,
    externalIdentifier,
    user,
  });
  await authMethod.save();

  return user;
};
