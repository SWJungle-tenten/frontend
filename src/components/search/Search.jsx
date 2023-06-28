import React from "react";

export default function Search({ searchResultArray, handleDragStart ,searchRef}) {
  return (
    <div>
      <div className="p-8 overflow-auto">
        <div className="px-4 pb-4 text-left text-3xl font-semibold break-keep">
            "{searchRef.current}" 검색결과
        </div>
        
        {searchResultArray && searchResultArray.length > 0 ?( 
          searchResultArray.map((result, index) => (
            <div
              className="tooltip px-1"
              data-tip="드래그해서 텍스트를 메모에 추가해보세요"
              key={index}
            >
              <div
                className="cursor-grab hover:brightness-50 active:cursor-grabbing text-lg mb-5 text-left border border-slate-300 border-dashed rounded-lg p-2"
                draggable={true}
                onDragStart={handleDragStart}
                key={index}
              >
                {result}
              </div>
            </div>
          ))):(
            <div className="text-3xl text-center p-6">
                검색 결과가 없습니다
            </div>
          )
        }
      </div>
    </div>
  );
}
