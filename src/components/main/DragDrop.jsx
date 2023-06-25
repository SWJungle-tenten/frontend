import React from 'react';

export default function DragDrop({ draggedElementContent }) {
  const handleDragOver = (event) => {
    event.preventDefault();
  };
// 놓으면 draggedElementContent가 내용으로 세팅되게 하면 될듯
  const handleDrop = (event) => {
    // const draggedElement = event.dataTransfer.getData('text/plain');
    // if (draggedElement === 'draggedElement') {
    //   const element = document.createElement('div');
    //   element.innerHTML = draggedElementContent; // 드래그한 요소의 내용을 사용하여 새로운 요소 생성
    //   const container = event.target;
    //   if (container) {
    //     container.appendChild(element);
    //   }
    // }
    console.log(draggedElementContent);
  };

  return (<>
    <div className="droppable" onDragOver={handleDragOver} onDrop={handleDrop}>
      Here
    </div>
    <button onClick={()=>{console.log(draggedElementContent)}}>ddd</button>
  </>
  );
}
