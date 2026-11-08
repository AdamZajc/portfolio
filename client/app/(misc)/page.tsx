'use client';
import dynamic from "next/dynamic";
import { Montserrat } from 'next/font/google'
import {testimonials} from "@/data/store";
import {useState} from "react";

const PhotoChip = dynamic(() => import('@/components/photo_chip'), {
  ssr: false,
})

const montserrat = Montserrat({ subsets: ["latin"] })

export default function Home() {
  const [testimonial, setTestimonial] = useState<number>(0)

  setInterval(() => {
    if ((testimonial + 1) < (testimonials.length - 5)) setTestimonial(testimonial + 1)
    else setTestimonial(0)
  }, 2500)

  return <main>
    <section id="welcome" className={"h-screen w-full overflow-y-hidden grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6"}>
      <div className="-mt-24">
        <PhotoChip key={1} /><PhotoChip key={2}/><PhotoChip key={3} />
        </div>
        <div className={"-mt-32"}>
          <PhotoChip key={4} /><PhotoChip key={5}/><PhotoChip key={6} />
        </div>
        <div className={"hidden sm:block -mt-16"}>
          <PhotoChip key={7} /><PhotoChip key={8}/><PhotoChip key={9} />
        </div>
        <div className={"hidden md:block -mt-48"}>
          <PhotoChip key={10} /><PhotoChip key={11}/><PhotoChip key={12} />
        </div>
        <div className={"hidden lg:block"}>
          <PhotoChip key={13} /><PhotoChip key={14}/><PhotoChip key={15} />
        </div>
        <div className={"hidden xl:block -mt-12"}>
          <PhotoChip key={16} /><PhotoChip key={17}/><PhotoChip key={18} />
        </div>
        <div className={"hidden xl:block -mt-56"}>
          <PhotoChip key={19} /><PhotoChip key={20}/><PhotoChip key={21} />
        </div>
      <div className={"absolute top-0 left-0 right-0 h-screen w-full bg-[rgba(0,0,0,0.75)] grid place-content-center"}>
        <h1 className={"text-4xl text-white font-semibold " + montserrat.className}>Technology, Society & Responsibility...</h1>
      </div>
    </section>
    <section className={"h-screen"} id={"about"}></section>
    <section className={"h-screen overflow-hidden"} id={"testimonials"}>
      <div className={"h-96 w-fit flex gap-8 py-4 px-8"}>
        {testimonials.map((t, index) => {
          return <div className={"w-80 h-full bg-slate-50 shadow-lg p-8"} key={index}></div>
        })}
      </div>
    </section>
    <section className={"h-screen"} id={"contact"}></section>
  </main>
}