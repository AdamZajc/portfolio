"use client";
import { motion } from "motion/react";
import { Montserrat } from "next/font/google";
import { transition_props } from "@/styles/transition";
import { useRouter } from "next/navigation";
import { IoIosPaper, IoMdPeople } from "react-icons/io";
import { PiArrowsClockwiseBold, PiEnvelopeSimpleBold, PiFileTextFill, PiTextAaBold } from "react-icons/pi";
import { useForm } from "react-hook-form";

const montserrat = Montserrat({ subsets: ["latin"] });

type FormFields = { topic: string; email: string; content: string };

export default function Homepage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<FormFields>();

  const onSubmit = async (data: FormFields) => {
    console.log(data);
  };

  return (
    <main>
      <header className={"md:flex h-screen"}>
        <div
          className={
            "h-screen w-full flex flex-col justify-center gap-y-4 p-24"
          }
        >
          <motion.h1
            className={"text-4xl " + montserrat.className}
            {...transition_props}
          >
            Technology & Design Solutions
            <sup className={"text-sky-600 ml-1"}>&#9679;</sup>
          </motion.h1>
          <motion.p
            className="pr-[10vw] text-justify font-thin"
            {...{ ...transition_props, transition: { delay: 0.1 } }}
          >
            We drive technology and modern policy towards sustainability and
            social responsibility, innovating towards the achievement of UN
            sustainability goals & a pro-consumer market.
          </motion.p>
          <div className="flex gap-6 mt-2">
            <motion.button
              onClick={() => router.push("/products")}
              className="px-6 py-2 cursor-pointer border border-sky-500 text-sky-500 rounded-tr-2xl rounded-bl-2xl hover:bg-sky-500 hover:text-white"
              {...{ ...transition_props, transition: { delay: 0.2 } }}
            >
              Our Products
            </motion.button>
            <motion.button
              className="px-6 py-2 cursor-pointer hover:bg-sky-500 bg-sky-300 text-white rounded-tl-2xl rounded-br-2xl"
              {...{ ...transition_props, transition: { delay: 0.3 } }}
              onClick={() => router.push("/#contact")}
            >
              Contact Us
            </motion.button>
          </div>
        </div>
        <div
          className={
            "md:ml-auto w-full md:w-auto md:h-full grid grid-cols-3 grid-rows-4 aspect-3/4"
          }
        >
          <div
            className={"bg-sky-800 h-full aspect-square"}
            style={{ borderRadius: "100% 100% 000% 000%" }}
          />
          <div
            className={"bg-sky-300 h-full aspect-square"}
            style={{ borderRadius: "100% 000% 100% 100%" }}
          />
          <div
            className={"bg-sky-200 h-full aspect-square"}
            style={{ borderRadius: "100% 100% 100% 100%" }}
          />
          <div
            className={"bg-sky-950 h-full aspect-square"}
            style={{ borderRadius: "000% 000% 100% 100%" }}
          />
          <div
            className={"bg-sky-600 h-full aspect-square"}
            style={{ borderRadius: "100% 100% 000% 100%" }}
          />
          <div
            className={"bg-sky-100 h-full aspect-square"}
            style={{ borderRadius: "100% 000% 000% 000%" }}
          />
          <div
            className={"bg-sky-400 h-full aspect-square"}
            style={{ borderRadius: "100% 100% 100% 000%" }}
          />
          <div
            className={"bg-sky-500 h-full aspect-square"}
            style={{ borderRadius: "100% 100% 100% 100%" }}
          />
          <div
            className={"bg-sky-900 h-full aspect-square"}
            style={{ borderRadius: "000% 000% 100% 000%" }}
          />
          <div
            className={"bg-sky-700 h-full aspect-square"}
            style={{ borderRadius: "100% 000% 000% 100%" }}
          />
          <div
            className={"bg-sky-200 h-full aspect-square"}
            style={{ borderRadius: "000% 100% 100% 100%" }}
          />
          <div
            className={"bg-sky-500 h-full aspect-square"}
            style={{ borderRadius: "100% 000% 000% 000%" }}
          />
        </div>
      </header>
      <section className="py-16 px-24 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
        <motion.div
          className={"w-full p-8 rounded bg-stone-100"}
          {...transition_props}
        >
          <div className="flex gap-4 items-center">
            <div className="aspect-square w-24 bg-sky-600 rounded-full text-white text-6xl grid place-content-center">
              <IoMdPeople />
            </div>
            <h1 className="font-thin text-xl">Customer-Oriented Approach</h1>
          </div>
        </motion.div>
        <motion.div
          className="w-full p-8 rounded bg-stone-100 "
          {...{ ...transition_props, transition: { delay: 0.1 } }}
        >
          <div className="flex gap-4 items-center">
            <div className="aspect-square w-24 bg-sky-400 rounded-full text-white text-6xl grid place-content-center">
              <PiArrowsClockwiseBold />
            </div>
            <h1 className="font-thin text-xl">
              Sustainable & <br /> Progressive Approach
            </h1>
          </div>
        </motion.div>
        <motion.div
          className="w-full p-8 rounded bg-stone-100 "
          {...{ ...transition_props, transition: { delay: 0.2 } }}
        >
          <div className="flex gap-4 items-center">
            <div className="aspect-square w-24 bg-sky-500 rounded-full text-white text-6xl grid place-content-center">
              <IoIosPaper />
            </div>
            <h1 className="font-thin text-xl">
              Driving Innovative <br />
              Public Policy
            </h1>
          </div>
        </motion.div>
      </section>
      <section id="contact" className="h-screen px-24 grid">
        <motion.form className="p-8 bg-white shadow rounded w-140 self-center" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl text-center font-thin">Contact Form</h1>
          <label className="relative left-6 top-3 flex gap-1 items-center"><PiTextAaBold />Topic</label>
          <input type="text" className="text-sm w-full px-6 py-3 bg-stone-100 rounded-md focus:outline-none" {...register('topic')} />
          <label className="relative left-6 top-3 flex gap-1 items-center"><PiEnvelopeSimpleBold />Email</label>
          <input type="email" className="text-sm w-full px-6 py-3 bg-stone-100 rounded-md focus:outline-none" {...register('email')} />
          <label className="relative left-6 top-3 flex gap-1 items-center"><PiFileTextFill />Contents</label>
          <textarea className="text-sm w-full px-6 py-4 bg-stone-100 rounded-md focus:outline-none h-56" {...register('content')} />
          <button className="flex gap-2 rounded-md bg-sky-600 cursor-pointer items-center justify-center text-white w-full px-8 py-3 mt-4" type="submit"><PiEnvelopeSimpleBold /> Send Message</button>
        </motion.form>
      </section>
    </main>
  );
}
