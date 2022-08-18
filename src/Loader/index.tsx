import React, {memo} from 'react';
import style from './style.less';
import cn from 'classnames';

interface IProps {
  className?: string;
}

function Loader(props: IProps) {
  return <div className={cn(style.container, props.className)} />;
}

export default memo(Loader);
