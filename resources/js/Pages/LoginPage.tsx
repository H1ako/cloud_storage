// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react';
// layout
import AuthPageLayout from '../Layouts/AuthPageLayout';
import TopTextInput from '../Components/TopTextInput';
// components


export default function LoginPage() {
    const [ email, setEmail ] = React.useState<string>('')
    const [ password, setPassword ] = React.useState<string>('')
    
    return (
        <AuthPageLayout>
            <TopTextInput
                placeholder='Email'
                type='email'
                topText='Your email'
                state={email}
                setState={setEmail}
            />
            <TopTextInput
                placeholder='Password'
                type='password'
                topText='Your password'
                state={password}
                setState={setPassword}
            />
            <Link
                data={{ 
                    email,
                    password
                }}
                href='/login'
                method='post'
                as='button'
                type='button'
            >Log In</Link>
        </AuthPageLayout>
    )
}