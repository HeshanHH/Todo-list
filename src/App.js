import './App.css';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context/index';

export const App = () => {
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <div className="App">
          <Header></Header>
          <Content />
        </div>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};
