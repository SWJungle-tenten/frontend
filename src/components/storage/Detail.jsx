export default function Detail({
  title,
  userScrapData,
  setdraggedElementContent,
  handleDragStart,
}) {
  const titleData = getTitleData(title, userScrapData);
  const data = titleData[0] || {};
  return (
    <div className="p-8 h-[93vh]">
      <p className="px-4 pt-2 pb-5 border-b-2 border-slate-400 mb-5 text-center text-4xl font-bold break-keep">
        {data.title}
      </p>
      {data.url && (
        <div>
          <iframe
            title={`iframe-${data.title}`}
            src={data.url}
            className="iframe"
          ></iframe>
        </div>
      )}
      {data.text &&
        data.text.map((text, textIndex) => (
          <div className="tooltip" data-tip="드래그해서 텍스트를 메모에 추가해보세요">
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
         <div className="flex flex-row flex-wrap w-full gap-[19px] pb-16">
          {data.img &&
            data.img.map((img, imgIndex) => (
              <div className="tooltip" data-tip="드래그해서 이미지를 메모에 추가해보세요">
                <img
                  className="cursor-grab border rounded-lg	hover:brightness-50 active:cursor-grabbing"
                  onDragStart={handleDragStart}
                  key={`img-${imgIndex}`}
                  src={img}
                  alt={`Related-${imgIndex}`}
                />
              </div>
            ))}
         </div>
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
