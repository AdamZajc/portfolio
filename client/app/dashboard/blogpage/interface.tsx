'use client'
import {useRouter} from "next/navigation";

export function PostElement({ post }: { post: any }) {
    const router = useRouter();

    return <div onClick={() => router.push('/dashboard/blogpage/'+post.slug)}>{post.title}</div>
}