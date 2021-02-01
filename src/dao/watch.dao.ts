import { db } from '../services';

export class WatchDao {
    public async getWords(text: string): Promise<string[]> {
        const {
            rows,
        } = await db.query(`
            SELECT ww."word" FROM watchwords ww WHERE to_tsvector('english', $1) @@ to_tsquery('english', ww."word");
        `, [text]);
        return rows.map(({ word }) => word);
    }
}
