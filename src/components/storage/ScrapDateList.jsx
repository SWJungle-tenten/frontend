import React from 'react';
import Keyword from "./Keyword";
import Title from "./Title";

const ScrapDateList = ({
  item,
  index,
  scrapData,
  handleToggleDateClick,
  setShowDateDelete,
  showDateDelete,
  handleTitleClick,
  cookies,
  deleteTitle,
}) => {
  return (
    <div key={index}>
      {(index === 0 || item.date !== scrapData[index - 1].date) && (
        <div
          className="text-2xl font-bold cursor-pointer hover:bg-gray-100 hover:text-gray-900 relative"
          onClick={() => handleToggleDateClick(item.date)}
          onMouseEnter={() => setShowDateDelete(true)}
          onMouseLeave={() => setShowDateDelete(false)}
        >
          {item.date}
          {showDateDelete && (
            <button
              className="pl-6"
              onClick={(e) => {
                e.stopPropagation();
                // 삭제 로직 수행 (서버 요청 및 상태 업데이트)
              }}
            >
              X
            </button>
          )}
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
