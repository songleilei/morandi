import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input from "./input";

const defaultInput = () => (
  <Input placeholder="please input" onChange={action("change")} />
);

storiesOf("Input Component", module).add("Input", defaultInput);
