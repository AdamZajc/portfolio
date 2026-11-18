"use client";
import { transition_props } from "@/styles/transition";
import { Post } from "@/types";
import { motion } from "motion/react";
import { Montserrat } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

export function BlogHeader({ categories }: { categories?: string[] }) {
  const params = useSearchParams();
  const category = params.get("c") ? params.get("c") : "";
  const router = useRouter();

  return (
    <header className={"w-full bg-sky-100 lg:flex"}>
      <div className="w-full h-[60vh] p-24 flex flex-col justify-center gap-4">
        <motion.h1
          className={"uppercase text-4xl font-bold " + montserrat.className}
          {...{
            ...transition_props,
            transition: { ...transition_props.transition, delay: 0.25 },
          }}
        >
          Blog
        </motion.h1>
        <motion.div
          className="gap-4 grid lg:grid-cols-3"
          {...{
            ...transition_props,
            transition: { ...transition_props.transition, delay: 0.5 },
          }}
        >
          <input
            type="search"
            placeholder="Search posts..."
            className="w-full px-4 py-2 col-span-2 bg-white focus:outline-none rounded-md border"
            onChange={(e) => router.replace("/blog?q=" + e.target.value)}
          />
          <select
            defaultValue={category as string}
            className="w-full px-4 py-2 bg-white focus:outline-none rounded-md border"
            onChange={(e) => router.push("/blog?c=" + e.target.value)}
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option className="capitalize" key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </motion.div>
      </div>
      <div
        className={
          "h-full lg:h-[60vh] lg:ml-auto w-full lg:w-auto grid grid-cols-4 grid-rows-3 aspect-4/3"
        }
      >
        <div
          className={"bg-sky-800 h-full aspect-square"}
          style={{ borderRadius: "000% 100% 100% 100%" }}
        />
        <div
          className={"bg-sky-300 h-full aspect-square"}
          style={{ borderRadius: "100% 000% 100% 100%" }}
        />
        <div
          className={"bg-sky-200 h-full aspect-square"}
          style={{ borderRadius: "100% 100% 100% 000%" }}
        />
        <div
          className={"bg-sky-950 h-full aspect-square"}
          style={{ borderRadius: "000% 000% 100% 100%" }}
        />
        <div
          className={"bg-sky-600 h-full aspect-square"}
          style={{ borderRadius: "100% 100% 100% 100%" }}
        />
        <div
          className={"bg-sky-800 h-full aspect-square"}
          style={{ borderRadius: "100% 100% 000% 100%" }}
        />
        <div
          className={"bg-sky-400 h-full aspect-square"}
          style={{ borderRadius: "100% 100% 100% 000%" }}
        />
        <div
          className={"bg-sky-500 h-full aspect-square"}
          style={{ borderRadius: "100% 100% 100% 100%" }}
        />
        <div
          className={"bg-sky-900 h-full aspect-square"}
          style={{ borderRadius: "000% 000% 100% 000%" }}
        />
        <div
          className={"bg-sky-700 h-full aspect-square"}
          style={{ borderRadius: "100% 000% 100% 100%" }}
        />
        <div
          className={"bg-sky-200 h-full aspect-square"}
          style={{ borderRadius: "100% 100% 100% 100%" }}
        />
        <div
          className={"bg-sky-300 h-full aspect-square"}
          style={{ borderRadius: "100% 100% 100% 000%" }}
        />
      </div>
    </header>
  );
}

export function BlogMiniature({
  title,
  description,
  slug,
  background_image,
  createdAt,
  delay,
}: {
  title: string;
  description: string;
  slug: string;
  background_image: string;
  createdAt: string;
  delay: number;
}) {
  const router = useRouter();

  return (
    <motion.div
      style={{
        background: `url(${background_image}), rgba(0,0,0,0.5)`,
        backgroundBlendMode: "darken",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={"p-8 aspect-square cursor-pointer group grid items-end"}
      whileHover={{ scale: 1.05 }}
      onClick={() => router.push("/blog/" + slug)}
      {...transition_props}
    >
      <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300">
        <p className="text-white text-sm">
          {new Date(createdAt)
            .toDateString()
            .replace("Mon", "")
            .replace("Tue", "")
            .replace("Wed", "")
            .replace("Thu", "")
            .replace("Fri", "")
            .replace("Sat", "")
            .replace("Sun", "")}
        </p>
        <h3 className="text-white text-xl font-bold">{title}</h3>
      </div>
    </motion.div>
  );
}

export function PostGallery({ posts }: { posts: Post[] }) {
  const params = useSearchParams();
  const category = params.get("c");
  const query = params.get("q");

  const filtered_posts = posts.filter((post) => {
    if (category && !post.categories.includes(category)) return false;
    if (query && !post.title.toLowerCase().includes(query.toLowerCase()))
      return false;
    return true;
  });

  return (
    <section className="px-24 py-16">
      <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"}>
        {filtered_posts.map((post: Post, index: number) => {
          return (
            <BlogMiniature
              title={post.title}
              description={post.description}
              slug={post.slug}
              background_image={post.background_image}
              createdAt={post.createdAt}
              delay={index}
              key={index}
            />
          );
        })}
      </div>
    </section>
  );
}
