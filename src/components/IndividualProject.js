import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { firebase } from '../firebase'; // DELETE PROJECT

// bring in the project
export const IndividualProject = ({ project }) => {
  //  we can add confirmation when we delete the project.
  const [showConfirm, setShowConfirm] = useState(false);
  // get the projects from prject values.
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  // DELETE project from firebase.
  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        // after deleteing we can reset projects
        // cuurent project already having there. we have to refresh the projects
        // we are not grabbing the projects until setProjects get fired.
        // ./hooks/index.js
        setProjects([...projects]);
        // set selected project equls to INBOX
        setSelectedProject('INBOX');
      });
  };

  return (
    <>
      {/* setting sidebar projects */}
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        // we dont need to fire the function imidiatly and we want to show confirm message.
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowConfirm(!showConfirm);
        }}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of project"
      >
        <FaTrashAlt />
        {/* if showConfirm then load project delete modal */}
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowConfirm(!showConfirm);
                }}
                tabIndex={0}
                role="button"
                aria-label="Cancel adding project, do not delete"
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};
