'use client';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type FormFields = {
    login: string;
    password: string;
}

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>()
    const router = useRouter()

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        axios.post('http://localhost:3001/api/us/admin/login', data).then((res) => {
            if(typeof window !== "undefined") window.localStorage.setItem('token', res.data.token)
            router.refresh()
        })
    }

    return <form onSubmit={handleSubmit(onSubmit)} className={"rounded-3xl p-8 bg-white shadow-md lg:w-[25vw] md:w-[45vw] sm:w-[60vw] w-[80vw] grid justify-center items-center gap-8"}>
        <h1 className={"uppercase font-bold text-2xl text-center"}>Authentication</h1>
        <div className={"w-76"}>
            <p className={"absolute ml-6 -mt-2.5 text-sm bg-white px-2"}>Login</p>
            <input
                type={"text"}
                className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-full focus:outline-none text-sm"}
                {...register('login', { required: true })}
            />
        </div>
        <div className={"w-76"}>
            <p className={"absolute ml-6 -mt-2.5 text-sm bg-white px-2"}>Password</p>
            <input
                type={"password"}
                className={"w-full px-6 py-2.5 bg-white border-[1px] border-black rounded-full focus:outline-none text-sm"}
                {...register('password', { required: true })}
            />
        </div>
        <button type={"submit"} className={"w-48 rounded-full bg-sky-800 py-2.5 text-white mx-auto hover:bg-sky-700"}>Authenticate</button>
    </form>
}