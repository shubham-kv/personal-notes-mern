import { vi } from 'vitest';

export const getAuth = vi.fn(() => ({
  userId: 'test_user_12345',
}));

export const clerkClient = {
  users: {
    getUser: vi.fn(() => ({
      id: 'test_user_12345',
      primaryEmailAddressId: 'test_idn_12345',
      firstName: 'John',
      lastName: 'Doe',
      emailAddresses: [
        {
          id: 'test_idn_12345',
          emailAddress: 'john.doe@example.com',
          verification: {
            status: 'verified',
            strategy: 'email_code',
          },
          linkedTo: [],
        },
      ],
    })),
  },
};

export const requireAuth = vi.fn(() => (_, __, next) => {
  next();
});

export const clerkMiddleware = vi.fn(() => (_, __, next) => {
  next();
});
