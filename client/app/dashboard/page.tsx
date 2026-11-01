'use client'
import axios from 'axios';
import LoginForm from './login_form'
import { useState } from 'react';

export default function Dashboard() {
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
    else return <main></main>
}