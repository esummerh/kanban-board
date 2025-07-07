"use client";

import { useEffect, useState } from "react"
import { nhost } from "@/lib/nhost"
import { useRouter } from "next/navigation"
import { useUserId } from '@nhost/nextjs'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Log in to your account</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Button type="submit" className="w-full">Log In</Button>
                    {errorMsg && <p className="text-sm text-red-600 text-center">{errorMsg}</p>}
                </form>
            </div>
        </div>
    )
}