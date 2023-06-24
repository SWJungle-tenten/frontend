import React from 'react';

const KeywordPosts = ({ keyword, userScrapData }) => {
  const keywordData = getKeywordData(keyword, userScrapData);

  return (
    <div className="py-4 h-[93vh] overflow-auto">
      {/* <h1 className="px-4 py-2 text-5xl text-center font-bold "> */}
      <h1 className="sticky top-0 px-4 py-2 text-5xl text-center font-bold shadow bg-white">
        {keyword ? `Keyword: ${keyword}` : ``}
      </h1>
      {keywordData && (
        <ul className="h-full overflow-auto p-6">
          {keywordData.map((titleObj, index) => (
            <div key={index}>
              <div className="px-4 py-2 text-left text-xl">
                {titleObj.title}
              </div>
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={titleObj.url}
                  className="w-full h-[70vh] border border-gray-400 rounded-md"
                >
                  <p>이 브라우저는 iframe을 지원하지 않습니다.</p>
                </iframe>
              </div>
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
    if (item.keywords.keyword === keyword) {
      const titlesAndUrls = item.keywords.titles.map((title, i) => {
        return { title: title, url: item.keywords.urls[i] };
      });
      keywordData.push(...titlesAndUrls);
    }
  }
  return keywordData;
}

export default KeywordPosts;
