import { useState, useEffect } from 'react-icons';
import moment from 'moment';
import { firebase } from '../firebase';
import { collectedTasksExist } from '../helpers/index';

export const useTask = (selectedProject) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // go get the task that userId is equals to 123
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
  }, []);
};
