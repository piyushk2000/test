import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { List, ListItem, Paper, SxProps, Theme } from '@mui/material';

type Props<T> = {
  lists: Array<T>;
  updatedList: (list: Array<T>) => void;
  ListComponent: React.FC<T>;
  keyExtractor: (item: T) => string | number;
  listItemSx?: SxProps<Theme> | undefined;
  listContainerSx?: SxProps<Theme> | undefined;
};

function DragDropList<T>({ lists, updatedList, ListComponent, keyExtractor , listItemSx = {}, listContainerSx = {}}: Props<T>) {
  const [list, updateList] = useState(lists);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updatedList(items);
    updateList(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef} sx={{ width: 300, margin: '0 auto', ...listContainerSx }}>
            {list.map((detail, index) => {
              const key = keyExtractor(detail);
              return (
                <Draggable key={key} draggableId={key.toString()} index={index}>
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ marginBottom: 1, padding: 2, cursor: 'grab' , ...listItemSx}}
                      component={Paper}
                    >
                      <ListComponent {...(detail as T & JSX.IntrinsicAttributes)} />
                    </ListItem>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDropList;
