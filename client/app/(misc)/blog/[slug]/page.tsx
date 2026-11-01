'use server'
import axios from "axios";
import { PostItem } from '@/components';
import { Suspense } from 'react'

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await axios.get('http://localhost:3001/api/posts/'+slug).then(res => res.data)

    return <main>
        <Suspense fallback={<></>}>
            <header className={"w-full h-[75vh] grid place-content-center text-white text-center gap-2"}
                    style={{
                        background: `url("${post.background_image}"), rgba(0,0,0,0.65)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundBlendMode: "darken"
            }}>
                <p className={"text-sm"}>{new Date(post.createdAt).toDateString()
                    .replace('Mon', '')
                    .replace('Tue', '')
                    .replace('Wed', '')
                    .replace('Thu', '')
                    .replace('Fri', '')
                    .replace('Sat', '')
                    .replace('Sun', '')}</p>
                <h1 className={"text-3xl font-thin"}>{post.title}</h1>
                <p className={"text-sm mt-2 w-2/3 mx-auto"}>{post.description}</p>
            </header>
            <section className={"px-12 sm:px-20 md:px-32 lg:px-56"}>
                <div className={"pl-12 sm:pl-16 md:pl-24 lg:pl-32 py-16 grid gap-6 border-l-[1px] border-l-slate-300"}>
                    {post.content.map((props: any, index: any) => {
                        return <PostItem type={props.type} props={props} key={index} />
                    })}
                </div>
            </section>
        </Suspense>
    </main>
}