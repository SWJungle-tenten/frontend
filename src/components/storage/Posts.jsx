export default function Posts({
  date,
  userScrapData,
  setDraggedElementContent,
  handleDragStart,
}) {
  const dateData = getDateData(date, userScrapData);

  return (
    <div className="py-4 h-[93vh] overflow-hidden ">
      {date ? <h1 className="sticky top-0 px-4 py-2 text-5xl text-center font-bold border-b bg-white">{date}</h1> : ``}
      {dateData && (
        <ul className="h-full overflow-auto p-8 pr-10">
          {dateData.map((data, index) => (
            <div className="pb-6" key={index}>
              <div className="px-4 py-2 text-left text-3xl font-semibold">
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
                    className="hover:opacity-75 italic text-xl border border-gray-300 "
                    draggable={true}
                    onDragStart={handleDragStart}
                    key={`text-${textIndex}`}
                  >
                    {text}
                  </div>
                ))}
              {data.img &&
                data.img.map((img, imgIndex) => (
                  <div className="hover:opacity-75">
                    <img
                      onDragStart={handleDragStart}
                      key={`img-${imgIndex}`}
                      src={img}
                      crossOrigin="anonymous"
                      alt={`Imag-${imgIndex}`}
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
