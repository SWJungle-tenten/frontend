import React from "react";

export default function MemoList({ memoArray, setSelectedMemo, open }) {

  const handleMemoClick = (memo) => {
    // console.log(memo);
    setSelectedMemo(memo);
    open();
  };

  const handleNewMemo = () =>{
    setSelectedMemo("");
    open();
  }
  return (
    <div className="flex-col p-6">
      
      {memoArray.map((memo, index) => (
        <div className="pb-2" key={index}>
        <button className="mt-1 font-medium text-lg hover:bg-red-100 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg p-3 py-0.5" 
        key={index} onClick={()=> handleMemoClick(memo)}>{memo}</button>

        </div>
      ))}
      <button className="mt-1 font-medium text-lg hover:bg-sky-100 focus:ring-2 focus:outline-none focus:ring-sky-300 rounded-lg p-3 py-0.5" onClick={handleNewMemo}>새 메모 만들기</button>
      {/* <Memo/> */}
    </div>
  );
}