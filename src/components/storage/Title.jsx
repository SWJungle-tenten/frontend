import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function Title({ title, handleTitleClick, deleteTitle, cookies, item }) {
  const [showDelete, setShowDelete] = useState(false);
  const titleIndex = item.keywords.titles.findIndex((t) => t === title);
  // const url = titleIndex >= 0 ? item.keywords.urls[titleIndex] : undefined;

  return (
    <div className="flex py-1 ml-2">
      {/* <div className="hover:bg-gray-500 hover:text-gray-900"> */}
      <div className="flex flex-row bg-red-50 hover:bg-red-100 rounded-lg w-full">
        <button
          className="btn-title"
          onClick={() => handleTitleClick(title)}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          {title}
        </button>
        {showDelete && (
          <div
            onClick={() => {
              const titleIndex = item.keywords.titles.findIndex((t) => t === title);
              const url = item.keywords.urls[titleIndex];
              deleteTitle(title, cookies.accessToken, item.date, url);
            }}
            className=" top-0 bg-transparent border-none focus:outline-none"
          >
            <DeleteOutlineOutlinedIcon className="mt-1 mr-2 text-red-400" />
          </div>
        )}
      </div>
    </div>
  );
}
