import React, {FC} from 'react';
import Tree from 'src/Tree';

const tree = [
  {
    id: 1,
    title: 'Item 1',
    children: [
      {
        id: 3,
        title: 'Item 1.1',
        children: [
          {
            id: 6,
            title: 'Item 1.1.1',
            children: []
          },
        ]
      },
      {
        id: 4,
        title: 'Item 1.2',
        children: []
      },
      {
        id: 5,
        title: 'Item 1.3',
        children: []
      },
    ]
  },
  {
    id: 2,
    title: 'Item 2',
    children: [
      {
        id: 7,
        title: 'Item 2.1',
        children: []
      },
    ]
  }
]

export const App: FC = () => {
  const onAdd = (title: string, parentId?: number) => {
    console.log('Add', title, parentId);
    return Promise.resolve();
  }

  const onUpdate = (id: number, newTitle: string) => {
    console.log('Update', id, newTitle);
    return Promise.resolve();
  }

  const onRemove = (id: number) => {
    console.log('Remove', id);
    return Promise.resolve();
  }

  return <Tree tree={tree} onAdd={onAdd} onUpdate={onUpdate} onRemove={onRemove} />;
};
