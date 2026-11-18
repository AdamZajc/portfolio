"use client";
import { transition_props } from "@/styles/transition";
import { Post } from "@/types";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function PostGallery({ posts }: { posts: Post[] }) {
  const router = useRouter();

  return (
    <div className="w-full grid grid-cols-1">
      {posts.map((post: Post, index: number) => {
        return (
          <motion.div
            className="py-4 px-6 border-b flex gap-4 items-center cursor-pointer"
            key={index}
            onClick={() => router.push("/dashboard/blog/" + post.slug)}
            {...{...transition_props, transition: { delay: index * 0.25 }}}
          >
            <img src={post.background_image} className="aspect-3/2 h-16" />
            <div>
                <h1 className="text-lg font-thin">{post.title}</h1>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
