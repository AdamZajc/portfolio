'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/navigation'

const montserrat = Montserrat({ subsets: ['latin'] })

function NavLink({ text, onClick }: { onClick: () => {}, text: string }) {
    return <h3 onClick={onClick} className={"text-lg font-thin w-full py-2 px-6 hover:bg-sky-600 rounded-full"}>
        {text}
    </h3>
}

export default function DashboardNavbar() {
    const [mobile, setMobile] = useState<boolean>(true)
    const router = useRouter()

    function handleResize() { window.innerWidth <= 1024 ? setMobile(true) : setMobile(false) }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        handleResize()
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    return <nav className={`sticky h-screen top-0 left-0 bottom-0 z-50 text-white bg-sky-700 lg:w-80 w-72 p-10`}>
        <div className={"fixed"}>
            <Link href={"/"} className={"flex items-center text-2xl mx-auto " + montserrat.className}>
                <h1>
                    univise_works
                    <sup className={"text-sky-600 ml-1"}>&#9679;</sup>
                </h1>
            </Link>
            <div className={"mt-48 grid gap-2"}>
                <NavLink text={"Overview"} onClick={() => router.replace('/dashboard')} />
                <NavLink text={"Blogpage"} onClick={() => router.replace("/dashboard/blogpage")} />
            </div>
        </div>
    </nav>
}