import React from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';

export const Sidebar = () => {
  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li>
          <span>
            <FaInbox></FaInbox>
          </span>
          <span>Inbox</span>
        </li>
        <li>
          <span>
            <FaRegCalendar></FaRegCalendar>
          </span>
          <span>Today</span>
        </li>
        <li>
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
