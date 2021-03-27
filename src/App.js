import './App.css';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Content } from './components/layout/Content';

export const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Content />
    </div>
  );
};
