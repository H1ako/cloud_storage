// global
import React, { useState } from 'react'
// layout
import PageLayout from '../../Layouts/Page/Page';


export default function HomePage() {
    const [count, setCount] = useState(1)
    return (
        <PageLayout>
            {count}
            <button onClick={() => setCount(e => e+1)}>add</button>
        </PageLayout>
    )
}