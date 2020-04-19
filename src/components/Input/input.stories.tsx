import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input from "./input";

const defaultInput = () => (
  <Input placeholder="please input" onChange={action("change")} />
);

const ControlledInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      defaultValue={12}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

storiesOf("Input Component", module)
  .add("Input", defaultInput)
  .add("受控 Input", ControlledInput);
