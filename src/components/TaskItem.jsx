import { useState,useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

export const TaskItem = ({task,editingId,onEditStart,onUpdate,onToggle,onDelete,statusFilter}) => {
  // 編集内容
  const[editTitle, setEditTitle] = useState(task.title);
  const[editCaption, setEditCaption] = useState(task.caption);
  const[editLimit, setEditLimit] = useState(task.limit);

  // 削除確認
  const[deleteConfirm, setDeleteConfirm] = useState(false);

  // input要素を参照するためのref
  const editTitleRef = useRef(null);

  // 保存ボタンが押された時
  const handleUpdate = () => {
    // タイトルが空ならリターン
    if(!editTitle.trim()) {
      setEditTitle("");
      editTitleRef.current.focus();
      return;
    }

    // 親コンポーネントにタスク更新を依頼
    onUpdate(task.id, editTitle, editCaption, editLimit);
  };


  // 編集モード
  if(editingId === task.id){
    return (
      <li className={statusFilter && "taskDone"}>
        <table>
          <tr>
            <th>タイトル：</th>
            <td>
              <input
                className="titleInput"
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                placeholder="タスクのタイトル（必須）"
                ref={editTitleRef}
              /> 
            </td>
          </tr>
          <tr>
            <th>説明：</th>
            <td>
              <textarea
              value={editCaption}
              onChange={e => setEditCaption(e.target.value)}
              placeholder="タスクの説明"
              />
            </td>
          </tr>
          <tr>
            <th>期限：</th>
            <td>
              <input
              className="limitInput"
              type="date"
              value={editLimit}
              onChange={e => setEditLimit(e.target.value)}
              />
            </td>
          </tr>
        </table>

        <div className="btnCenter">
          <button onClick={() => handleUpdate()}>保存</button>          
        </div>
      </li>
    );
  }

  // 通常表示
  return (
    <li className={statusFilter && "taskDone"}>
      {/* タスク情報 */}
      <div className="upperWrapper">
        <p className="title">{task.title}</p>  
        <div className="editDelete">
          <div onClick={() => onEditStart(task.id)}><FaPencilAlt /></div>
          <div onClick={() => setDeleteConfirm(true)}><FaRegTrashAlt /></div>
        </div>
      </div>
      
      {task.caption && <p className="caption">{task.caption}</p>}
      
      <div className="bottomWrapper">
        {task.limit ? 
        <p className={statusFilter ? "limit limitDone" : "limit"}>期限：{task.limit}</p> 
        : <p></p>}
        <button onClick={() => onToggle(task.id)}>{task.status ? "未完了に戻す" : "完了"}</button>
      </div>

      {/* 削除確認 */}
      {deleteConfirm && (
        <div className="deleteConfirm">
          <p className="confirmText">タスクを削除しますか？</p>
          <div className="confirmBtns">
            <button className="yesBtn" onClick={() => onDelete(task.id)}>はい</button>
            <button onClick={() => setDeleteConfirm(false)}>いいえ</button>            
          </div>
        </div>
      )}    
    </li>
  )
}