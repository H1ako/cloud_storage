// global
import React from 'react'
import { Inertia } from '@inertiajs/inertia';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// components
import FileResult from './FileResult';


export default function Search({searchResults}: any) {
    const [ searchQuery, setSearchQuery ] = React.useState<string>('')
    const [ searchResultsa, setSearchResults ] = React.useState<IFile[]>([])

    const onChangehandler = (e: React.ChangeEvent) => {
        const newQuery = (e.target as HTMLInputElement).value
        setSearchQuery(newQuery)
    }

    React.useEffect(() => {
        Inertia.get('/api/search/files', {
            query: searchQuery
        }, {
            preserveScroll: true,
            onSuccess: (data) => {
                console.log(data)
            }
        })
    }, [searchQuery])

    return (
        <div className='search'>
            <label htmlFor="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </label>
            <input
                id="search"
                type="search"
                value={searchQuery}
                onChange={onChangehandler}
                placeholder="Search For Files"
            />
            <ul className="search__results">
                { searchResultsa.map(resultFile => (
                    <FileResult file={resultFile} />
                ))}
            </ul>
        </div>
    )
}