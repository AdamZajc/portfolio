"use client";
import { motion } from "motion/react";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { transition_props } from "@/styles/transition";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

const montserrat = Montserrat({ subsets: ["latin"] });

function NavLink({
  text,
  href,
  props,
  children,
}: {
  text: string;
  href: string;
  props?: any;
  children?: ReactNode;
}) {
  return (
    <div className="group w-fit flex flex-col">
      <Link href={href} className={"uppercase font-light group"}>
        <motion.div {...transition_props} {...props}>
          <div className="flex gap-2 group items-center">
            {text}
            {children ? (
              <IoIosArrowDown className="group-hover:rotate-180" />
            ) : (
              ""
            )}
          </div>
          <div className={"h-px w-0 bg-black group-hover:w-full"} />
        </motion.div>
      </Link>
      <div className="group-hover:block hidden absolute self-center pt-8">
            {children}
      </div>
    </div>
  );
}

export default function Navigation() {
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();

  function handleResize() {
    if (typeof window !== "undefined") {
      setMobile(window.innerWidth >= 768 ? false : true);
    }
  }

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (pathname.includes("/dashboard") && !pathname.includes('auth')) ? (
    <motion.nav
      className={
        "relative aspect-1/6 px-8 md:px-12 py-12 top-0 left-0 bottom-0 h-screen z-50 flex flex-col gap-10 bg-sky-500 text-white " +
        montserrat.className}
    >
        <Link href={"/"}>
          <motion.h1
            className={"text-2xl " + montserrat.className}
            {...transition_props}
          >
            univise_works
            <sup className={"text-sky-600 ml-1"}>&#9679;</sup>
          </motion.h1>
      </Link>
      <div className="my-auto w-fit">
        <Link href="/dashboard/blog" className="group uppercase">
          Blogpage
          <div className="w-0 h-[.5px] group-hover:w-full bg-white" />
        </Link>
      </div>
    </motion.nav>
  ) : (
    <motion.nav
      className={
        "absolute px-16 md:px-24 top-12 left-0 right-0 w-full z-50 flex gap-10 items-end " +
        montserrat.className +
        " " +
        (pathname.includes("/blog/") ? "text-white" : "")
      }
    >
      <Link href={"/"}>
        <motion.h1
          className={"text-2xl " + montserrat.className}
          {...transition_props}
        >
          univise_works
          <sup className={"text-sky-600 ml-1"}>&#9679;</sup>
        </motion.h1>
      </Link>
      {mobile ? (
        <></>
      ) : (
        <>
          <NavLink
            href={"/blog"}
            text={"Blog"}
            props={{ transition: { delay: 0.1 } }}
          />
          <NavLink
            href={"/solutions"}
            text={"Solutions"}
            props={{ transition: { delay: 0.2 } }}
          >
            <div className="bg-white shadow p-8 w-full flex flex-col gap-4">
               <Link href="/solutions#society" className="hover:text-sky-600">
                  Social Responsibility 
               </Link>
              <Link href="/solutions#sustainability" className="hover:text-sky-600">
                Sustainability
              </Link>
            </div>
          </NavLink>
          <NavLink
            href={"/products"}
            text={"Products"}
            props={{ transition: { delay: 0.3 } }}
          />
        </>
      )}
    </motion.nav>
  );
}
