// global
import React from 'react'
// layout
import PageLayout from '../Layouts/Page';


export default function HomePage() {
    const [count, setCount] = React.useState(1)
    return (
        <PageLayout>
            {count}
            <button onClick={() => setCount(e => e+1)}>add</button>
        </PageLayout>
    )
}