// global
import React from 'react'
// layouts
import WindowLayout from '../Layouts/WindowLayout';


interface Props {
    name: string,
    setName: (name: string) => void,
    changeNameConfirm: (e: React.MouseEvent) => void,
    cancel: (e: React.MouseEvent) => void
    placeholder?: string,

}

export const RenameWindow =({ name, setName, changeNameConfirm, cancel, placeholder=''}: Props) => {
    return (
        <WindowLayout>
            <div className="rename-window">
                <input value={name} placeholder={placeholder} className='rename-window__input' type="text" onChange={e => setName(e.target.value)} />
                <div className="rename-window__btns">
                    <button className="btns__btn change-btn" onClick={changeNameConfirm}>Change</button>
                    <button className="btns__btn cancel-btn" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </WindowLayout>
    )
}