export default function Posts({ date, userScrapData }) {
  const dateData = getDateData(date, userScrapData);

  return (
    <div className="py-4 h-[93vh] overflow-auto ">
      {date ? (
        <h1 className="sticky top-0 px-4 py-2 text-5xl text-center font-bold shadow bg-white">
          {date}
        </h1>
      ) : (
        ``
      )}
      {/* <h1 className="px-4 py-2 text-5xl text-center font-bold shadow">
        {date ? `${date}` : ``}
      </h1> */}
      {dateData && (
        <ul className="h-full overflow-auto p-8 pr-10">
          {dateData.map((titleObj, index) => (
            <div className="pb-6" key={index}>
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
