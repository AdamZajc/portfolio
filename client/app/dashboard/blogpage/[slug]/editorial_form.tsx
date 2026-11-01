'use client';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type IType = "paragraph" | "heading" | "link" | "image" | "video" | "list" | "code" | "quote";
type Props = { type: IType; text?: string; href?: string; src?: string; heading?: string; items?: string[]; };

type FormFields = {
    title: string,
    description: string,
    categories: string[],
    author: string,
    background_image: string,
}

function UpdatedItemForm({ item, working_array, index, removeAction, upAction, downAction }: {
    props: Props, working_array: Props[], index:number, removeAction: () => {}, upAction: () => {}, downAction: () => {} })
{
    const [open, setOpen] = useState<boolean>(false);
    const { register, handleSubmit, watch } = useForm<Props>({
        defaultValues: {
            type: item.type,
            text: item.text,
            href: item.href,
            src: item.src,
            heading: item.heading,
            items: item.items,
        }
    });
    const type = watch('type');
    const router = useRouter()

    const onSubmit: SubmitHandler<Props> = (data) => {
        working_array.splice(index, 1, data)
    }

    function matchElements() {
        switch (type) {
            case "paragraph":
                return <div className={"col-span-4"}>
                    <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Text</p>
                    <textarea
                        onChange={handleSubmit(onSubmit)()}
                        className={"h-40 w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
                        {...register('text', { required: true })}/>
                </div>
            case "heading":
                return <><div className={"col-span-3"}>
                    <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Text</p>
                    <input onChange={handleSubmit(onSubmit)()} className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
                           {...register('text')}/>
                </div><div>
                    <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Heading</p>
                    <select onChange={handleSubmit(onSubmit)()} className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
                            {...register('heading', { required: true })}>
                        <option value={"1"}>Heading 1</option>
                        <option value={"2"}>Heading 2</option>
                        <option value={"3"}>Heading 3</option>
                        <option value={"4"}>Heading 4</option>
                        <option value={"5"}>Heading 5</option>
                    </select>
                </div></>
            case "link":
                return <>
                    <div className={"col-span-2"}>
                        <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Text</p>
                        <input onChange={handleSubmit(onSubmit)()} className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
                               {...register('text')}/>
                    </div><div className={"col-span-2"}>
                    <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>URL</p>
                    <input onChange={handleSubmit(onSubmit)()} className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
                           {...register('href')}/>
                </div>
                </>
            case 'image':
                return <div className={"col-span-4"}>
                    <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Link To Source</p>
                    <input onChange={handleSubmit(onSubmit)()} className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
                           {...register('src')}/>
                </div>
            case 'list':
                return <div className={"col-span-4 grid gap-4"}>
                    {item.items}
                </div>
        }
    }

    return <form className={"grid gap-4 cursor-pointer"}>
        <div className={"w-full border-b-[1px] border-black px-8 py-4 flex items-center hover:bg-gray-100 gap-4"}>
            <h1 className={"text-lg font-bold w-full"} onClick={() => setOpen(!open)}>Element {index + 1}</h1>
            <select onChange={handleSubmit(onSubmit)()}  className={"focus:outline-none w-42 ml-auto mr-0"} {...register('type', { required: true })}>
                <option value={"paragraph"}>Paragraph</option>
                <option value={"heading"}>Heading</option>
                <option value={"link"}>Hyperlink</option>
                <option value={"image"}>Photograph</option>
                <option value={"video"}>Video</option>
                <option value={"list"}>List</option>
                <option value={"code"}>Code Block</option>
                <option value={"quote"}>Quotation</option>
            </select>
            {index !== 0 ? <button onClick={upAction} className={"w-12 h-12 cursor-pointer"}>U</button> : <div className={"w-12 h-12"} />}
            {index !== (working_array.length - 1) ? <button onClick={downAction} className={"w-12 h-12 cursor-pointer"}>D</button> : <div className={"w-12 h-12"} />}
            <button onClick={removeAction} className={"w-12 h-12 cursor-pointer"}>X</button>
        </div>
        {open ?
            <div className={"grid grid-cols-4 gap-4"}>
                {matchElements()}
            </div>
            : <></>}
    </form>
}

export default function EditorialForm({ postValues, slug }:
{ postValues: { title: string,
        description: string,
        categories: string[],
        author: string,
        background_image: string, content: Props[] }, slug: string }) {
    const { register, handleSubmit, watch } = useForm<FormFields>({ defaultValues: {
            title: postValues.title,
            description: postValues.description,
            author: postValues.author,
            categories: postValues.categories,
            background_image: postValues.background_image
        } })
    const router = useRouter()
    let contents: Props[] = postValues.content;

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        axios.put('http://localhost:3001/api/posts/'+slug, {
            ...data,
            content: contents,
        }, {
            headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
        }).then((res) => {
            router.refresh()
        }).catch(err => {
            console.log(err)
        })
    }

    return <div><form id={"editorial"} onSubmit={handleSubmit(onSubmit)} className={"grid gap-2"}>
        <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Title</p>
        <input
            type={"text"}
            className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
            {...register('title', { required: true })} />
        <div className={"grid grid-cols-4 gap-6"}>
            <div>
                <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Categories</p>
                <input
                    type={"text"}
                    className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
                    {...register('categories', { required: true })}
                    multiple/>
            </div>
            <div>
                <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Author</p>
                <input
                    type={"text"}
                    className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
                    {...register('author', { required: true })} />
            </div>
            <div className={"col-span-2"}>
                <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Image URL</p>
                <input
                    type={"text"}
                    className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
                    {...register('background_image', { required: true })}/>
            </div>
        </div>
        <div className={"grid grid-cols-2 gap-6"}>
            <div>
                <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Description</p>
                <textarea
                    className={"w-full h-36 px-6 py-4 bg-white border-[1px] border-black rounded-lg focus:outline-none text-sm"}
                    {...register('description', { required: true })}/>
            </div>
            <div
                className={"w-full h-36 mt-5 rounded-lg"}
                style={{
                    backgroundImage: `url("${watch('background_image')}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </div>
    </form>
        <h1 className={"text-2xl font-bold border-b-[1px] border-black py-4 px-8"}>Content Editing</h1>
        <div className={"grid gap-2"}>
            {contents.map((item: Props, index: number) => {
                return <div key={index}>
                    <UpdatedItemForm item={item} index={index} working_array={contents} upAction={() => {
                        contents.splice(index, 1, contents[index-1])
                        contents.splice(index-1, 1, item)
                        handleSubmit(onSubmit)().then(() => window.location.reload())
                    }} downAction={() => {
                        contents.splice(index, 1, contents[index+1])
                        contents.splice(index+1, 1, item)
                        handleSubmit(onSubmit)().then(() => window.location.reload())
                    }} removeAction={() => {
                        contents.splice(index, 1)
                        handleSubmit(onSubmit)().then(() => window.location.reload())
                    }} />
                </div>
            })}
        </div>
        <button onClick={() => {
            contents.push({ type: 'paragraph' })
            handleSubmit(onSubmit)().then(() => router.refresh())
        }} className={"w-full h-12 bg-sky-700 rounded-lg text-white my-6 cursor-pointer"}>Add Element</button>
        <button form={"editorial"} type={"submit"} className={"cursor-pointer float-right px-8 py-2 rounded-lg bg-sky-700 text-white"}>Update Post</button>
    </div>
}