import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProjectDashboard from './ProjectDashboard';
import BlogManager from './Blog';
import SkillManager from './Skill';
import User from './User';

const Dashboard = () => {
  const { email, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

  const renderContent = () => {
    switch (activeSection) {
      case 'projects':
        return <ProjectDashboard />;
      case 'blogs':
        return <BlogManager />;
      case 'skill':
        return <SkillManager />;
      case 'user':
        return <User />;
      default:
        return <User />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform sm:translate-x-0 sm:static sm:w-64`}
      >
        <div className="sidebar-header p-4">
          <h1 className="text-xl font-bold">CMS Dashboard</h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li
              className={`p-4 cursor-pointer hover:bg-gray-700 ${
                activeSection === 'user' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActiveSection('user')}
            >
              User
            </li>
            <li
              className={`p-4 cursor-pointer hover:bg-gray-700 ${
                activeSection === 'projects' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActiveSection('projects')}
            >
              Projects
            </li>
            <li
              className={`p-4 cursor-pointer hover:bg-gray-700 ${
                activeSection === 'blogs' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActiveSection('blogs')}
            >
              Blogs
            </li>
            <li
              className={`p-4 cursor-pointer hover:bg-gray-700 ${
                activeSection === 'skill' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActiveSection('skill')}
            >
              Skill
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
        {/* Top Bar */}
        <header className="top-bar bg-white shadow-md p-4 flex justify-between items-center sm:px-6">
          <div className="flex items-center">
            {/* Sidebar toggle button */}
            <button
              className="sm:hidden text-gray-700 focus:outline-none mr-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <h2 className="text-lg font-bold">Dashboard</h2>
          </div>
          <div className="flex items-center">
            <span className="mr-4 hidden sm:block">Hello, {email}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
