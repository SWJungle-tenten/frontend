import React, { useState } from 'react';

export default function DragTest({setDraggedElementContent}) {
    // const [isDragging, setIsDragging] = useState(false);
  
    const handleDragStart = (event) => {
    //   event.dataTransfer.setData('text/plain', 'draggedElement');
    //   event.dataTransfer.setData('text/html', event.target.innerHTML);
    //   setIsDragging(true);
    console.log(event.target);
        console.log(event.target.innerHTML);
        console.log(event.target.outerHTML);
    //   setDraggedElementContent(event.target.innerHTML); // 드래그한 요소의 내용을 저장
      setDraggedElementContent(event.target); // 드래그한 요소의 내용을 저장
      //outerHTML이랑 event.target이랑 뭔차이?
    };
  
    // const handleDragEnd = () => {
    //   setIsDragging(false);
    // };
  
    return (<>
    <img onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd} 
        src="https://tentenimg.s3.ap-northeast-2.amazonaws.com/original/1687613938191_blob" alt="true"></img>

      <div
        // id="draggedElement"
        // className={`draggable ${isDragging ? 'dragging' : ''}`}
        draggable={true}
        onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
      >
        Drag?
      </div>
      <div
        // id="draggedElement"
        // className={`draggable ${isDragging ? 'dragging' : ''}`}
        draggable={true}
        onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
      >
        nonono
      </div>
    </>

    );
  }
  