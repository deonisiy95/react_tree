import React from 'react';
import style from './style.less';
import cn from 'classnames';

interface IProps {
  type: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Icon({type, className, onClick}: IProps) {
  return <div onClick={onClick} className={cn(style.icon, style[type], className)} />;
}
