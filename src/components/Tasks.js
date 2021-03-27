import React from 'react';
import { Checkbox } from '../components/Checkbox';
import { useTasks } from '../hooks/index';

export const Tasks = () => {
  const { tasks } = useTasks('1');
  let projectName = '';
  debugger;
  console.log(tasks);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={`${task.id}`}></Checkbox>
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
