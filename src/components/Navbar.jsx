import React, { useState } from "react";
import "./MovieApp.css";

const Navbar = ({ onSearch, onTabClick, goHome, goCategories }) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home"); // default active tab

  const handleSearch = () => {
    if (query) onSearch(query);
  };

 const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "home") goHome();
    else if (tab === "categories") goCategories(); // important
    else onTabClick(tab);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title" onClick={() => handleTabClick("home")} style={{ cursor: "pointer" }}>
        Cinema
      </h1>

      <div className="navbar-tabs">
        <button
  className={activeTab === "home" ? "tab active" : "tab"}
  onClick={() => {
    setActiveTab("home");
    goHome(); // load popular movies
  }}
>
  Home
</button>
       <button
  className={activeTab === "categories" ? "tab active" : "tab"}
  onClick={() => {
    setActiveTab("categories");
    goCategories(); // THIS is crucial
  }}
>
  Categories
</button>
        <button
          className={activeTab === "popular" ? "tab active" : "tab"}
          onClick={() => handleTabClick("popular")}
        >
          Popular
        </button>
        <button
          className={activeTab === "top_rated" ? "tab active" : "tab"}
          onClick={() => handleTabClick("top_rated")}
        >
          Top Rated
        </button>
        <button
          className={activeTab === "upcoming" ? "tab active" : "tab"}
          onClick={() => handleTabClick("upcoming")}
        >
          Upcoming
        </button>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
