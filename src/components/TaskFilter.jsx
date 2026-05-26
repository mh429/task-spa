export const TaskFilter = ({falseCounter,trueCounter,statusFilter,onSetFilter}) => {
  return (
    <div className="filterWrapper">
      <div 
      className={statusFilter ? "filterBtnFalse" : "filterBtnFalse selected"}   
      onClick={() => onSetFilter(false)}
      >
        <p>未完了 {falseCounter}件</p>
      </div>
      <div 
      className={statusFilter ? "filterBtnTrue selected" : "filterBtnTrue"}   
      onClick={() => onSetFilter(true)}
      >
        <p>完了 {trueCounter}件</p>
      </div>    
    </div>
  )
}