'use client';
import dynamic from "next/dynamic";

const PhotoChipC = dynamic(() => import('@/components/photo_chip'), {
  ssr: false,
})

export default function Home() {
  return <main>
    <section id="welcome" className={"h-screen w-full overflow-y-hidden grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6"}>
      <div className="-mt-24">
        <PhotoChipC key={1} /><PhotoChipC key={2}/><PhotoChipC key={3} />
        </div>
        <div className={"-mt-32"}>
          <PhotoChipC key={4} /><PhotoChipC key={5}/><PhotoChipC key={6} />
        </div>
        <div className={"hidden sm:block -mt-16"}>
          <PhotoChipC key={7} /><PhotoChipC key={8}/><PhotoChipC key={9} />
        </div>
        <div className={"hidden md:block -mt-48"}>
          <PhotoChipC key={10} /><PhotoChipC key={11}/><PhotoChipC key={12} />
        </div>
        <div className={"hidden lg:block"}>
          <PhotoChipC key={13} /><PhotoChipC key={14}/><PhotoChipC key={15} />
        </div>
        <div className={"hidden xl:block -mt-12"}>
          <PhotoChipC key={16} /><PhotoChipC key={17}/><PhotoChipC key={18} />
        </div>
        <div className={"hidden xl:block -mt-56"}>
          <PhotoChipC key={19} /><PhotoChipC key={20}/><PhotoChipC key={21} />
        </div>
      <div className={"absolute top-0 left-0 right-0 h-screen w-full bg-[rgba(0,0,0,0.5)]"}/>
    </section>
    abbbb
  </main>
}