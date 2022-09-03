// global
import React from 'react'
import axios from 'axios';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
        .then(response => setSearchResults(response.data))
    }, [searchQuery, isOnlyUserFiles])


    return (
        <div className='search'>
            <label className='search__label' htmlFor="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </label>
            <input
                id="search"
                type="search"
                className='search__input'
                value={searchQuery}
                onChange={onChangehandler}
                placeholder="Search For Files"
            />
            <div className="search__content">
                <div className="content__tools">
                    <label
                        tabIndex={0}
                        className='tools__label'
                        htmlFor="isOnlyUserFiles"
                        onClick={() => setIsOnlyUserFiles(state => !state)}
                    >
                        <div className="label__checkbox">
                            { isOnlyUserFiles &&
                                <FontAwesomeIcon icon={faCheck} />
                            }
                        </div>
                        <h5 className='label__text'>Show Only My Files</h5>
                    </label>
                    <input className='tools__checkbox' type="checkbox" id="isOnlyUserFiles" />
                </div>
                <ul className="content__results">
                { searchResults.map(resultFile => (
                    <FileResult file={resultFile} key={`search-file-${resultFile.id}`} />
                ))}
            </ul>
            </div>
        </div>
    )
}