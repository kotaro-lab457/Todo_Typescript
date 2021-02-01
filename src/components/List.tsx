import React from 'react'

// interfaceは、新しい型を定義する時に使う
interface ListProps  {
    list: { content: string }
}
const List: React.FC<ListProps> = props => {
    return (
        <div>
            <input type='checkbox' />
            <span>{props.list.content}</span>
            <button>削除</button>
            <button>編集</button>
        </div>
    )
}

export default List