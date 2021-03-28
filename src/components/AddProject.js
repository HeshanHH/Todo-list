import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers/index';
import { useProjectsValue } from '../context';

// set shouldShow to default as false
export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState(''); //  new project

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue(); // when we add project we have to update our context

  // if there is project we add it to the firebase.
  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      })
      .then(() => {
        // after add..
        setProjects([...projects]);
        setProjectName(''); // set back to empty.
        setShow(false);
      });

  return (
    <div className="add-project" data-testid="add-project">
      {/* if Show */}
      {show && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            // when changing this set projectname.
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Add Project
          </button>
          <span
            aria-label="Cancel adding project"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShow(false);
            }}
            role="button"
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        aria-label="Add Project"
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShow(!show);
        }}
        role="button"
        tabIndex={0}
      >
        Add Project
      </span>
    </div>
  );
};

// AddProject.propTypes = {
//   shouldShow: PropTypes.bool,
// };
