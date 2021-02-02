import React from 'react'

// interfaceは、新しい型を定義する時に使う
type ListProps = {
    list: { content: string, id: number }
    deleteTodo: (id: number) => void
}
const List: React.FC<ListProps> = props => {
    
    // 削除機能
    const handleDelete = () => {
        props.deleteTodo(props.list.id)
    }
    return (
        <div>
            <input type='checkbox' />
            <span>{props.list.content}</span>
            <button onClick={handleDelete}>削除</button>
            <button>編集</button>
        </div>
    )
}

export default List