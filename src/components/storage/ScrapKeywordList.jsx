import React, { useState } from "react";
import KeywordKeyword from "./KeywordKeyword";
import KeywordTitle from "./KeywordTitle";

export default function ScrapKeywordList({
  item,
  handleToggleKeywordClick,
  deleteKeyword,
  cookies,
  currentKeyword,
  handleTitleClick,
  deleteTitle,
  showKeywords,
}) {
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const handleKeywordClick = (keyword) => {
    if (selectedKeyword === keyword) {
      setSelectedKeyword(null);
    } else {
      setSelectedKeyword(keyword);
    }
    showKeywords && handleToggleKeywordClick(keyword);
  };

  // item.keyword가 존재하는지 확인
  if (!item || !item.keyword) {
    return null;
  }

  return (
    <ul>
      <li>
        <KeywordKeyword
          keyword={item.keyword}
          handleToggleKeywordClick={handleKeywordClick}
          deleteKeyword={deleteKeyword}
          cookies={cookies}
          showKeywords={showKeywords}
        />
        {showKeywords &&
          selectedKeyword === item.keyword &&
          item.dates.map((date, dateIndex) => (
            <div key={`date-${dateIndex}`}>
              {currentKeyword &&
                currentKeyword[item.keyword] &&
                date.titles.map((title, titleIndex) => (
                  <KeywordTitle
                    key={`title-${titleIndex}`}
                    title={title}
                    handleTitleClick={handleTitleClick}
                    deleteTitle={deleteTitle}
                    cookies={cookies}
                    date={date}
                    showDetails={true}
                  />
                ))}
            </div>
          ))}
      </li>
    </ul>
  );
}
