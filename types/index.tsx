export type Post = {
    title: string;
    description: string;
    slug: string;
    author: string;
    categories: string[];
    background_image: string;
    content: any[];
    createdAt: string;
};  

export type PostProps = {
    type: "heading" | "paragraph" | "image" | "list" | "code" | "quote" | "video" | "link";
    text?: string;
    src?: string;
    alt?: string;
    items?: string[];
    href?: string;
    heading?: number;
}