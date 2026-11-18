"use client";
import { motion, useMotionValue, useScroll } from "motion/react";
import { Montserrat } from "next/font/google";
import { transition_props } from "@/styles/transition";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Homepage() {
  const router = useRouter();

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
      <section className="py-16 px-24 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12 h-32">
        {/* <motion.div
          className={"w-full p-8 rounded-tl-full rounded-br-full bg-sky-100 relative"}
          {...transition_props}
        >
        </motion.div>
        <motion.div className="w-full p-8 rounded-b-full bg-sky-300" {...{...transition_props, transition: { delay: 0.1 }}}>
          
        </motion.div>
        <motion.div className="w-full p-8 rounded-r-full bg-sky-200" {...{...transition_props, transition: { delay: 0.2 }}}>
          
        </motion.div> */}
      </section>
    </main>
  );
}
