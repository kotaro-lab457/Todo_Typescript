import React from 'react'

// interfaceは、新しい型を定義する時に使う
type ListProps = {
    list: { content: string, id: number, completed: boolean,editing:boolean }
    deleteTodo: (id: number) => void
    completedChange: (id: number, completed: boolean) => void
    editingChange: (id: number, editing: boolean) => void
}
const List: React.FC<ListProps> = props => {
    //const [isDone, setIsDone] = useState(false)

    // 削除機能
    const handleDelete = () => {
        props.deleteTodo(props.list.id)
    }

    // completedChangeで個々のidの completedを更新する（true or false）
    const handleDone = () => {
        props.completedChange(props.list.id, !props.list.completed)
    }
    console.log(props.list)

    // 編集コンポーネントに切り替え
    const editingClick = () => {
        props.editingChange(props.list.id, !props.list.editing)
    }

    return (
        <div>
            <input
                checked={props.list.completed}
                onChange={handleDone}
                type='checkbox'
            />
            <span
                style={{ textDecoration: props.list.completed ? 'line-through' : 'none' }}
            >{props.list.content}</span>
            <button onClick={handleDelete}>削除</button>
            <button onClick={editingClick}>編集</button>
        </div>
    )
}

export default List