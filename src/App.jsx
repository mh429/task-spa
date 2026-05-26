import { useState, useEffect } from 'react'
import { TaskList } from './components/TaskList';
import { TaskInput } from './components/TaskInput';
import { TaskFilter } from './components/TaskFilter';
import './App.css'

const STORAGE_KEY = "tasksLocal"

function App() {
  // タスク一覧
  const [tasks, setTasks] = useState(() => {
    // 初回レンダリング時にローカルストレージから取得
    const tasksLocal = localStorage.getItem(STORAGE_KEY);
    return tasksLocal ? JSON.parse(tasksLocal) : [];
  });

  // tasksに変更があるたび、ローカルストレージを更新
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);  

  // 完了・未完了のカウンター（trueが完了、falseが未完了）
  const trueCounter = tasks.filter(task => task.status === true).length;
  const falseCounter = tasks.filter(task => task.status === false).length;

  // 完了・未完了のフィルター
  const [statusFilter, setStatusFilter] = useState(false)

  // 編集中のタスクID
  const [editingId, setEditingId] = useState(null);

  // タスク追加関数
  const addTask = (title, caption, limit) => {
    setTasks([
      ...tasks,
      {id:Date.now(), title, caption, limit, status: false}
    ]);
  };

  // タスク編集関数
  const updateTask = (id, newTitle, newCaption, newLimit, editTitleRef) => {
    // タイトルが空ならリターン
    if(!newTitle.trim()) {
      editTitleRef.current.focus();
      return;
    }

    // タスク一覧から該当のタスクを探し、書き換える
    setTasks(tasks.map(task => task.id === id ? {...task, title: newTitle, caption:newCaption, limit: newLimit} : task));
    // 編集中のタスクIDを空にする
    setEditingId(null);
  };

  // 完了の切替え関数
  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? {...task, status: !task.status} : task));
  };

  // 削除関数
  const deleteTask = (id) => {
    // filterで該当のタスクが含まれないタスク一覧を作り直す
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <main>
      <section className='titleSection'>
        <h1>タスク管理SPA</h1>
      </section>

      <section className='addSection'>
        <TaskInput onAdd={addTask} />        
      </section>

      <section className='taskSection'>
        <TaskFilter 
        falseCounter={falseCounter}
        trueCounter={trueCounter}
        statusFilter={statusFilter}  
        onSetFilter={setStatusFilter}        
        />
        <TaskList
        tasks={tasks}
        editingId={editingId}
        statusFilter={statusFilter}        
        onEditStart={setEditingId}
        onUpdate={updateTask}
        onToggle={toggleTask}
        onDelete={deleteTask}
        />
      </section>
    </main>
  )
}

export default App;

