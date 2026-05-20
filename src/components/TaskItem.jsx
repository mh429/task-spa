import { useState } from "react";

export const TaskItem = ({
  task,
  editingId,
  onEditStart,
  onUpdate,
  onToggle,
  onDelete
}) => {
  // 編集内容
  const[editTitle, setEditTitle] = useState(task.title);
  const[editCaption, setEditCaption] = useState(task.caption);
  const[editLimit, setEditLimit] = useState(task.limit);
  const[editCategory, setEditCategory] = useState(task.category);

  // 編集モード
  if(editingId === task.id){
    return (
      <li>
        <p>
          タイトル：
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
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
          期日：
          <input
            type="date"
            value={editLimit}
            onChange={e => setEditLimit(e.target.value)}
          />
        </p>
        <p>
          カテゴリー：
          <select onChange={(e) => setEditCategory(Number(e.target.value))}>
            <option value="0" selected={editCategory === 0 ? "true" : "false"}>--なし--</option>
            <option value="1" selected={editCategory === 1 ? "true" : "false"}>仕事</option>
            <option value="2" selected={editCategory === 2 ? "true" : "false"}>生活</option>
            <option value="3" selected={editCategory === 3 ? "true" : "false"}>趣味</option>
          </select>
        </p>
        <button onClick={() => onUpdate(task.id, editTitle, editCaption, editLimit, editCategory)}>保存</button>
      </li>
    );
  }

  // 通常表示
  return (
    <li>
      <p>タイトル：{task.title}</p>
      <p>説明：{task.caption}</p>
      <p>期限：{task.limit}</p>
      <p>カテゴリ：{task.category}</p>
      <p>ステータス：{task.status ? "完了" : "未完了"}</p>
      <p></p>
      <button onClick={() => onToggle(task.id)}>{task.status ? "未完了に戻す" : "完了"}</button>
      <button onClick={() => onEditStart(task.id)}>編集</button>
      <button onClick={() => onDelete(task.id)}>削除</button>
    </li>
  )
}