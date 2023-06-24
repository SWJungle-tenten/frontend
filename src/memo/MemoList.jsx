import React from "react";

export default function MemoList({ memoArray, setSelectedMemo, open ,setSelectedTitle}) {

  const handleMemoClick = (memo) => {
    setSelectedMemo(memo.time);
    setSelectedTitle(memo.memoTitle);
    open();
  };
  const handleNewMemo = () =>{
    setSelectedTitle("");
    setSelectedMemo("");
    open();
  }
  return (
    <div className="flex-col p-6">
      
      {memoArray && memoArray.map((memo, index) => (
        <div className="" key={index}>
        <button className="mt-1 font-medium text-lg hover:bg-red-100 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg p-3 py-1" 
        key={index} 
        onClick={()=> handleMemoClick(memo)}
        >{memo.memoTitle}</button>

        </div>
      ))}
      <button className="mt-1 font-medium text-lg bg-sky-50 hover:bg-sky-100 focus:ring-2 focus:outline-none focus:ring-sky-300 rounded-lg p-3 py-1" onClick={handleNewMemo}>새 메모 만들기</button>
      {/* <Memo/> */}
    </div>
  );
}