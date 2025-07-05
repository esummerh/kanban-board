'use client'

import { useState } from 'react'
import { nhost } from '@/lib/nhost'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()

        const { error } = await nhost.auth.signUp({
            email,
            password
        })

        if (error) {
            setError(error.message)
        } else {
            setSuccess(true)
            const user = await nhost.auth.getUser()
            console.log('Signed up:', user)
            setTimeout(() => router.push('/login'), 1500)
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <input className="border p-2" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input className="border p-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Sign Up
                </button>
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">Success! You can now log in.</p>}
            </form>
        </div>
    )
}