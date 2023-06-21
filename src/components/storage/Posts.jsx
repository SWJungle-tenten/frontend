export default function Posts({ date, userScrapData }) {
  const dateData = getDateData(date, userScrapData);

  return (
    <div className="py-4 border- border-gray-400 h-screen overflow-auto">
      <h1 className="px-4 py-2 text-5xl text-center font-bold ">
        {date ? `Date: ${date}` : ``}
      </h1>
      {dateData && (
        <ul className="h-full overflow-auto p-6">
          {dateData.map((titleObj, index) => (
            <div key={index}>
              <div className="px-4 py-2 text-left text-xl">
                {titleObj.title}
              </div>
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={titleObj.url}
                  className="w-full h-[70vh] px-4 py-2 border-2 border-gray-400"
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
}

function getDateData(date, userScrapData) {
  let dateData = [];
  for (const item of userScrapData) {
    if (item.date === date) {
      const titlesAndUrls = item.keywords.titles.map((title, i) => {
        return { title: title, url: item.keywords.urls[i] };
      });
      dateData.push(...titlesAndUrls);
    }
  }
  return dateData;
}