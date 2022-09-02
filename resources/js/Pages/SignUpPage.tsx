// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react';
// layout
import AuthPageLayout from '../Layouts/AuthPageLayout';
// components
import TopTextInput from '../Components/TopTextInput';
import UploadPicture from '../Components/UploadPicture';


export default function SignUpPage() {
    const [ email, setEmail ] = React.useState<string>('')
    const [ password, setPassword ] = React.useState<string>('')
    const [ passwordAgain, setPasswordAgain ] = React.useState<string>('')
    const [ currentPictureFile, setCurrentPictureFile ] = React.useState<File | null>(null)
    
    return (
        <AuthPageLayout>
            <form className="auth-form">
                <UploadPicture
                    setCurrentPictureFile={setCurrentPictureFile}
                    className='auth-form__picture'
                />
                <TopTextInput
                    placeholder='Email'
                    type='email'
                    topText='Your email'
                    state={email}
                    setState={setEmail}
                    required={true}
                />
                <div className="auth-form__passwords">
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
                <Link className='auth-form__link' href='/login'>Have account already? Sign In</Link>
                <Link
                    data={{ 
                        email,
                        password,
                        passwordAgain,
                        picture: currentPictureFile
                    }}
                    href='/sign-up'
                    method='post'
                    as='button'
                    type='button'
                >Sign Up</Link>
            </form>
        </AuthPageLayout>
    )
}