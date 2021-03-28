import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import { useSelectedProjectsValue } from '../../context';

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectsValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);
  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li data-testid="inbox" className="inbox">
          <span>
            <FaInbox></FaInbox>
          </span>
          <span>Inbox</span>
        </li>
        <li data-testid="today" className="today">
          <span>
            <FaRegCalendar></FaRegCalendar>
          </span>
          <span>Today</span>
        </li>
        <li data-testid="next_7" className="next_7">
          <span>
            <FaRegCalendarAlt></FaRegCalendarAlt>
          </span>
          <span>Next 7 Days</span>
        </li>
      </ul>
      <div className="sidebar__middle">
        <span>
          <FaChevronDown></FaChevronDown>
          <h2>Projects</h2>
        </span>
      </div>
      <ul className="sidebar__projects"> Projects Will Be Here!!</ul>
      add project component here
    </div>
  );
};
