export const USER_ROLE = {
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
  VIEWER: 'VIEWER',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
