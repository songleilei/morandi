import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AutoComplete } from "./autoComplete";

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
    return lakers.filter((name) => name.includes(query));
  };
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("you selected !")}
    />
  );
};

storiesOf("AutoComplete Component", module).add("AutoComplete", SimpleComplete);
