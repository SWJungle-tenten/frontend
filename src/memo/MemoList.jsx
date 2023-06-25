import React from "react";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

export default function MemoList({ memoArray, setSelectedMemo, open, setSelectedTitle }) {
  const handleMemoClick = (memo) => {
    setSelectedMemo(memo.time);
    setSelectedTitle(memo.memoTitle);
    open();
  };
  return (
    <div className="flex-col p-6">
      <div className="text-2xl font-bold mb-7">메모</div>
      {memoArray &&
        memoArray.map((memo, index) => (
          <div>
            <button
              key={index}
              onClick={() => handleMemoClick(memo)}
              className="flex flex-row mt-1 font-normal text-lg hover:bg-red-100 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg p-3 py-1 w-full cursor-pointer"
            >
              <ArticleOutlinedIcon className="mr-2 mt-0.5 text-slate-600 font-light" />
              <p className=" text-start" key={index}>
                {memo.memoTitle}
              </p>
            </button>
          </div>
        ))}
      {/* <Memo/> */}
    </div>
  );
}