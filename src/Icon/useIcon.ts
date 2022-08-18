import {useMemo} from 'react';
import cn from 'classnames';
import style from 'src/Icon/style.less';

interface IIcon {
  style: string;
}

export default function useIcon(icon: string): IIcon {
  return useMemo(() => {
    return {
      style: cn(style[icon], style.icon)
    };
  }, [icon]);
}
