import React,{useState} from 'react'

type EditingProps = {
    list: {id:number,content:string,editing:boolean}
    editingChange: (id:number,editing:boolean) => void
    textUpdate: (id:number,content:string) => void
}

const Editing: React.FC<EditingProps> = props => {
    const [value,setValue] = useState(props.list.content)
    // キャンセル機能
    const editingCancel = () => {
        props.editingChange(props.list.id,!props.list.editing)
    }
    
    // contentの文字列を更新
    const editingChange = () => {
        if(!value) return
        props.textUpdate(props.list.id,value)
    }

    return (
        <div>
            <input
                type='text'
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button onClick={editingChange}>更新</button>
            <button onClick={editingCancel}>キャンセル</button>
        </div>
    )
}

export default Editing