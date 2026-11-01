'use server'
import axios from "axios";
import {PostElement} from './interface'

export default async function BlogDashboard() {
    const posts = await axios.get('http://localhost:3001/api/posts').then(res => res.data)

    return <main className={"p-20"}>
        <div>
            {posts.map((post: any, index: number) => {
                return <PostElement post={post} key={index} />
            })}
        </div>
    </main>
}