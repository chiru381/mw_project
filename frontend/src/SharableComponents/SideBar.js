import React from "react";
import "../Styles/SideBar.css";
import {
  Settings,
  Shield,
  Drafts,
  Logout,
  ArrowForwardIos,
  GridViewSharp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function SideBar() {
  function SidebarItems({ path, icon, title }) {
    return (
      <Link to={path}>
        <div className="sidebar-items">
          {icon}
          <small>{title}</small>
        </div>
      </Link>
    );
  }

  function SidebarHoverOptions({ icon, title, options }) {
    return (
      <div className="sidebar-items">
        <div>
          {icon}
          <small>{title}</small>
        </div>
        <div className="hover-options">
          {options.map((option, index) => {
            return (
              <Link key={index} to={option.path} className="option">
                <p>{option.title}</p>
                <ArrowForwardIos className="arrow-icon" sx={{ fontSize: 15 }} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div id="sidebar">
      <SidebarItems path="/" icon={<GridViewSharp sx={{ fontSize: 25 }} />} title="Dashboard" />
      <SidebarHoverOptions
        title="Settings"
        icon={<Settings sx={{ fontSize: 25 }} />}
        options={[{ title: "Change Password", path: "/change-password" }]}
      />
      <SidebarItems path="/" icon={<Shield sx={{ fontSize: 25 }} />} title="Privacy Policy" />
      <SidebarItems path="/" icon={<Drafts sx={{ fontSize: 25 }} />} title="Contact Us" />
      <SidebarItems path="/" icon={<Logout sx={{ fontSize: 25 }} />} title="Logout" />
    </div>
  );
}

export default SideBar;
