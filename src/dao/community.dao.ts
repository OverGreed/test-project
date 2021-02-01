import { db } from '../services';

export class CommunityDao {
    public async join(userId: number, communityId: number): Promise<void> {
        await db.query(`
            INSERT INTO users_communities ("userId", "communityId")
            VALUES ($1, $2)`, [userId, communityId]);
    }

    public async has(userId: number, communityId: number): Promise<boolean> {
        const {
            rows,
        } = await db.query(`
            SELECT
               COUNT(*) as total
            FROM users_communities uc
            WHERE uc."userId" = $1 AND uc."communityId" = $2`, [userId, communityId]);
        return rows[0].total > 0;
    }
}
