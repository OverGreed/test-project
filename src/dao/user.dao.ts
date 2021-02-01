import { db } from '../services';
import { IUser, UserRole } from './interfaces';

export class UserDao {
    public async getUserByName(username: string): Promise<IUser> {
        const {
            rows,
        } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return rows[0] || null;
    }

    public async getUserById(id: number): Promise<IUser> {
        const {
            rows,
        } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0] || null;
    }

    public async getEmails(roles: UserRole[]): Promise<string[]> {
        const {
            rows,
        } = await db.query(`
            SELECT DISTINCT u.email
            FROM users u
            WHERE u.role = ANY($1::user_role[]) AND u.email IS NOT NULL`, [roles]);
        return rows.map(({ email }) => email);
    }

}
