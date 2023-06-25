import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
export default function KeywordKeyword({ keyword, handleToggleKeywordClick, deleteKeyword, cookies, showKeywords }) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div>
      {showKeywords ? (
        <div>
          <button
            className="btn-toggle w-full flex flex-row"
            onClick={() => handleToggleKeywordClick(keyword)}
            onMouseEnter={() => showKeywords && setShowDelete(true)}
            onMouseLeave={() => showKeywords && setShowDelete(false)}
          >
            <FolderIcon className="text-amber-400 mr-3 mt-1.5" />
            <p>{keyword}</p>
            {showDelete && (
              <button
                className="ml-2"
                onClick={() => {
                  deleteKeyword(keyword, cookies.accessToken);
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </button>
            )}
          </button>
        </div>
      ) : (
        <p className="font-semibold px-4 py-2 text-2xl">{keyword}</p>
      )}
    </div>
  );
}