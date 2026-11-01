'use client'
import { DashboardNavbar } from '@/components'
import {useState} from "react";
import axios from "axios";
import LoginForm from "@/app/dashboard/login_form";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
    const [valid, setValid] = useState(false)
    const token = window.localStorage.getItem('token');

    const verify = async() => {
        await axios.get('http://localhost:3001/us/admin/verify', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(() => setValid(true))
            .catch((err) => setValid(false));
    }
    verify()

    if (!token || !valid) {
        return <main
            className={"w-full h-screen grid place-content-center"}
            style={{
                background: `url("https://images.pexels.com/photos/36169773/pexels-photo-36169773.jpeg"), rgba(0,0,0,0.6)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundBlendMode: "darken"
            }}
        >
            <LoginForm />
        </main>
    }

    return (
        <div className={"flex"}>
            <DashboardNavbar />
            {children}
        </div>
    );
}
