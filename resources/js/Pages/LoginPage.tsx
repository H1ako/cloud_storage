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
            <form className="auth-form">
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
                <Link className='auth-form__link' href='/sign-up'>Dont have account yet? Sign Up</Link>
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
            </form>
        </AuthPageLayout>
    )
}