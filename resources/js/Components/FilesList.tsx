// global
import React from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchFiles } from '../store/slices/filesSlice';


export default function FilesList() {
    const { files } = useAppSelector(state => state.files)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchFiles())
    }, [])

    return (
        <ul className='files-list'>
            
        </ul>
    )
}