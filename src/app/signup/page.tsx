'use client'

// Hook to track local states
import { useState } from 'react'
// Custom nhost client
import { nhost } from '@/lib/nhost'
// Hook to navigate through the app directory when needed
import { useRouter } from 'next/navigation'
// Custom input and button ui components
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// Used for link creation
import Link from 'next/link'

// Sign up page logic
export default function SignupPage() {
    // Initialize email and password as empty
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // Set error message as empty and success boolean to false
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    // Router used for navigation in app directory
    const router = useRouter();

    // Function to handle form submission
    const handleSignUp = async (e: React.FormEvent) => {
        // Prevents page refresh on a form submit
        e.preventDefault()
        // Sends sign-up request to nhost with provided email and password
        const { error } = await nhost.auth.signUp({
            email,
            password
        })
        // Handle error case
        if (error) {
            setError(error.message)
            setSuccess(false)
        } else {
            // Clear previous error
            setError('')
            // Mark as a successful sign-up
            setSuccess(true)
            // Fetch and log the new user info
            const user = await nhost.auth.getUser()
            console.log('Signed up:', user)
            // Redirect to login page after a short delay
            setTimeout(() => router.push('/login'), 1500)
        }
    }

    return (
        // Full-screen centered form container
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                {/* Page title */}
                <h1 className="text-xl font-bold mb-6 test-center">Create your account</h1>
                {/* Sign-up form */}
                <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                    {/* Email input field */}
                    <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    {/* Password input field */}
                    <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    {/* Submit button*/}
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    {success && <p className="text-sm text-green-600 text-center">Success! You can now log in.</p>}
                </form>
                {/* Nav link for login page */}
                <p className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 underline hover:text-blue-800">Log in</Link>
                </p>
            </div>
        </div>
    )
}