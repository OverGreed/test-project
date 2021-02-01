export enum PostStatus {
    Pending = 'Pending',
    Approved = 'Approved',
}
export interface IPostCreateRequest {
    communityId: number;
    title: string;
    body: string;
    summary: string;
    image: string;
    tags: string[];
}

export interface IPost extends IPostCreateRequest {
    id: number;
    status: PostStatus;
}
