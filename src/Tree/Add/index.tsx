import React, {useCallback, useRef, useState} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import treeStyle from 'src/Tree/style.less';
import style from './style.less';
import cn from 'classnames';
import Loader from 'src/Loader';

interface IProps {
  onAdd: (title: string) => Promise<void>;
}

export default function AddNode({onAdd}: IProps): JSX.Element {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const addNode = useCallback(async() => {
    if (loading) {
      return;
    }

    const value = inputRef?.current?.value?.trim?.();

    if (value) {
      setLoading(true);
      await onAdd(value);
      setLoading(false);
    }

    setActive(false);
  }, [onAdd, loading]);

  const onOutsideClick = useCallback(() => {
    return addNode();
  }, [addNode]);

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      void addNode();
    }

    if (e.key === 'Escape') {
      setActive(false);
    }
  }, [addNode]);

  const onClick = useCallback(() => {
    !active && setActive(true);
  }, [active]);

  return (
    <div className={treeStyle.subtree}>
      <div
        onClick={!active && !loading ? onClick : null}
        className={cn(treeStyle.node, style.node, treeStyle.leaf, {
          ['link']: !active,
          [style.active]: active
        })}
      >
        {active ? (
          <OutsideClickHandler onOutsideClick={onOutsideClick}>
            <input
              ref={inputRef}
              autoFocus={true}
              className={style.input}
              onKeyUp={onKeyUp}
              disabled={loading}
              maxLength={50}
            />
            {loading ? <Loader className={style.loader} /> : null}
          </OutsideClickHandler>
        ) : (
          <>Add</>
        )}
      </div>
    </div>
  );
}
