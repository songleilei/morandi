import React, { FC, ReactElement, InputHTMLAttributes } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classnames from "classnames";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /** 是否禁用 */
  disabled?: boolean;
  /** 设置 input 大小 */
  size?: InputSize;
  /** 添加图标，右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /** 添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /** 添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
}

/**
 * Input 输入框 最基础的表单域的包装
 *
 * ~~~js
 * import { Input } from 'morandi'
 * ~~~
 */
export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;

  const cnames = classnames("morandi-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!prepend,
    "input-group-prepend": !!append,
  });

  return (
    <div className={cnames} style={style}>
      {prepend && <div className="morandi-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon}></Icon>
        </div>
      )}
      <input
        className="morandi-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="morandi-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
