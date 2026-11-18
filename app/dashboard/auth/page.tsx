"use client";
import { transition_props } from "@/styles/transition";
import axios from "axios";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Fields = { login: string; password: string };

export default function Auth() {
  const { register, handleSubmit } = useForm<Fields>();
  const router = useRouter();

  const onSubmit = async (data: Fields) => {
     await axios.post('http://localhost:3001/api/us/admin/login', data).then(res => {
        window.localStorage.setItem('token', res.data.token)
     })
     router.push('/dashboard')
  };

  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage.getItem('token')) return router.push('/dashboard')
  }, [])

  return (
    <main className="grid place-content-center w-full h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow w-[80vw] md:w-[50vw] lg:w-[30vw] px-16 py-12 rounded-lg flex flex-col gap-2"
      >
        <motion.h1 className="text-center text-2xl" {...transition_props}>
          Authentication
        </motion.h1>
        <motion.div {...{ ...transition_props, transition: { delay: 0.1 } }}>
          <label className="relative left-6 top-3 px-2 bg-white">Email</label>
          <input
            type="text"
            className="w-full px-6 py-2 rounded-full border"
            {...register("login")}
          />
        </motion.div>
        <motion.div {...{ ...transition_props, transition: { delay: 0.2 } }}>
          <label className="relative left-6 top-3 px-2 bg-white">
            Login
          </label>
          <input
            type="password"
            className="w-full px-6 py-2 rounded-full border"
            {...register("password")}
          />
        </motion.div>
        <motion.button
          type="submit"
          className="px-8 py-2 rounded-lg bg-sky-600 mt-4 text-white cursor-pointer"
          {...{ ...transition_props, transition: { delay: 0.3 } }}
        >
          Authenticate
        </motion.button>
      </form>
    </main>
  );
}
