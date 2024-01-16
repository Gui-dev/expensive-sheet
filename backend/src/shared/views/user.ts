import { type User } from '@prisma/client'

export const userView = (
  user: User,
): Omit<User, 'password' | 'updated_at' | 'deleted_at'> => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  }
}
