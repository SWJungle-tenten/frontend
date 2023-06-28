export default function Posts({ date, userScrapData, handleDragStart }) {
  const dateData = getDateData(date, userScrapData);

  return (
    <div className="py-4 h-[93vh] overflow-hidden ">
      {date ? (
        <h1 className="sticky top-0 px-4 py-2 text-5xl text-center font-bold border-b bg-white">
          {date}
        </h1>
      ) : (
        ``
      )}
      {dateData && (
        <ul className="h-full overflow-auto p-8 pr-10">
          {dateData.map((data, index) => (
            <div className="pb-6" key={index}>
              <div className="px-4 py-2 text-left text-3xl font-semibold break-keep">
                {data.title}
              </div>
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={data.url}
                  className="iframe"
                ></iframe>
              </div>
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
                      key={`text-${textIndex}`}
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
                        key={`img-${imgIndex}`}
                        src={img}
                        crossOrigin="anonymous"
                        alt={`Imag-${imgIndex}`}
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
