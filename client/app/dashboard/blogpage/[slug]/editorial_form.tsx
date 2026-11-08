'use client';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {ReactNode, useState} from 'react'

type IType = "paragraph" | "heading" | "link" | "image" | "video" | "list" | "code" | "quote";
type Props = { type: IType; text?: string; href?: string; src?: string; heading?: string; items?: string[]; };

type FormFields = {
    title: string,
    description: string,
    categories: string[],
    author: string,
    background_image: string,
}

function Input({ type, register, onChange, name, children }: { children?: ReactNode, name: string, type: 'textarea' | 'input' | 'select', register: any, onChange?: any }) {
    function determineType() {
        switch(type) {
            case 'textarea':
                return  <textarea
                    onChange={onChange}
                    className={"h-40 w-full px-6 py-2.5 bg-white border border-black rounded-lg focus:outline-none text-sm"}
                    {...register}/>
            case 'input':
                return <input
                    onChange={onChange}
                    className={"w-full px-6 py-2.5 bg-white border border-black rounded-lg focus:outline-none text-sm"}
                    {...register}/>
            case 'select':
                return <select onChange={onChange}
                               className={"w-full px-6 py-2.5 bg-white border border-black rounded-lg focus:outline-none text-sm"}
                               {...register}>
                    {children}
                </select>
        }
    }

    return <div>
        <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>{name}</p>
        {determineType()}
    </div>
}

function UpdatedItemForm({ item, working_array, index, removeAction, upAction, downAction }: {
    item: Props, working_array: Props[], index:number, removeAction: () => void, upAction: () => void, downAction: () => void })
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

    const onSubmit: SubmitHandler<Props> = (data) => {
        working_array.splice(index, 1, data)
    }

    function matchElements() {
        switch (type) {
            case 'video':
                return <div className={"col-span-4"}>
                    <Input
                        type={"input"}
                        name={"Link To Source"}
                        onChange={() => handleSubmit(onSubmit)()}
                        register={register('src', { required: true })}
                    />
                </div>
            case "paragraph":
                return <div className={"col-span-4"}>
                    <Input
                        type={"textarea"}
                        name={"Text"}
                        onChange={() => handleSubmit(onSubmit)()}
                        register={register('text', { required: true })}
                    />
                </div>
            case "heading":
                return <><div className={"col-span-3"}>
                    <Input
                        type={"input"}
                        name={"Text"}
                        onChange={() => handleSubmit(onSubmit)()}
                        register={register('text', { required: true })}
                    />
                </div><div>
                    <Input
                        type={"select"}
                        name={"Heading"}
                        onChange={() => handleSubmit(onSubmit)()}
                        register={register('heading', { required: true })}
                    >
                        <option value={"1"}>Heading 1</option>
                        <option value={"2"}>Heading 2</option>
                        <option value={"3"}>Heading 3</option>
                        <option value={"4"}>Heading 4</option>
                        <option value={"5"}>Heading 5</option>
                    </Input>
                </div></>
            case "link":
                return <>
                    <div className={"col-span-2"}>
                        <Input
                            type={"input"}
                            name={"Text"}
                            onChange={() => handleSubmit(onSubmit)()}
                            register={register('text', { required: true })}
                        />
                    </div><div className={"col-span-2"}>
                    <Input
                        type={"input"}
                        name={"URL"}
                        onChange={() => handleSubmit(onSubmit)()}
                        register={ register('href', { required: true })}
                    />
                </div>
                </>
            case 'image':
                return <div className={"col-span-4"}>
                    <Input
                        type={"input"}
                        name={"Link To Source"}
                        onChange={() => handleSubmit(onSubmit)()}
                        register={register('src', { required: true })}
                    />
                </div>
            case 'list':
                return <div className={"col-span-4 grid gap-4"}>
                    {item.items}
                </div>
        }
    }

    return <form className={"grid gap-4 cursor-pointer"}>
        <div className={"w-full border-b border-black px-8 flex items-center hover:bg-gray-100 gap-4"}>
            <h1 className={"text-lg font-bold w-full py-4"} onClick={() => setOpen(!open)}>Element {index + 1}</h1>
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
    const contents: Props[] = postValues.content;

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        axios.put('http://localhost:3001/api/posts/'+slug, {
            ...data,
            content: contents,
        }, {
            headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
        }).then(() => {
            router.refresh()
        }).catch(err => {
            console.log(err)
        })
    }

    return <div><form id={"editorial"} onSubmit={handleSubmit(onSubmit)} className={"grid gap-2"}>
        <Input
            type={"input"}
            name={"Title"}
            register={register('title', { required: true })}
        />
        <div className={"grid grid-cols-4 gap-6"}>
            <div>
                <p className={"relative ml-6 top-2.5 text-sm bg-white px-2 w-fit"}>Categories</p>
                <input
                    type={"text"}
                    className={"w-full px-6 py-2.5 bg-white border border-black rounded-lg focus:outline-none text-sm"}
                    {...register('categories', { required: true })}
                    multiple/>
            </div>
            <div>
                <Input
                    type={"input"}
                    name={"Author"}
                    register={register('author', { required: true })}
                />
            </div>
            <div className={"col-span-2"}>
                <Input
                    type={"input"}
                    name={"Image URL"}
                    register={register('background_image', { required: true })}
                />
            </div>
        </div>
        <div className={"grid grid-cols-2 gap-6"}>
            <div>
                <Input
                    type={"textarea"}
                    name={"Title"}
                    register={register('description', { required: true })}
                />
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
        <h1 className={"text-2xl font-bold border-b border-black py-4 px-8"}>Content Editing</h1>
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