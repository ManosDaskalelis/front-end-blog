export interface UpdateBlogPost {
    title: string;
    content: string;
    fullContent: string;
    imageUrl: string;
    urlHandle: string;
    author: string;
    dateCreated: Date;
    isVisible: boolean;
    categories: string[];
}
