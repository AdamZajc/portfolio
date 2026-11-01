'use server'
import axios from 'axios'
import { PostMini } from '@/components'

export default async function Blog() {
    const posts = await axios.get('http://localhost:3001/api/posts').then(res => res.data)

    return <main>
        <header className={"h-[60vh] w-full bg-gray-300"}></header>
        <section className={"md:px-24 p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"}>
            {posts.map((post: Post, index: number) => {
                return <PostMini key={index} post={post} />
            })}
        </section>
    </main>
}