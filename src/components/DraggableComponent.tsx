import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemType } from './types';

interface DraggableComponentProps {
  type: ItemType;
  children: React.ReactNode;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

export default DraggableComponent;
