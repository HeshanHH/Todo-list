import { collectedTask } from '../constants/index';
export const collectedTasksExist = (selectedProject) => {};
collectedTasksExist.find((task) => task.key === selectedProject);
