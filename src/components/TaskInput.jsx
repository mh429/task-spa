import { useRef, useState } from "react";

export const TaskInput = ({onAdd}) => {
  // 登録内容
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [limit, setLimit] = useState("");

  // input要素を参照するためのref
  const titleRef = useRef(null);

  const handleAdd = () => {
    // タイトルが空ならリターン
    if(!title.trim()) {
      // alert("タイトルは必須です")
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
      {/* <h2>ADD TASK</h2> */}
      <table>
        <tr>
          <th>タイトル（必須）：</th>
          <td>
            <input
              className="titleInput"
              ref={titleRef}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="タイトルを入力"
            />        
          </td>
        </tr>
        <tr>
          <th>説明：</th>
          <td>
            <textarea
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="説明を入力"
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
        <button onClick={handleAdd}>登録</button>        
      </div>
    </div>
  )
}

