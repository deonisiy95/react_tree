import React, {useCallback, useState, useRef, useEffect} from 'react';
import style from './style.less';
import OutsideClickHandler from 'react-outside-click-handler';
import Icon from 'src/Icon';
import cn from 'classnames';
import Loader from 'src/Loader';

interface IProps {
  title: string;
  onUpdate: (newTitle: string) => Promise<void>;
  onRemove: () => Promise<void>;
  onClick: () => void;
}

export default function Node({title, onUpdate, onRemove, onClick}: IProps): JSX.Element {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMount = React.useRef(false);
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    isMount.current = true;

    return () => {
      isMount.current = false;
    };
  }, []);

  const onEditClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setActive(true);
  }, []);

  const onRemoveClick = useCallback(
    async(event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      setLoading(true);
      await onRemove();
      isMount.current && setLoading(false);
    },
    [onRemove, isMount]
  );

  const onEdit = useCallback(async() => {
    const value = inputRef?.current?.value?.trim?.();

    if (value && title !== value) {
      setLoading(true);
      await onUpdate(value);
      setLoading(false);
    }

    setActive(false);
  }, [onUpdate, title]);

  const onOutsideClick = useCallback(() => {
    return onEdit();
  }, [onEdit]);

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      void onEdit();
    }

    if (e.key === 'Escape') {
      setActive(false);
    }
  }, [onEdit]);

  return (
    <div
      className={cn(style.node, {[style.active]: active})}
      onClick={!active && !loading ? onClick : null}
    >
      {active ? (
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <input
            ref={inputRef}
            autoFocus={true}
            className={style.input}
            defaultValue={title}
            onKeyUp={onKeyUp}
            maxLength={50}
            disabled={loading}
          />
          {loading ? <Loader className={style.loader} /> : null}
        </OutsideClickHandler>
      ) : (
        <>
          <div className={style.title}>{title}</div>
          <div className={style.controls}>
            {loading ? (
              <Loader className={style.loader} />
            ) : (
              <>
                <Icon
                  type={'pencil'}
                  onClick={onEditClick}
                  className={style.edit}
                />
                <Icon
                  type={'delete'}
                  onClick={onRemoveClick}
                  className={style.remove}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
