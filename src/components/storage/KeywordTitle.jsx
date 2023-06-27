export default function KeywordTitle({
    title,
    handleTitleClick,
  }) {
    return (
      <div className="flex py-1">
        <div className="flex bg-amber-50 hover:bg-amber-100 rounded-lg">
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
  