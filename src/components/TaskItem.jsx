import { useState,useRef } from "react";

export const TaskItem = ({task,editingId,onEditStart,onUpdate,onToggle,onDelete}) => {
  // 編集内容
  const[editTitle, setEditTitle] = useState(task.title);
  const[editCaption, setEditCaption] = useState(task.caption);
  const[editLimit, setEditLimit] = useState(task.limit);

  // input要素を参照するためのref
  const editTitleRef = useRef(null);

  // 編集モード
  if(editingId === task.id){
    return (
      <li>
        <p>
          タイトル（必須）：
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            placeholder="タイトルを入力"
            ref={editTitleRef}
          />  
        </p>
        <p>
          説明：
          <textarea
            value={editCaption}
            onChange={e => setEditCaption(e.target.value)}
            placeholder="説明を入力"
          ></textarea>
        </p>
        <p>
          期限：
          <input
            type="date"
            value={editLimit}
            onChange={e => setEditLimit(e.target.value)}
          />
        </p>
        <button onClick={() => onUpdate(task.id, editTitle, editCaption, editLimit, editTitleRef)}>保存</button>
      </li>
    );
  }

  // 通常表示
  return (
    <li>
      <p>タイトル：{task.title}</p>
      {task.caption && <p>説明：{task.caption}</p>}
      {task.limit && <p>期限：{task.limit}</p>}

      {/* <p>ステータス：{task.status ? "完了" : "未完了"}</p> */}
      <button onClick={() => onToggle(task.id)}>{task.status ? "未完了に戻す" : "完了"}</button>
      <button onClick={() => onEditStart(task.id)}>編集</button>
      <button onClick={() => onDelete(task.id)}>削除</button>
    </li>
  )
}