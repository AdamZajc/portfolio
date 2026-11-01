'use server'
import axios from "axios";
import EditorialForm from './editorial_form'

export default async function PostEditor({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await axios.get('http://localhost:3001/api/posts/'+slug).then(res => res.data)

    return <main className={"px-20 py-12 w-full"}>
        <h1 className={"text-center text-3xl font-bold"}>Post Editorial Form</h1>
        <EditorialForm postValues={post} slug={slug} />
    </main>
}