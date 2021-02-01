import { userDao, watchDao } from '../dao';
import { IPost, UserRole } from '../dao/interfaces';

export class EmailService {
    protected sendEmail({ to, subject, body }: { to: string[], subject: string; body: string }): void {
        console.log('send email called', { to, subject, body });
    }

    public async send(post: IPost): Promise<void> {
        this.sendEmail({
            to: await userDao.getEmails([UserRole.Moderator, UserRole.ModeratorPlus]),
            subject: 'New post have been created',
            body: JSON.stringify({ post }, null, 2),
        });
        const words = await watchDao.getWords(`${post.title} ${post.body} ${post.summary}`);
        if (words && words.length) {
            this.sendEmail({
                to: await userDao.getEmails([UserRole.ModeratorPlus]),
                subject: 'Post contains words from watchlist',
                body: JSON.stringify({ post, words }, null, 2),
            });
        }
    }
}
