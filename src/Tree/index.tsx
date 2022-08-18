import React from 'react';
import Subtree from './Subtree';
import AddNode from './Add';
import style from './style.less';

const DEFAULT_MAX_DEPTH = 4;

interface INode {
  id: number;
  title: string;
  children?: INode[];
}

interface IProps<T> {
  tree: T[];
  onAdd: (title: string, parentId?: number) => Promise<void>;
  onUpdate: (id: number, newTitle: string) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
  maxDepth?: number;
}

export default function Tree<T extends INode>({
  tree,
  maxDepth,
  onAdd,
  onUpdate,
  onRemove
}: IProps<T>): JSX.Element {
  return (
    <div className={style.wrapper}>
      <AddNode onAdd={onAdd} />
      {tree.map(node => (
        <Subtree
          key={node.id}
          node={node}
          depth={1}
          maxDepth={maxDepth ?? DEFAULT_MAX_DEPTH}
          onAdd={onAdd}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
