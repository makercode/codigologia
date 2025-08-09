export interface FirebaseTimestamp {
    seconds: number;
    nanoseconds: number;
}
export interface Video {
    type: string;
    url: string;
}
export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    author: string;
    date: FirebaseTimestamp;
    extract: string;
    image: string;
    markdown: string;
    tags: string[];
    
    videos?: Video[];
    content?: string;
    published?: boolean;
    featured?: boolean;
}
