import React, { useState, useEffect, useRef } from 'react'
import './css/Select.css'

const Select = (props) => {

    const { defaultSelect, options = [], onSelect } = props

    const [isOpenSelect, setIsOpenSelect] = useState(false)
    const [selectedOption, setSelectedOption] = useState(defaultSelect || '')

    const selectRef = useRef(null);

    const isOpenAndCloseSelect = (e) => {
        setIsOpenSelect(e)
    }

    const captureValue = (e) => {
        setSelectedOption(e?.label)
        if (onSelect) {
            onSelect(e)
        }
        isOpenAndCloseSelect(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpenSelect(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className='select-parent-container'>
            <div className='select-inner-parent-container' onClick={() => isOpenAndCloseSelect(!isOpenSelect)}>
                <p key={selectedOption} className='select-input-field'>{selectedOption}</p>
            </div>
            {isOpenSelect && <div className='select-option-container'>
                {!options || options?.length == 0 && <p className='select-no-options-message'>No Options !</p>}
                {options && options?.length > 0 && options?.map((option, index) => {
                    return (
                        <p key={index} className='select-option-text' onClick={() => captureValue(option)}>{option?.label}</p>
                    )
                })}
            </div>}
        </div>
    )
}

export default React.memo(Select)