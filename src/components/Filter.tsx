import React from 'react'

type FilterProps = {
    filterChange: (filter: string) => void
    filter: string
}

const Filter: React.FC<FilterProps> = props => {

    return (
        <>
            <select
                value={props.filter}
                onChange={e => props.filterChange(e.target.value)}
            >
                <option value='all'>全て</option>
                <option value='completed'>完了済</option>
                <option value='uncompleted'>未完了</option>
            </select>
        </>
    )
}

export default Filter