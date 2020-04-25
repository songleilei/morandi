import React, {
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutSide from "../../hooks/useClickOutSide";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const debounceValue = useDebounce(inputValue, 500);
  useClickOutSide(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const result = fetchSuggestions(debounceValue);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((data) => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(result);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debounceValue, setSuggestions]);

  const highlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // 回车键
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38: // 向上
        highlight(highlightIndex - 1);
        break;
      case 40: // 向下
        highlight(highlightIndex + 1);
        break;
      case 27: //esc
        setSuggestions([]);
        break;

      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    triggerSearch.current = true;
    const value = e.target.value.trim();
    setInputValue(value);
  };

  const handleSelect = (item: DataSourceType) => {
    triggerSearch.current = false;
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  const renderTemplete = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <ul className="morandi-suggestion-list">
        {suggestions.map((item, index) => {
          const cnames = classNames("suggestion-item", {
            "is-active": index === highlightIndex,
          });
          return (
            <li
              key={index}
              className={cnames}
              onClick={() => handleSelect(item)}
            >
              {renderTemplete(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="morandi-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      ></Input>
      {loading && (
        <ul className="morandi-suggestion-list">
          <div className="suggestions-loading-icon">
            <Icon icon="spinner" spin theme="danger" />
          </div>
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
