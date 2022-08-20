// global
import React from 'react'


interface Props {
    state: InputStateType,
    setState: (newState: string) => void,
    className?: string,
    placeholder?: string,
    topText?: string,
    type?: React.HTMLInputTypeAttribute
}

const TopTextInput = ({ state, setState, topText='', placeholder='', className='', type='text' }: Props) => {
    return (
        <div className={`top-text-input${` ${className}`}`}>
            <h3 className="top-text-input__text">{topText}</h3>
            <input
                className="top-text-input__input"
                type={type}
                value={state}
                placeholder={placeholder}
                onChange={(e: React.ChangeEvent) => setState((e.target as HTMLInputElement).value)}
            />
        </div>
    )
}

export default TopTextInput