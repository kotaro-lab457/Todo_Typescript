import React from 'react'

type CheckProps = {
    allCompletedCheck: (completed: boolean) => void
    allCompleted: boolean
}


const CheckAll: React.FC<CheckProps> = props => {
    
    const handleAllCompleted = () => {
        props.allCompletedCheck(!props.allCompleted)
    }
    return (
        <label>
            <input
                type='checkbox'
                onChange={handleAllCompleted}
            />
            <span>
                全て{props.allCompleted}
            </span>
        </label>
    )
}

export default CheckAll