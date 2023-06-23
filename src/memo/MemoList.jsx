import React, { useState } from "react";
import Memo from "./Memo";

export default function MemoList({ memoArray, setSelectedMemo, open }) {
  const [showDelete, setShowDelete] = useState(false);

  const handleMemoClick = (memo) => {
    // console.log(memo);
    setSelectedMemo(memo);
    open();
  };
  
  const handleNewMemo = () =>{
    setSelectedMemo("");
    open(false);
  }
  return (
    <div className="flex-col p-6">
      
      {memoArray.map((memo, index) => (
        <div className="pb-2">
        <button className="mt-1 font-medium  text-lg  hover:bg-red-100 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg p-3 py-0.5" 
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
        key={index} onClick={()=> handleMemoClick(memo)}>{memo}</button>

        </div>
      ))}
      <button onClick={handleNewMemo}>새 메모 만들기</button>
      {/* <Memo/> */}
    </div>
  );
}