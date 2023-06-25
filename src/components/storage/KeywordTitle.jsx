export default function KeywordTitle({
    title,
    handleTitleClick,
  }) {
    return (
      <div className="flex py-1">
        <div className="flex bg-red-50 hover:bg-red-100 rounded-lg">
          <div
            className="mt-1 font-medium focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg text-lg relative p-3 py-0.5 break-keep pr-7 text-start"
            // onClick={() => handleTitleClick(title)}
          >
            {title}
          </div>
        </div>
      </div>
    );
  }
  