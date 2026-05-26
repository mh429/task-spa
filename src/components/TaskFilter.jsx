export const TaskFilter = ({falseCounter,trueCounter,onSetFilter}) => {
  return (
    <>
    <div onClick={() => onSetFilter(false)}>
      <p>未完了：{falseCounter}件</p>
    </div>
    <div onClick={() => onSetFilter(true)}>
      <p>完了：{trueCounter}件</p>
    </div>    
    </>
  )
}