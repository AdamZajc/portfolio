"use cache";
import axios from "axios";
import { BlogHeader, PostGallery } from "./interface";
import { Post } from "@/types";

export default async function Blogpage() {
  const posts: Post[] = await axios
    .get("http://localhost:3001/api/posts")
    .then((res) => res.data);

  const categories: string[] = [];

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
  });

  return (
    <main>
      <BlogHeader categories={categories} />
      <PostGallery posts={posts} />
    </main>
  );
}
