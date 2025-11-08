/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbGet } from '../db/db'
import { User } from '../db/table_types/user'

class UserRepository {
    findUserByEmailOrUserName(userData: { email?: string }) {
        return dbGet('SELECT * FROM users WHERE email = ?', [
            userData.email,
        ]) as User
    }
}
const userRepository = new UserRepository()
export default userRepository
