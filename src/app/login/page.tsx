"use client";

import { useEffect, useState } from "react";
import { nhost } from "@/lib/nhost";
import { useRouter } from "next/navigation";
import { useUserId } from '@nhost/nextjs'

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await nhost.auth.signIn({
            email,
            password,
        });

        if (result.error) {
            setErrorMsg(result.error.message);
        } else {
            setErrorMsg("");
            setLoggedIn(true);
        }
    };

    const userId = useUserId()
    console.log('UserId:', userId)

    useEffect(() => {
        if (loggedIn) {
            router.push('/boards')
        }
    }, [loggedIn, router])

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Log In</button>
                {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            </form>
        </div>
    )
}