import React from "react";

const KeywordDetail = ({
  title,
  userScrapData,
  handleDragStart,
}) => {
  const keywordData = getKeywordData(title, userScrapData);
  return (
    <div className="p-8 overflow-auto">
      <p className="px-4 py-2 pt-2 pb-5 border-b-2 border-slate-400 mb-5 text-center text-4xl font-bold">
        {title}
      </p>
      {keywordData.url && (
        <div>
          <iframe
            title={`iframe-${title}`}
            src={keywordData.url}
            className="iframe"
          ></iframe>
        </div>
      )}
      {keywordData.texts.map((text, textIndex) => (
        <div
          className="tooltip px-1"
          data-tip="드래그해서 텍스트를 메모에 추가해보세요"
          key={textIndex}
        >
          <div
            className="cursor-grab hover:brightness-50 active:cursor-grabbing text-lg mb-5 text-left border border-slate-300 border-dashed rounded-lg p-2"
            draggable={true}
            onDragStart={handleDragStart}
            key={`text-${textIndex}`}
          >
            {text}
          </div>
        </div>
      ))}
      <div className="flex flex-row flex-wrap w-full gap-[19px] pb-14">
        {keywordData.imgs.map((img, imgIndex) => (
          <div
            className="tooltip"
            data-tip="드래그해서 이미지를 메모에 추가해보세요"
            key={`img-${imgIndex}`}
          >
            <img
              className="cursor-grab border rounded-lg hover:brightness-50 active:cursor-grabbing"
              onDragStart={handleDragStart}
              src={img}
              crossOrigin="anonymous"
              alt={`Related-${imgIndex}`}
              key={`img-${imgIndex}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordDetail;

function getKeywordData(title, userScrapData) {
  let keywordData = {
    texts: [],
    imgs: [],
    url: "",
  };

  for (const item of userScrapData) {
    if (item.dates && Array.isArray(item.dates)) {
      for (const date of item.dates) {
        if (date.titles && Array.isArray(date.titles)) {
          const titleIndex = date.titles.findIndex(
            (itemTitle) => itemTitle === title
          );
          if (titleIndex !== -1) {
            keywordData.texts.push(...date.texts[titleIndex]);
            keywordData.imgs.push(...date.img[titleIndex]);
            keywordData.url = date.urls[titleIndex];
            break;
          }
        }
      }
    }
  }

  return keywordData;
}
