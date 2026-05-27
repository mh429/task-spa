import { TaskItem } from "./TaskItem"

export const TaskList = ({tasks, statusFilter, ...handlers}) => {
  // 完了・未完了でフィルターする
  const filteredTasks = tasks.filter(task => {
    if (statusFilter) return task.status;
    if (!statusFilter) return !task.status;
  });

  return (

      <ul>
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            {...handlers}
          />
        ))}
      </ul>      

  )
}