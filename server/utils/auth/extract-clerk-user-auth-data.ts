import { EmailAddress, User } from '@clerk/express';

export function extractClerkUserAuthData(
  clerkUserData: User,
  primaryEmailAddress: EmailAddress
) {
  const { firstName, lastName } = clerkUserData;
  const name = `${firstName ?? ''}${lastName ? ' ' + lastName : ''}`;
  const email = primaryEmailAddress.emailAddress;

  let strategy = primaryEmailAddress.verification?.strategy ?? '',
    provider = '',
    externalIdentifier = '';

  if (primaryEmailAddress.linkedTo[0]) {
    const externalAccount = clerkUserData.externalAccounts.find(
      (acc) => acc.id === primaryEmailAddress.linkedTo[0].id
    );

    if (externalAccount) {
      strategy = externalAccount.verification?.strategy ?? '';
      provider = externalAccount.provider;
      externalIdentifier = externalAccount.externalId;
    }
  }

  return {
    name,
    email,
    strategy,
    provider,
    externalIdentifier,
  };
}
