import React from "react";
import "./sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(
        "https://blog-api-337007.wl.r.appspot.com/api/categories"
      );

      setCat(res.data);
    };
    getCats();
  }, [cat.length]);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quam vitae
          inventore accusamus a omnis quisquam mollitia voluptatem, repellat,
          sapiente alias itaque amet aut unde, maxime dicta fugiat voluptate
          molestiae!
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {cat.map((c) => (
            <Link key={c._id} to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
