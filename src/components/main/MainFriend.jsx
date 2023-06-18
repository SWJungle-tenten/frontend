import React, { useState } from 'react';

export default function MainFriend() {
  const [list, setList] = useState([
    {
      id: 1,
      title: 'Folder 1',
      level: 0,
      children: [
        {
          id: 11,
          title: 'Subfolder 1-1',
          level: 1,
          children: [],
        },
        { id: 12, title: 'Subfolder 1-2', level: 1, children: [] },
      ],
    },
    { id: 2, title: 'Folder 2', level: 0, children: [] },
    { id: 3, title: 'Folder 3', level: 0, children: [] },
  ]);
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('text/plain');
    const updatedList = [...list];

    const draggedItem = updatedList[draggedIndex];
    updatedList.splice(draggedIndex, 1);

    if (draggedItem.title === 'Subfolder 1-1') {
      const destinationItem = updatedList.find((item) => item.title === 'Folder 2');
      destinationItem.children.push(draggedItem, ...draggedItem.children);
      draggedItem.children = [];
      setIsHovered(true);
    }

    updatedList.splice(index, 0, draggedItem);

    setList(updatedList);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsHovered(false);
  };

  const renderList = (items) => {
    return (
      <ul>
        {items.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{ marginLeft: `${item.level * 20}px` }}
          >
            {item.title}
            {item.children.length > 0 && renderList(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Drag and Drop Folder List</h2>
      <div className={`folder ${isHovered ? 'hovered' : ''}`}>
        {renderList(list)}
      </div>
    </div>
  );
}
