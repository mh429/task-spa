import { TaskItem } from "./TaskItem"

export const TaskList = ({tasks, ...handlers}) => {
    return (
      <ul>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            {...handlers}
          />
        ))}
      </ul>
    )
}