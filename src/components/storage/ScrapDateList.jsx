import React from "react";
import Keyword from "./Keyword";
import Title from "./Title";

const ScrapDateList = ({
  item,
  index,
  scrapData,
  handleToggleDateClick,
  handleTitleClick,
  cookies,
  deleteTitle,
}) => {
  return (
    <div key={index}>
      {(index === 0 || item.date !== scrapData[index - 1].date) && (
        <div className="flex">
          <div
            className="font-bold hover:bg-red-100 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg text-2xl px-3 py-1.5 "
            onClick={() => handleToggleDateClick(item.date)}
          >
            {item.date}
            {/* {showDateDelete && (
              <button
                className="pl-2 items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  // 삭제 로직 수행 (서버 요청 및 상태 업데이트)
                }}
              >
                x
                
              </button>
            )} */}
          </div>
          <div></div>
        </div>
      )}
      <Keyword keyword={item.keywords.keyword} item={item} />
      {item.keywords.titles.map((title, titleIndex) => (
        <div key={`title-${index}-${titleIndex}`}>
          <Title
            title={title}
            handleTitleClick={handleTitleClick}
            cookies={cookies}
            item={item}
            deleteTitle={deleteTitle}
          />
        </div>
      ))}
    </div>
  );
};

export default ScrapDateList;
