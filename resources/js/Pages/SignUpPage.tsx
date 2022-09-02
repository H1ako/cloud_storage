// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react';
// layout
import AuthPageLayout from '../Layouts/AuthPageLayout';
import TopTextInput from '../Components/TopTextInput';
// components


export default function SignUpPage() {
    const [ email, setEmail ] = React.useState<string>('')
    const [ password, setPassword ] = React.useState<string>('')
    const [ passwordAgain, setPasswordAgain ] = React.useState<string>('')
    
    return (
        <AuthPageLayout>
            <TopTextInput
                placeholder='Email'
                type='email'
                topText='Your email'
                state={email}
                setState={setEmail}
                required={true}
            />
            <div className="passwords">
                <TopTextInput
                    placeholder='Password'
                    type='password'
                    topText='Your password'
                    state={password}
                    setState={setPassword}
                    required={true}
                />
                <TopTextInput
                    placeholder='Password again'
                    type='password'
                    topText='Your password again'
                    state={passwordAgain}
                    setState={setPasswordAgain}
                    required={true}
                />
            </div>
            <Link
                data={{ 
                    email,
                    password
                }}
                href='/sign-up'
                method='post'
                as='button'
                type='button'
            >Sign Up</Link>
        </AuthPageLayout>
    )
}