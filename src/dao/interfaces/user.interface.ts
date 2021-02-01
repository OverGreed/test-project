export enum UserRole {
    Moderator = 'Moderator',
    ModeratorPlus = 'ModeratorPlus',
}

export interface IUser {
    id: number;
    username: string;
    email?: string;
    image: string;
    country: string;
    role?: UserRole;
}
