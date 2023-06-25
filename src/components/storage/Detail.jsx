export default function Detail({ title, userScrapData }) {
  const titleData = getTitleData(title, userScrapData);

  return (
    <div className="p-8 h-[93vh]">
      <p className="px-4 py-2 text-center text-4xl font-bold break-keep">{title}</p>
      <div>
        <iframe
          title={title}
          src={titleData ? titleData.url : ""}
          className="w-full h-[80vh] border border-gray-400 rounded-md"
        >
          <p>This browser does not support iframes.</p>
        </iframe>
      </div>
    </div>
  );
}

function getTitleData(title, userScrapData) {
  for (const item of userScrapData) {
    const foundTitleIndex = item.keywords.titles.findIndex((t) => t === title);
    if (foundTitleIndex >= 0) {
      return { title: title, url: item.keywords.urls[foundTitleIndex] };
    }
  }
  return null;
}

