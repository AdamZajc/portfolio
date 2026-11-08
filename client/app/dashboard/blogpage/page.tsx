'use server'
import axios from "axios";
import {PostElement} from './interface'
import {Suspense} from "react";

export default async function BlogDashboard() {
    const posts = await axios.get('http://localhost:3001/api/posts').then(res => res.data)

    return <main className={"p-20"}>
        <Suspense>
            <div>
                {posts.map((post: any, index: number) => {
                    return <PostElement post={post} key={index} />
                })}
            </div>
        </Suspense>
    </main>
}