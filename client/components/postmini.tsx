'use client'
import { motion } from 'motion/react'
import {useRouter} from "next/navigation";

export default function PostMini({ post }: { post: Post }) {
    const router = useRouter()

    return <motion.div
        whileHover={{
            y: -10
        }}
        className={"w-full p-8 h-56 grid items-end group cursor-pointer"}
        onClick={() => router.push('/blog/'+post.slug)}
        style={{
            background: `url("${post.background_image}"), rgba(0,0,0,0.5)`,
            backgroundBlendMode: "darken",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
        <div className={"hidden group-hover:block"}>
            <p className={"text-white text-sm"}>
                {new Date(post.createdAt).toDateString()
                    .replace('Mon', '')
                    .replace('Tue', '')
                    .replace('Wed', '')
                    .replace('Thu', '')
                    .replace('Fri', '')
                    .replace('Sat', '')
                    .replace('Sun', '')}
            </p>
            <h2 className={"text-white text-xl font-bold"}>{post.title}</h2>
        </div>
    </motion.div>
}