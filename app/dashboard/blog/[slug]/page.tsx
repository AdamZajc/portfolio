"use cache";
import axios from "axios";
import { ContentBlock, PostHeader } from "./interface";
// import { PostProps } from "@/types";

export const instant = false;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await axios
    .get("http://localhost:3001/api/posts/" + slug)
    .then((res) => res.data);

  return (
    <main className="absolute right-0 bottom-0 top-0 w-5/6 h-screen">
      <PostHeader
        image={post.background_image}
        title={post.title}
        description={post.description}
        categories={post.categories}
        createdAt={post.createdAt}
      />
      <section className={"pl-24 pr-24 md:pr-48 lg:pl-48 lg:pr-64 flex h-fit"}>
        {/* <div className="flex flex-col gap-y-4 py-16 pl-12 md:pl-24 border-l border-l-sky-600">
          {post.content.map((block: PostProps, index: number) => {
            return <ContentEditor key={index} block={block} delay={index} />;
          })}
        </div> */}
      </section>
    </main>
  );
}
