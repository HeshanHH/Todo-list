import React from 'react';
import { firebase } from '../firebase';
export const Checkbox = ({ id }) => {
  // when you hit checkbox we can archive the task.
  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({ archived: true });
  };
  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
    >
      <span className="checkbox"></span>
    </div>
  );
};
