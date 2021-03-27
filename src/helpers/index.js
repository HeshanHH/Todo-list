import { collectedTask } from '../constants/index';
export const collatedTasksExist = (selectedProject) => {
  collectedTask.find((task) => task.key === selectedProject);
};
