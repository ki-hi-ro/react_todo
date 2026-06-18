import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tasks/";

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  deadline: string | null;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get<Task[]>(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div>
      <h2>タスク一覧</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>

            <p>カテゴリ: {task.category || "未設定"}</p>

            <p>
              状態:
              {task.completed ? "完了" : "未完了"}
            </p>

            <p>
              期限:
              {task.deadline || "未設定"}
            </p>
          </li>          
        ))}
      </ul>
    </div>
  );
};

export default TaskList;