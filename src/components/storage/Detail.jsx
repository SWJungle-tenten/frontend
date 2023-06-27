export default function Detail({
  title,
  userScrapData,
  setdraggedElementContent,
  handleDragStart,
}) {
  const titleData = getTitleData(title, userScrapData);
  // console.log("titledata", titleData);
  const data = titleData[0] || {};
  return (
    <div className="p-8 h-[93vh]">
      <p className="px-4 py-2 text-center text-4xl font-bold break-keep">
        {data.title}
      </p>
      {data.url && (
        <div>
          <iframe
            title={`iframe-${data.title}`}
            src={data.url}
            className="w-full h-[70vh] border border-gray-400 rounded-md"
          ></iframe>
        </div>
      )}
      {data.text &&
        data.text.map((text, textIndex) => (
          <div
            className="hover:opacity-75 italic text-xl border border-gray-300"
            draggable={true}
            onDragStart={handleDragStart}
            key={`text-${textIndex}`}
          >
            {text}
          </div>
        ))}
      {data.img &&
        data.img.map((img, imgIndex) => (
          <div className="hover:opacity-75" key={`img-${imgIndex}`}>
            <img
              onDragStart={handleDragStart}
              src={img}
              crossOrigin="anonymous"
              alt={`Related-${imgIndex}`}
            />
          </div>
        ))}
    </div>
  );
}

function getTitleData(title, userScrapData) {
  let titleData = [];
  for (const item of userScrapData) {
    if (item.keywords.titles.includes(title)) {
      const index = item.keywords.titles.indexOf(title);
      const data = {
        title: title,
        url: item.keywords.urls[index],
        img: item.keywords.img ? item.keywords.img[index] : null,
        text: item.keywords.texts ? item.keywords.texts[index] : null,
      };
      titleData.push(data);
      break; // Stop after finding the first matching title
    }
  }
  return titleData;
}
