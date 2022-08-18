import React, {useCallback, useState, useMemo} from 'react';
import AddNode from '../Add';
import style from 'src/Tree/style.less';
import cn from 'classnames';
import useIcons from 'src/Icon/useIcon';
import Node from 'src/Tree/Node';

export interface INode {
  id: number;
  title: string;
  children?: INode[];
}

interface IProps<T> {
  node: T;
  onAdd: (title: string, parentId?: number) => Promise<void>;
  onUpdate: (id: number, newTitle: string) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
  depth: number;
  maxDepth: number;
}

export default function Subtree<T extends INode>({
  node,
  onAdd,
  onUpdate,
  onRemove,
  depth,
  maxDepth
}: IProps<T>): JSX.Element {
  const withChild = node.children?.length > 0;
  const canAdd = depth < maxDepth;
  const isLeaf = !withChild && !canAdd;
  const plusIcon = useIcons('plus-square');
  const minusIcon = useIcons('minus-square');
  const [expanded, setExpanded] = useState(false);

  const onClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const addNode = useCallback(
    async(title: string) => {
      await onAdd(title, node.id);
    },
    [node.id, onAdd]
  );

  const updateNode = useCallback(
    async(newTitle: string) => {
      await onUpdate(node.id, newTitle);
    },
    [node.id, onUpdate]
  );

  const removeNode = useCallback(async() => {
    await onRemove(node.id);
  }, [node.id, onRemove]);

  const icon = useMemo(
    () =>
      !isLeaf ? (
        <div
          className={cn(style.control, {
            [plusIcon.style]: !expanded,
            [minusIcon.style]: expanded
          })}
          onClick={onClick}
        />
      ) : null,
    [isLeaf, expanded, plusIcon.style, minusIcon.style, onClick]
  );

  return (
    <div className={style.subtree}>
      <div className={cn(style.node, {[style.leaf]: isLeaf})}>
        {icon}
        <Node
          title={node.title}
          onUpdate={updateNode}
          onRemove={removeNode}
          onClick={onClick}
        />
      </div>

      {expanded && (
        <div className={style.children}>
          {canAdd ? <AddNode onAdd={addNode} /> : null}
          {withChild &&
            node.children.map(child => (
              <Subtree
                key={child.id}
                node={child}
                onAdd={onAdd}
                onUpdate={onUpdate}
                onRemove={onRemove}
                depth={depth + 1}
                maxDepth={maxDepth}
              />
            ))}
        </div>
      )}
    </div>
  );
}
