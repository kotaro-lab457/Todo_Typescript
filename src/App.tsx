import React, { useState } from 'react';
import List from './components/List'
import Form from './components/Form'
import CheckAll from './components/CheckAll'
import Filter from './components/Filter'
import Editing from './components/Editing'

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
        completed: false,
        editing: false
      }
    ])
    createId++
  }

  // filter使用の削除機能(idで区別)
  const deleteTodo = (id: number) => {
    setTodo(todo.filter(todo => todo.id !== id))
    console.log(todo)
  }

  // 各々のTODOリスト（id）がcompletedが反転したことを親コンポーネントで管理
  // 🚨レンダリングされる度に、全てレンダリングされる🚨
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

  // 各々のListコンポーネントの編集機能を作成
  const editingChange = (id: number, editing: boolean) => {
    setTodo(todo.map(todos => {
      if (todos.id === id) {
        return {
          ...todos,
          editing
        }
      }
      return todos
    }))
  }

  // content(value)を更新し、Listコンポーネントに反転（editing:false）する
  const textUpdate = (id: number, content: string) => {
    setTodo(todo.map(todos => {
      if (todos.id === id) {
        return {
          ...todos,
          content,
          editing:false
        }
      }
      return todos
    }))
  }

  // 各々のListのチェックボックスを全て反転させる
  const allCompletedCheck = (completed: boolean) => {
    setTodo(todo.map(todos => ({
      ...todos,
      completed
    })))
    //console.log(todo)
  }


  // completedがtrueの場合には、trueのみ削除
  const deleteAllCompleted = () => {
    setTodo(todo.filter(({ completed }) => !completed))
    console.log(todo)
  }

  // switch文でcompleted全体をfilterメソッドで切り替え
  // return trueで全て残され、falseで取り除かれる
  const filterTodo = todo.filter(({ completed }) => {
    switch (filter) {
      case 'all':
        return true // 全て
      case 'completed':
        return completed // 完了済
      case 'uncompleted':
        return !completed // 未完了
      default:
        return true
    }
  })

  // 切り替え機能（valueで受け渡し）
  const filterTodoCompleted = (filter: string) => {
    setFilter(filter)
    console.log(filter)
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
              {list.editing ? (
                <Editing
                  list={list}
                  key={list.id}
                  editingChange={editingChange}
                  textUpdate={textUpdate}
                />
              ) : (
                  <List
                    list={list}
                    deleteTodo={deleteTodo}
                    completedChange={completedChange}
                    editingChange={editingChange}
                    key={list.id}
                  />
                )
              }
            </li>
          )
        })}
      </ul>
      <button onClick={deleteAllCompleted}>完了済み削除</button>
    </div>
  );
}

export default App;
