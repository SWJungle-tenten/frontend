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
  const url = titleIndex >= 0 ? item.keywords.urls[titleIndex] : undefined;

  return (
    <div
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <button
        className="mt-1 font-medium px-4 text-lg hover:bg-gray-100 hover:text-gray-900"
        onClick={() => handleTitleClick(title)}
      >
        {title}
      </button>
      {showDelete && (
        <button
          onClick={() => {
            const titleIndex = item.keywords.titles.findIndex(
              (t) => t === title
            );
            const url = item.keywords.urls[titleIndex];
            deleteTitle(title, cookies.accessToken, item.date, url);
          }}
          className="ml-2"
        >
          x
        </button>
      )}
    </div>
  );
}
