import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Общие классы для всех ссылок
  const baseClasses = "text-[20px] rounded h-[54px] w-[248px] hover:bg-white hover:text-black flex items-center px-4";

  return (
    <div className='fixed left-5 top-21'>
      <ul className='flex flex-col gap-[10px]'>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-[#fc6736] text-white" : "bg-transparent text-black"}`
          }
        >
          Asosiy
        </NavLink>

        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-[#fc6736] text-white" : "bg-transparent text-black"}`
          }
        >
          Kurslarim
        </NavLink>

        <NavLink
          to="/marsCode"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-[#fc6736] text-white" : "bg-transparent text-black"}`
          }
        >
          MarsCode
        </NavLink>

        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-[#fc6736] text-white" : "bg-transparent text-black"}`
          }
        >
          Blog
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-[#fc6736] text-white" : "bg-transparent text-black"}`
          }
        >
          Space Shop
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
