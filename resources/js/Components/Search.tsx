// global
import React from 'react'
import axios from 'axios';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// components
import FileResult from './FileResult';


export default function Search() {
    const [ searchQuery, setSearchQuery ] = React.useState<string>('')
    const [ searchResults, setSearchResults ] = React.useState<IFile[]>([])
    const [ isOnlyUserFiles, setIsOnlyUserFiles ] = React.useState<boolean>(false)


    const onChangehandler = (e: React.ChangeEvent) => {
        const newQuery = (e.target as HTMLInputElement).value
        setSearchQuery(newQuery)
    }


    React.useEffect(() => {
        if (!searchQuery) return setSearchResults([])

        axios('/api/search/files', {
            params: {
                query: searchQuery,
                isOnlyUserFiles: isOnlyUserFiles
            }
        })
        .then(response => {
            console.log(response)
            setSearchResults(response.data)
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
                { searchResults.map(resultFile => (
                    <FileResult file={resultFile} key={`search-file-${resultFile.id}`} />
                ))}
            </ul>
        </div>
    )
}