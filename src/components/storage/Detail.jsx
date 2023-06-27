export default function Detail({
  title,
  userScrapData,
  setdraggedElementContent,
  handleDragStart,
}) {
  const titleData = getTitleData(title, userScrapData);

  return (
    <div className="p-8 h-[93vh]">
      <p className="px-4 py-2 text-center text-4xl font-bold break-keep">
        {title}
      </p>
      {titleData && (
        <div>
          {titleData.map((data, index) => (
            <div key={index} >
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={data.url}
                  className="w-full h-[70vh] border border-gray-400 rounded-md"
                >
                </iframe>
              </div>
              {data.text &&
                data.text.map((text, textIndex) => (
                  <div className="hover:opacity-75 italic text-xl border border-gray-300 " draggable={true} onDragStart={handleDragStart} key={`text-${textIndex}`}>{text}</div>
                ))}
              {data.img &&
                data.img.map((img, imgIndex) => (
                  <div className="hover:opacity-75">
                    <img  onDragStart={handleDragStart}
                      key={`img-${imgIndex}`}
                      src={img}
                      crossOrigin="anonymous"
                      alt={`Related-${imgIndex}`}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getTitleData(title, userScrapData) {
  let titleData = [];
  for (const item of userScrapData) {
    if (item.keywords.titles.includes(title)) {
      const datas = item.keywords.titles.map((title, i) => {
        return {
          title: title,
          url: item.keywords.urls[i],
          img: item.keywords.img ? item.keywords.img[i] : null,
          text: item.keywords.texts ? item.keywords.texts[i] : null,
        };
      });
      titleData.push(...datas);
    }
  }
  return titleData;
}
