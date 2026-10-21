'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function NavLink({ href, text }: { href: string, text: string }) {
    return <Link href={href} className={"text-lg font-thin uppercase group"}>
        {text}
        <div className={"w-0 h-px bg-black group-hover:w-full"} />
    </Link>
}

export default function Navbar() {
    const [mobile, setMobile] = useState<boolean>(true)

    function handleResize() { window.innerWidth <= 768 ? setMobile(true) : setMobile(false) }

    useEffect(() => handleResize(), []);
    useEffect(() => {
        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    return <nav className={`absolute left-20 right-20 top-10 grid grid-cols-4`}>
            <div className={"flex items-center text-2xl"}><h1>@/2</h1></div>
            <div className={"flex items-center gap-12 col-span-2 justify-center"}>
                {mobile ? <div>

                </div> : <>
                    <NavLink href="/" text="Home" />
                    <NavLink href="/#about" text="About" />
                    <NavLink href="/blog" text="Blog" />
                    <NavLink href="/#testimonials" text="Testimonials" />
                    <NavLink href="/#contact" text="Contact" />
                </>}
            </div>
    </nav>
}