export type BlogContent = {
  title: string;
  author: string;
  url: string;
}

export type FullBlog = BlogContent & { id: number; likes: number }