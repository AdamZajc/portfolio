'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined" && !window.localStorage.getItem('token')) return router.push('/dashboard/auth')
    }, [])

    return <main></main>
}