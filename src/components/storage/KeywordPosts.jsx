import React from "react";

const KeywordPosts = ({ keyword, userScrapData, handleDragStart }) => {
  const keywordData = getKeywordData(keyword, userScrapData);

  return (
    <div className="py-4 h-[93vh] overflow-hidden">
      <h1 className="sticky top-0 px-4 py-2 text-5xl text-center font-bold shadow bg-white">
        {keyword ? `${keyword}` : ""}
      </h1>
      {keywordData && (
        <ul className="h-full overflow-auto p-8 pr-10">
          {keywordData.map((data, index) => (
            <div className="pb-6" key={`keyword-post-${index}`}>
              <div className="px-4 py-2 text-left text-3xl font-semibold break-keep">
                {data.title}
              </div>
              {data.url.length > 0 ? (
                <iframe
                  title={`iframe-${index}`}
                  src={data.url}
                  className="iframe"
                ></iframe>
              ) : null}
              {data.text &&
                data.text.map((text, textIndex) => (
                  <div
                    className="tooltip px-1"
                    data-tip="드래그해서 텍스트를 메모에 추가해보세요"
                    key={textIndex}
                  >
                    <div
                      className="cursor-grab hover:brightness-50 active:cursor-grabbing text-lg mb-5 text-left border border-slate-300 border-dashed rounded-lg p-2"
                      draggable={true}
                      onDragStart={handleDragStart}
                      key={`text-${index}-${textIndex}`}
                    >
                      {text}
                    </div>
                  </div>
                ))}
              {data.img && data.img.length > 0 && (
                <div className="flex flex-row flex-wrap w-full gap-[19px] pb-14">
                  {data.img.map((img, imgIndex) => (
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
                      />
                    </div>
                  ))}
                </div>
              )}
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
            url: date.urls[i] ? date.urls[i] : [],
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
