import React, { createContext, useContext } from 'react';
import { useProject } from '../hooks/index';
// contextAPI

export const ProjectsContext = createContext();
export const ProjectsProvider = ({ children }) => {
  const { projects, setProjects } = useProject();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
export const useProjectsValue = () => useContext(ProjectsContext);
