import { useRef, useState } from "react";

export const TaskInput = ({onAdd}) => {
  // 登録内容
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [limit, setLimit] = useState("");
  const [category, setCategory] = useState(0);

  // input要素を参照するためのref
  const titleRef = useRef(null);

  const handleAdd = () => {
    if(!title.trim()) return;

    // setLimit((prev) => prev.replaceAll('-','/'));
    console.log(limit);
    console.log(typeof limit); 

    // 親コンポーネントにタスク追加を依頼
    onAdd(title,caption,limit,category);

    // 入力をリセット
    setTitle("");
    setCaption("");
    setLimit("");
    setCategory();

    // 連続登録しやすいようにフォーカスを当てる
    titleRef.current.focus();
  };

  return (
    <div>
      <p>
        タイトル（必須）：
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="タイトルを入力"
        />        
      </p>
      <p>
        説明：
        <textarea
          value={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder="説明を入力"
         />
      </p>

      <p>
        期日：
        <input
          type="date"
          value={limit}
          onChange={e => setLimit(e.target.value)}
          placeholder="期日を入力"
        />
      </p>

      <p>
        カテゴリ：
        <select onChange={(e) => setCategory(Number(e.target.value))}>
          <option value="0" selected>--なし--</option>
          <option value="1">仕事</option>
          <option value="2">生活</option>
          <option value="3">趣味</option>
        </select>        
      </p>

      <button onClick={handleAdd}>登録</button>
    </div>
  )
}

