"use cache";
import axios from "axios";
import { PostGallery } from "./interface";
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
    <main className="absolute top-0 right-0 bottom-0 w-5/6 h-screen float-right px-32 py-20">
      <h1 className="text-3xl font-thin mb-4">
        Blogposts
        <sup className={"text-sky-600 ml-1"}>&#9679;</sup>
      </h1>
      <PostGallery posts={posts} />
    </main>
  );
}
