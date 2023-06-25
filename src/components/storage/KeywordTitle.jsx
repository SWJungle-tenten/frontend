export default function KeywordTitle({
    title,
    handleTitleClick,
  }) {
    return (
      <div className="flex py-1">
        <div className="flex bg-red-50 hover:bg-red-100 rounded-lg">
          <div
            className="btn-title"
            // onClick={() => handleTitleClick(title)}
          >
            {title}
          </div>
        </div>
      </div>
    );
  }
  