import React, { useState } from 'react';
import List from './components/List'
import Form from './components/Form'
import CheckAll from './components/CheckAll'
import Filter from './components/Fliter'

// TodoTextはstringとnumberの配列オブジェクト = TodoText[]で配列のオブジェクトが現せる。
import { TodoText } from './Todo.model'

let createId = 0;
// React.FC はReactのfunctionalComponentの略
const App: React.FC = () => {
  const [todo, setTodo] = useState<TodoText[]>([])
  const [filter, setFilter] = useState<string>('all')

  // todo作成
  const addTodo = (content: string) => {
    setTodo(todos => [
      ...todos,
      {
        content,
        id: createId,
        completed: false
      }
    ])
    createId++
  }

  // filter使用の削除機能(idで区別)
  const deleteTodo = (id: number) => {
    setTodo(todo.filter(todo => todo.id !== id))
  }

  const completedChange = (id: number, completed: boolean) => {
    setTodo(todo.map(todos => {
      // それぞれのID毎にcompletedの値（boolean）を分けるif文
      if (todos.id === id) {
        return {
          ...todos,
          completed
        }
      }
      // completedの値（false or trueの更新）
      return todos
    }))
  }

  // 
  const allCompletedCheck = (completed: boolean) => {
    setTodo(todo.map(todos => ({
      ...todos,
      completed
    })))
  }


  // completedがtrueの場合には、trueのみ削除
  const deleteAllCompleted = () => {
    setTodo(todo.filter(({ completed }) => !completed))
  }

  const filterTodo = todo.filter(({ completed }) => {
    switch (filter) {
      case 'all':
        return true
      case 'completed':
        return completed
      case 'uncompleted':
        return !completed
      default:
        return true
    }
  })

  const filterTodoCompleted = (filter: string) => {
    setFilter(filter)
  }

  return (
    <div className="App">
      <p>Todoリスト</p>
      <Form addTodo={addTodo} />
      <CheckAll
        allCompleted={todo.every(({ completed }) => completed)}
        allCompletedCheck={allCompletedCheck}
      />
      <Filter
        filterChange={filterTodoCompleted}
        filter={filter}
      />
      <ul>
        {filterTodo.map(list => {
          return (
            <li key={list.id}>
              <List
                list={list}
                deleteTodo={deleteTodo}
                completedChange={completedChange}
              />
            </li>
          )
        })}
      </ul>
      <button onClick={deleteAllCompleted}>完了済み削除</button>
    </div>
  );
}

export default App;
