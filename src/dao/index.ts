import { CommunityDao } from './community.dao';
import { PostDao } from './post.dao';
import { UserDao } from './user.dao';
import { WatchDao } from './watch.dao';

export const communityDao = new CommunityDao();
export const postDao = new PostDao();
export const userDao = new UserDao();
export const watchDao = new WatchDao();
