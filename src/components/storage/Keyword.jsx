import React from "react";

export default function Keyword({
  keyword,
  handleToggleKeywordClick,
  deleteKeyword,
  cookies,
  item,
}) {
  return (
    <div>
      <button
        className="mt-2 font-semibold px-4 py-2 text-2xl hover:bg-gray-100 hover:text-gray-900"
        onClick={() => handleToggleKeywordClick(keyword)}
      >
        검색어: {keyword}

      </button>
      <button
        className="ml-2"
        onClick={() => {
          deleteKeyword(keyword, cookies.accessToken, item.date);
        }}
      >
        x
      </button>
    </div>
  );
}
