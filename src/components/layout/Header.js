import React from 'react';
import { FaPizzaSlice } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todolist"></img>
        </div>
        <div className="settings">
          <ul>
            <li data-testid="quick-add-task-actions" className="settings__add">
              +
            </li>
            <li data-testid="dark-mode-action" className="settings__dark">
              <FaPizzaSlice />
            </li>
            <li></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
