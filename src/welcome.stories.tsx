import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
  "welcome",
  () => {
    return (
      <>
        <h1>欢迎来到 morandi 组件库</h1>
        <p>现在是试验阶段</p>
        <h3>安装玩玩</h3>
        <code>npm install morandi --save</code>
      </>
    );
  },
  { info: { disable: true } }
);
