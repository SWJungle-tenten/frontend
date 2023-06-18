export default function Detail({ title, userScrapData }) {
  const titleData = getTitleData(title, userScrapData);

  return (
    <div className="py-8 border-2 border-gray-400 h-screen">
      <p className="px-4 py-2 text-center text-5xl font-bold">{title}</p>
      <div>
        <iframe
          title={title}
          src={titleData ? titleData.url : ""}
          className="h-[70vh] w-full px-4 py-2 border-spacing-4 border-4 border-gray-400"
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

