// global
import React from 'react'
import { Link } from '@inertiajs/inertia-react';
// layout
import AuthPageLayout from '../Layouts/AuthPageLayout';
// components

interface Props extends ISharedProps {
    files: RequestFilesType
}

export default function LoginPage({auth}: Props) {
    
    return (
        <AuthPageLayout>
            <Link
                data={{ 
                    
                 }}
                href='/login'
                method='post'
                as='button'
                type='button'
            ></Link>
        </AuthPageLayout>
    )
}