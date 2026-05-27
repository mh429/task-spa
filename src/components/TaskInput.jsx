import { useRef, useState } from "react";

export const TaskInput = ({onAdd}) => {
  // 登録内容
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [limit, setLimit] = useState("");

  // input要素を参照するためのref
  const titleRef = useRef(null);

  // 登録ボタンが押された時
  const handleAdd = () => {
    // タイトルが空ならリターン
    if(!title.trim()) {
      setTitle("");
      titleRef.current.focus();
      return;
    }

    // 親コンポーネントにタスク追加を依頼
    onAdd(title,caption,limit);

    // 入力をリセット
    setTitle("");
    setCaption("");
    setLimit("");

    // 連続登録しやすいようにフォーカスを当てる
    titleRef.current.focus();
  };

  return (
    <div className="inputArea">
      <h2>ADD TASK</h2>
      <table>
        <tr>
          <th>タイトル：</th>
          <td>
            <input
              className="titleInput"
              ref={titleRef}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="タスクのタイトル（必須）"
            />        
          </td>
        </tr>
        <tr>
          <th>説明：</th>
          <td>
            <textarea
              value={caption}
              onChange={e => setCaption(e.target.value)}
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
              value={limit}
              onChange={e => setLimit(e.target.value)}
              placeholder="期日を入力"
            />            
          </td>
        </tr>
      </table>

      <div className="btnCenter">
        <button onClick={() => handleAdd()}>登録</button>        
      </div>
    </div>
  )
}

