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
    <div>
      {showKeywords ? (
        <div>
          <button
            className="btn-toggle"
            onClick={() => handleToggleKeywordClick(keyword)}
            onMouseEnter={() => showKeywords && setShowDelete(true)}
            onMouseLeave={() => showKeywords && setShowDelete(false)}
          >
            {keyword}
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
        </div>
      ) : (
        <p className="font-normal pl-4 pt-1 text-xl ">{keyword}</p>
      )}
    </div>
  );
}
