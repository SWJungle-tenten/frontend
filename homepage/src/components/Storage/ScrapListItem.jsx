import React from "react";
import Keyword from "./Keyword";
import Title from "./Title";
export default function ScrapListItem({
  item,
  handleToggleKeywordClick,
  deleteKeyword,
  cookies,
  currentKeyword,
  handleTitleClick,
  deleteTitle,
}) {
  return (
    <ul>
      <li>
        <Keyword
          keyword={item.keywords.keyword}
          handleToggleKeywordClick={handleToggleKeywordClick}
          deleteKeyword={deleteKeyword}
          cookies={cookies}
          item={item}
        />
        {currentKeyword === item.keywords.keyword &&
          item.keywords.titles.map((title, titleIndex) => (
            <div key={`title-${titleIndex}`}>
              <Title
                title={title}
                handleTitleClick={handleTitleClick}
                deleteTitle={deleteTitle}
                cookies={cookies}
                item={item}
              />
            </div>
          ))}
      </li>
    </ul>
  );
}
