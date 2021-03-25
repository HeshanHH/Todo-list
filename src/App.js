import './App.css';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

export const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Sidebar />
    </div>
  );
};
