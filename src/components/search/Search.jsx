import React from "react";
import TextSpreader from "../storage/TextSpreader";

export default function Search({
  searchResultArray,
  handleDragStart,
  searchRef,
}) {
  return (
    <div>
      <div className="p-8 overflow-auto">
        <div className="px-4 pb-4 text-left text-3xl font-semibold">"{searchRef.current}" 검색결과</div>
        {searchResultArray === null ? (
          <div className="text-3xl text-center p-6">검색 결과가 없습니다</div>
        ) : searchResultArray && searchResultArray.length > 0 ? (
          <TextSpreader texts={searchResultArray} handleDragStart={handleDragStart} />
        ) : (
          <div className="text-3xl text-center p-6">로딩중</div>
        )}
      </div>
    </div>
  );
}
