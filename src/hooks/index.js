import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers/index';

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', '123');

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
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
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // to use .where('userId', '==', '123') .orderBy('projectId') we have to add indexes in firebase
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

//debugger;
// export const useTasks = (selectedProject) => {
//   const [tasks, setTasks] = useState([]);
//   const [archivedTasks, setArchivedTasks] = useState([]);

//   useEffect(() => {
//     // go get the task that userId is equals to 123.
//     let unsubcribe = firebase
//       .firestore()
//       .collection('task')
//       .where('userId', '==', '123');

//     console.log(unsubcribe);
//     //  ? if/then : else
//     // we have to call the project once only

//     // collectedTasksExist(selectedProject) pass projects and match them for the result
//     unsubcribe =
//       selectedProject && !collectedTasksExist(selectedProject)
//         ? (unsubcribe = unsubcribe.where('projectId', '==', selectedProject))
//         : selectedProject === 'TODAY'
//         ? (unsubcribe = unsubcribe.where(
//             'date',
//             '==',
//             moment.format('DD/MM/YYYY')
//           ))
//         : selectedProject === 'INBOX' || selectedProject === 0
//         ? (unsubcribe = unsubcribe.where('date', '==', ''))
//         : unsubcribe;

//     unsubcribe = unsubcribe.onSnapshot((snapshot) => {
//       const newTasks = snapshot.docs.map((task) => ({
//         id: task.id,
//         ...task.data(),
//       }));
//       setTasks(
//         selectedProject === 'NEXT_7'
//           ? newTasks.filter(
//               (task) =>
//                 moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
//                 task.archived !== true
//             )
//           : newTasks.filter((task) => task.archived !== true)
//       );

//       // give me all the archived tasks.
//       setArchivedTasks(newTasks.filter((task) => task.archived !== false));
//     });

//     return () => unsubcribe();
//   }, [selectedProject]);

//   return tasks, archivedTasks;
// };
