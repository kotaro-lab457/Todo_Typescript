import React, { useState } from 'react'

type AddTodoProps = {
    addTodo: (content: string) => void
}

const Form: React.FC<AddTodoProps> = props => {
    const [value, setValue] = useState('')

    const handleChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (value === '') return
        props.addTodo(value)
        setValue('')
    }

    return (
        <>
            <label>
                <form onSubmit={handleChangeSubmit}>
                    <input
                        type='text'
                        onChange={e => setValue(e.target.value)}
                        value={value}
                    />
                    <button>送信</button>
                </form>
            </label>
        </>
    )
}

export default Form