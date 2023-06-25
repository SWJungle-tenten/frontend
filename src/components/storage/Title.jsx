import React, { useState } from "react";

export default function Title({
  title,
  handleTitleClick,
  deleteTitle,
  cookies,
  item,
  handleDragStart,
}) {
  const [showDelete, setShowDelete] = useState(false);
  const titleIndex = item.keywords.titles.findIndex((t) => t === title);
  // const url = titleIndex >= 0 ? item.keywords.urls[titleIndex] : undefined;

  return (
    <div className="flex py-1">
      {/* <div className="hover:bg-gray-500 hover:text-gray-900"> */}
      <div className="px-3"></div>
      <div className="flex bg-red-50 hover:bg-red-100  rounded-lg">
        <button
          className="mt-1 font-medium focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg text-lg relative p-3 py-0.5 break-keep pr-7 text-start"
          onClick={() => handleTitleClick(title)}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          // 부분 스크랩으로 넘기면 됨
          onDragStart={handleDragStart}
          draggable={true}
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
              className="absolute right-3 top-0  bg-transparent border-none focus:outline-none"
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
