import React, { useState } from "react";

export default function Keyword({
  keyword,
  handleToggleKeywordClick,
  deleteKeyword,
  cookies,
  item,
  showKeywords,
}) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
     
    >
      {showKeywords ? (
        <div>
          <button
            className="font-semibold hover:bg-red-100 focus:ring-2 focus:outline-non focus:ring-red-300 rounded-lg text-2xl px-3 py-1.5 my-2"
            onClick={() => handleToggleKeywordClick(keyword)}
            onMouseEnter={() => showKeywords && setShowDelete(true)}
            onMouseLeave={() => showKeywords && setShowDelete(false)}
          >
            검색어: {keyword}
          {showDelete && (
            <button
              className="ml-2"
              onClick={() => {
                deleteKeyword(keyword, cookies.accessToken, item.date);
              }}
            >
              𝗑
            </button>
          )}
          </button>
          
          <div></div>
        </div>
      ) : (
        <p className="font-semibold px-4 py-2 text-2xl">
          {keyword}
        </p>
      )}
    </div>
  );
}
