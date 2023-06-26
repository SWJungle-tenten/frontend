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
    <div key={index} className="border-b pb-5">
      {(index === 0 || item.date !== scrapData[index - 1].date) && (
        <div className="flex pt-3">
          <button
            className="font-bold hover:bg-red-100 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg text-xl px-3 py-1"
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
          </button>
        </div>
      )}
      <div className="ml-2">
        <Keyword keyword={item.keywords.keyword} item={item} />
      <div className="flex flex-row">
        <div className="w-10"></div>
        <div className="w-[100%]">
          {item.keywords.titles.map((title, titleIndex) => (
            <Title
              key={`title-${index}-${titleIndex}`}
              title={title}
              handleTitleClick={handleTitleClick}
              cookies={cookies}
              item={item}
              deleteTitle={deleteTitle}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapDateList;
