import React, { TextareaHTMLAttributes } from 'react'

import './styles.css'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { 
    label: string;
    name: string;
}

const TextArea: React.FC<TextAreaProps> = ({label, name, ...others}) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...others} />
        </div>
    )
}

export default TextArea