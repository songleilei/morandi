import React from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import "../src/styles/index.scss";

library.add(fas);

// add decorator

const wrapperStyle: React.CSSProperties = {
  padding: "20px 40px",
};
const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h4 style={{ marginBottom: "20px" }}>组件演示</h4>
    {stroyFn()}
  </div>
);
addDecorator(storyWrapper);

addDecorator(withInfo);
addParameters({ info: { inline: true, header: false } });

const loaderFn = () => {
  const allExports = [require("../src/welcome.stories.tsx")];
  const req = require.context("../src/components", true, /\.stories\.tsx$/);
  req.keys().forEach((fname) => allExports.push(req(fname)));
  return allExports;
};

// automatically import all files ending in *.stories.js
configure(loaderFn, module);
