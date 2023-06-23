import React, { useState } from "react";

export default function Title({
  title,
  handleTitleClick,
  deleteTitle,
  cookies,
  item,
}) {
  const [showDelete, setShowDelete] = useState(false);
  const titleIndex = item.keywords.titles.findIndex((t) => t === title);
  // const url = titleIndex >= 0 ? item.keywords.urls[titleIndex] : undefined;

  return (
    <div className="flex">
      {/* <div className="hover:bg-gray-500 hover:text-gray-900"> */}
      <div className="px-1"></div>
      <div className="flex">
        <button
          className="mt-1 font-medium  text-lg  hover:bg-red-100 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg p-3 py-0.5 "
          onClick={() => handleTitleClick(title)}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          {title}
          {showDelete && (
            <div
              onClick={() => {
                const titleIndex = item.keywords.titles.findIndex(
                  (t) => t === title
                );
                const url = item.keywords.urls[titleIndex];
                deleteTitle(title, cookies.accessToken, item.date, url);
              }}
              className="ml-2 "
            >
              x
            </div>
          )}
        </button>
        <div></div>
      </div>
    </div>
  );
}
