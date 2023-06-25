import React from "react";

const KeywordPosts = ({
  keyword,
  userScrapData,
  setDraggedElementContent,
  handleDragStart,
}) => {
  const keywordData = getKeywordData(keyword, userScrapData);
  console.log("keywordData", keywordData);
  return (
    <div className="py-4 h-[93vh] overflow-auto">
      <h1 className="sticky top-0 px-4 py-2 text-5xl text-center font-bold shadow bg-white">
        {keyword ? `Keyword: ${keyword}` : ""}
      </h1>
      {keywordData && (
        <ul className="h-full overflow-auto p-6">
          {keywordData.map((data, index) => (
            <div key={`keyword-post-${index}`}>
              <div className="px-4 py-2 text-left text-xl">{data.title}</div>
              <iframe
                title={`iframe-${index}`}
                src={data.url}
                className="w-full h-[70vh] border border-gray-400 rounded-md"
              >
                <p>이 브라우저는 iframe을 지원하지 않습니다.</p>
              </iframe>
              {data.text &&
                data.text.map((text, textIndex) => (
                  <div
                    draggable={true}
                    onDragStart={handleDragStart}
                    key={`text-${index}-${textIndex}`}
                  >
                    {text}
                  </div>
                ))}
              {data.img &&
                data.img.map((img, imgIndex) => (
                  <div key={`img-${index}-${imgIndex}`}>
                    <img
                      onDragStart={handleDragStart}
                      src={img}
                      alt={`Related-${imgIndex}`}
                    />
                  </div>
                ))}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

function getKeywordData(keyword, userScrapData) {
  let keywordData = [];
  for (const item of userScrapData) {
    if (item.keyword === keyword) {
      const datas = item.dates.flatMap((date) => {
        return date.titles.map((title, i) => {
          return {
            title: title,
            url: date.urls[i],
            img: date.img[i] ? date.img[i] : null,
            text: date.texts[i] ? date.texts[i] : null,
          };
        });
      });
      keywordData.push(...datas);
    }
  }
  return keywordData;
}

export default KeywordPosts;
