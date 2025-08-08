// src/app/core/domain/blog-post.model.ts
import { FirebaseTimestamp } from '../../shared/interfaces/firebaseTimestamp.interface';

export class BlogPost {
  constructor(
    public id: string,
    public slug: string,
    public title: string,
    public author: string,
    public date: FirebaseTimestamp,
    public extract: string,
    public image: string,
    public markdown: string,
    public tags: string[],
    public videos?: { type: string; url: string }[],
    public content?: string,
    public published?: boolean,
    public featured?: boolean
  ) {}
}