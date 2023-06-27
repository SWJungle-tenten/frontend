import React from "react";

const KeywordDetail = ({
  title,
  userScrapData,
  handleDragStart,
  setDraggedElementContent,
}) => {
  const keywordData = getKeywordData(title, userScrapData);
  return (
    <div className="p-8 h-[93vh] overflow-scroll">
      <p className="px-4 py-2 text-center text-4xl font-bold break-keep">{title}</p>
      {keywordData && (
        <div>
          {keywordData.url && (
            <div>
              <iframe
                title={`iframe-${title}`}
                src={keywordData.url}
                className="w-full h-[70vh] border border-gray-400 rounded-md"
              ></iframe>
            </div>
          )}
          {keywordData.imgs.map((img, imgIndex) => (
            <div className="hover:opacity-75" key={`img-${imgIndex}`}>
              <img onDragStart={handleDragStart} src={img} crossOrigin="anonymous" alt={`Related-${imgIndex}`} />
            </div>
          ))}
          {keywordData.texts.map((text, textIndex) => (
            <div
              className="hover:opacity-75 italic text-xl border border-gray-300"
              draggable={true}
              onDragStart={handleDragStart}
              key={`text-${textIndex}`}
            >
              {text}
            </div>
          ))}
        </div>
      )}
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
