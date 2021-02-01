import { IPost, IPostCreateRequest, IUser, PostStatus } from './interfaces';
import { db } from '../services';

export class PostDao {
    protected format(post: IPostCreateRequest): IPostCreateRequest {
        return {
            ...post,
            summary: post.summary || post.body
                .split(' ')
                .slice(0, 100)
                .join(' '),
        };
    }

    public async create(userId: number, data: IPostCreateRequest): Promise<IPost> {
        const post = this.format(data);
        const { rows } = await db.query(
            `INSERT INTO posts ("userId", "communityId", "title", "body", "summary", "image", "tags", "status")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                userId,
                post.communityId,
                post.title,
                post.body,
                post.summary,
                post.image,
                post.tags,
                PostStatus.Pending,
            ],
        );
        return rows[0];
    }

    public async update(postId: number, data: IPostCreateRequest): Promise<IPost> {
        const post = this.format(data);
        const { rows } = await db.query(
            `UPDATE posts p SET
                "communityId" = $1,
                title = $2,
                body = $3,
                summary = $4,
                image = $5,
                tags = $6
            WHERE p.id = $7
            RETURNING *`,
            [
                post.communityId,
                post.title,
                post.body,
                post.summary,
                post.image,
                post.tags,
                postId,
            ],
        );
        return rows[0];
    }

    public async get(id: number, userId: number): Promise<IPost> {
        const { rows } = await db.query(`
            SELECT
                p.*,
                COUNT(up.id) as likes
            FROM posts p
            LEFT JOIN users_posts up ON up."postId" = p.id
            WHERE p.id = $1 AND (p."userId" = $2 OR p.status = $3)
            GROUP BY p.id`, [id, userId, PostStatus.Approved]);
        if (rows.length === 0) {
            throw new Error('Post not found!');
        }
        return rows[0];
    }

    public async getByUserId(userId: number, authUserId: number): Promise<IPost[]> {
        const { rows } = await db.query(`
            SELECT
                p.*,
                COUNT(up.id) as likes
            FROM posts p
            LEFT JOIN users_posts up ON up."postId" = p.id
            WHERE p."userId" = $1 AND (p."userId"= $2 OR p.status = $3)
            GROUP BY p.id`, [userId, authUserId, PostStatus.Approved]);
        return rows;
    }

    public async hasPost(userId: number, postId: number): Promise<boolean> {
        const { rows } = await db.query(`
            SELECT
               COUNT(*) as total
            FROM posts p
            WHERE p.id = $1 AND p."userId" = $2`, [postId, userId]);
        return rows[0].total > 0;
    }
    protected async hasLike(userId: number, postId: number): Promise<boolean> {
        const { rows } = await db.query(`
            SELECT
               COUNT(*) as total
            FROM users_posts up
            WHERE up."postId" = $1 AND up."userId" = $2`, [postId, userId]);
        return rows[0].total > 0;
    }

    protected async removeLike(userId: number, postId: number): Promise<void> {
        await db.query(`
            DELETE FROM users_posts up WHERE up."postId" = $1 AND up."userId" = $2
        `, [postId, userId]);
    }

    protected async addLike(userId: number, postId: number): Promise<void> {
        await db.query(`
            INSERT INTO users_posts ("postId", "userId") VALUES($1, $2)
        `, [postId, userId]);
    }

    public async like(userId: number, postId: number): Promise<void> {
        if (await this.hasLike(userId, postId)) {
            return await this.removeLike(userId, postId);
        }
        return await this.addLike(userId, postId);
    }

    public async approve(postId: number): Promise<IPost> {
        const { rows } = await db.query(`
            UPDATE posts p SET
                status = $2
            WHERE p.id = $1
            RETURNING *`,
            [
                postId,
                PostStatus.Approved,
            ],
        );
        return rows[0];
    }

    public async getFeed(user: IUser): Promise<IPost[]> {
        const { rows } = await db.query(`
            SELECT
                *,
                ( CASE WHEN u.country = $3 THEN 1.0 ELSE 0.0 END ) + (char_length(body) / 10485760.0) as weight
            FROM posts p
            LEFT JOIN users u ON u.id = p.id
            JOIN users_communities uc ON uc."communityId" = p."communityId" AND uc."userId" = $2
            WHERE p .status = $1 ORDER BY weight DESC`, [PostStatus.Approved, user.id, user.country]);
        return rows;
    }
}
