import React, { useState } from 'react';
import List from './components/List'
import Form from './components/Form'

// TodoTextはstringとnumberの配列オブジェクト = TodoText[]で配列のオブジェクトが現せる。
import { TodoText } from './Todo.model'


let createId = 0;
// React.FC はReactのfunctionalComponentの略
const App: React.FC = () => {
  const [todo, setTodo] = useState<TodoText[]>([])

  const addTodo = (content: string) => {
    setTodo(todos => [
      ...todos,
      {
        content,
        id: createId
      }
    ])
    createId++
  }

  // filter使用の削除機能(idで区別)
  const deleteTodo = (id: number) => {
    setTodo(todo.filter(todo => todo.id !== id))
  }

  return (
    <div className="App">
      <p>Todoリスト</p>
      <Form addTodo={addTodo} />
      <p>全て完了済</p>
      <select>
        <option>全て</option>
        <option>完了済</option>
        <option>未完了</option>
      </select>
      <ul>
        {todo.map(list => {
          return (
            <li key={list.id}>
              <List
                list={list}
                deleteTodo={deleteTodo}
              />
            </li>
          )
        })}
      </ul>
      <button>完了済み削除</button>
    </div>
  );
}

export default App;
