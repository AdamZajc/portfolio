"use client";
import { motion } from "motion/react";
import { Montserrat } from "next/font/google";
import { transition_props } from "@/styles/transition";
import { PostProps } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

export function PostHeader({
  image,
  title,
  description,
  createdAt,
  categories,
}: {
  image: string;
  title: string;
  description: string;
  createdAt: string;
  categories: string[];
}) {
  const router = useRouter();

  return (
    <header
      style={{
        background: `url(${image}), rgba(0,0,0,0.7)`,
        backgroundBlendMode: "darken",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={
        "h-[80vh] w-full flex flex-col justify-center items-center text-center gap-y-2"
      }
    >
      <motion.p className="text-white text-sm" {...transition_props}>
        {new Date(createdAt)
          .toDateString()
          .replace("Mon", "")
          .replace("Tue", "")
          .replace("Wed", "")
          .replace("Thu", "")
          .replace("Fri", "")
          .replace("Sat", "")
          .replace("Sun", "")}
      </motion.p>
      <motion.h1
        className={"text-white text-4xl " + montserrat.className}
        {...{
          ...transition_props,
          transition: { ...transition_props.transition, delay: 0.1 },
        }}
      >
        {title}
      </motion.h1>
      <motion.p
        {...{
          ...transition_props,
          transition: { ...transition_props.transition, delay: 0.2 },
        }}
        className={"text-white text-sm w-1/2 mx-auto"}
      >
        {description}
      </motion.p>
      <div className="flex gap-4 mt-3">
        {categories.map((category: string, index: number) => {
          return (
            <motion.div
              onClick={() => router.push("/blog?c=" + category)}
              className={
                (index % 2 === 0
                  ? "border-white text-white hover:bg-white hover:text-sky-400"
                  : "border-sky-400 text-white hover:bg-sky-400") +
                " cursor-pointer px-6 py-2 text-sm border capitalize"
              }
              key={index}
            >
              {category}
            </motion.div>
          );
        })}
      </div>
    </header>
  );
}

export function ContentBlock({
  block,
  delay,
}: {
  block: PostProps;
  delay: number;
}) {
  const mixed_transition_props = {
    ...transition_props,
    transition: { ...transition_props.transition, delay: delay * 0.1 },
  };

  switch (block.type) {
    case "heading":
      return (
        <motion.h2
          className={`text-${block.heading}xl font-bold`}
          {...mixed_transition_props}
        >
          {block.text}
        </motion.h2>
      );
    case "paragraph":
      return (
        <motion.p
          className={"text-sm text-justify"}
          {...mixed_transition_props}
        >
          {block.text}
        </motion.p>
      );
    case "image":
      return (
        <motion.img
          src={block.src}
          alt={block.alt}
          className={"w-full h-auto"}
          {...mixed_transition_props}
        />
      );
    case "list":
      return (
        <ul className={"list-disc pl-8"} {...mixed_transition_props}>
          {block.items?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <motion.pre {...mixed_transition_props}>
          <code>{block.text}</code>
        </motion.pre>
      );
    case "quote":
      return (
        <motion.blockquote {...mixed_transition_props}>
          {block.text}
        </motion.blockquote>
      );
    case "video":
      return (
        <motion.iframe
          src={block.src}
          className={"w-full h-auto aspect-video"}
          {...mixed_transition_props}
        />
      );
    case "link":
      return <Link href={block.href as string} target="_blank" className="group w-fit text-sky-600">
        <motion.div {...mixed_transition_props}>{block.text}</motion.div>
        <div className="group-hover:w-full w-0 h-px bg-sky-600" />
      </Link>;
    default:
      return null;
  }
}
