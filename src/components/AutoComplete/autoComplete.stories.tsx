import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AutoComplete, DataSourceType } from "./autoComplete";

const SimpleComplete = () => {
  const lakers = [
    "bradley",
    "pope",
    "carus",
    "cok",
    "cousin",
    "jsam",
    "ad",
    "gre",
    "howrad",
    "kuz",
    "mcgee",
    "ra",
  ];

  const handleFetch = (query: string) => {
    return lakers
      .filter((item) => item.includes(query))
      .map((item) => ({
        value: item,
      }));
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("you selected !")}
    />
  );
};

interface IPlayer {
  name: string;
  number: number;
}

const CustomComplete = () => {
  const lakersWithNumber = [
    { value: "bradley", number: 1 },
    { value: "pope", number: 2 },
    { value: "carus", number: 3 },
    { value: "cok", number: 4 },
    { value: "cousin", number: 5 },
    { value: "jsam", number: 6 },
    { value: "ad", number: 7 },
    { value: "gre", number: 8 },
    { value: "howrad", number: 9 },
  ];

  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((item) => item.value.includes(query));
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<IPlayer>;
    return (
      <>
        <i>Name：{itemWithNumber.value}</i>
        <p>Age：{itemWithNumber.number}</p>
      </>
    );
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("you selected !")}
      renderOption={renderOption}
    />
  );
};

const AsyncComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<{
      value: string;
      url: string;
    }>;
    return (
      <>
        <i>Name：{itemWithNumber.value}</i>
        <p>url: {itemWithNumber.url}</p>
      </>
    );
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("you selected !")}
      renderOption={renderOption}
    />
  );
};

storiesOf("AutoComplete Component", module)
  .add("AutoComplete", SimpleComplete)
  .add("自定义Item", CustomComplete)
  .add("异步Item", AsyncComplete);
