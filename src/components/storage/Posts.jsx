export default function Posts({
  date,
  userScrapData,
  setDraggedElementContent,
  handleDragStart,
}) {
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
      {dateData && (
        <ul className="h-full overflow-auto p-8 pr-10">
          {dateData.map((data, index) => (
            <div className="pb-6" key={index}>
              {console.log("data234", data)}
              <div className="px-4 py-2 text-left text-xl">{data.title}</div>
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={data.url}
                  className="w-full h-[70vh] border border-gray-400 rounded-md"
                >
                  <p>이 브라우저는 iframe을 지원하지 않습니다.</p>
                </iframe>
              </div>
              {console.log("data", data)}
              {data.text &&
                data.text.map((text, textIndex) => (
                  <div draggable={true} onDragStart={handleDragStart} key={`text-${textIndex}`}>{text}</div>
                ))}
              {data.img &&
                data.img.map((img, imgIndex) => (
                  <div>
                    <img onDragStart={handleDragStart}
                      key={`img-${imgIndex}`}
                      src={img}
                      alt={`Image-${imgIndex}`}
                    />
                  </div>
                ))}
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
      const data = item.keywords.titles.map((title, i) => {
        return {
          title: title,
          url: item.keywords.urls[i],
          text: item.keywords.texts ? item.keywords.texts[i] : null,
          img: item.keywords.img ? item.keywords.img[i] : null,
        };
      });
      dateData.push(...data);
    }
  }
  return dateData;
}
