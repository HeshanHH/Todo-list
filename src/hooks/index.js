import { useState, useEffect } from 'react-icons';
import moment from 'moment';
import { firebase } from '../firebase';
import { collectedTasksExist } from '../helpers/index';

export const useTask = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    // go get the task that userId is equals to 123.
    let unsubcribe = firebase
      .firestore()
      .collection('task')
      .where('userId', '==', '123');

    //  ? if/then : else
    // we have to call the project once only

    // collectedTasksExist(selectedProject) pass projects and match them for the result
    unsubcribe =
      selectedProject && !collectedTasksExist(selectedProject)
        ? (unsubcribe = unsubcribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubcribe = unsubcribe.where(
            'date',
            '==',
            moment.format('DD/MM/YYYY')
          ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubcribe = unsubcribe.where('date', '==', ''))
        : unsubcribe;

    unsubcribe = unsubcribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));
      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              (task) =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );

      // give me all the archived tasks.
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubcribe();
  }, [selectedProject]);

  return tasks, archivedTasks;
};

export const useProject = () => {
  const [projects, setProjects] = useStata([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', '123')
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          // this if statement stop infinite loop eachtime we update this.
          setProjects(allProjects);
        }
      });
  }, [projects]);
  return { projects, setProjects };
};
