import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import './App.css';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context/index';

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main
          data-testid="application"
          className={darkMode ? 'darkmode' : undefined}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode}></Header>
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};

//
