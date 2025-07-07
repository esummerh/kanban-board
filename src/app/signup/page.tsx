'use client'

import { useState } from 'react'
import { nhost } from '@/lib/nhost'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
            setSuccess(false)
        } else {
            setError('')
            setSuccess(true)
            const user = await nhost.auth.getUser()
            console.log('Signed up:', user)
            setTimeout(() => router.push('/login'), 1500)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-xl font-bold mb-6 test-center">Create your account</h1>
                <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                    <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    {success && <p className="text-sm text-green-600 text-center">Success! You can now log in.</p>}
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 underline hover:text-blue-800">Log in</Link>
                </p>
            </div>
        </div>
    )
}