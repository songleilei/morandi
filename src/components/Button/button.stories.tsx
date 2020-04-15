import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button, { ButtonSize, ButtonType } from "./button";

const defaultButton = () => (
  <Button onClick={action("clicked")}> default Button </Button>
);

const buttonWithSize = () => (
  <div>
    <Button size={ButtonSize.Large}> large Button</Button>
    <br />
    <br />
    <Button size={ButtonSize.Small}> small Button</Button>
  </div>
);

const buttonWityType = () => (
  <div>
    <Button btnType={ButtonType.Primary}> Primary Button</Button>
    <br />
    <br />
    <Button btnType={ButtonType.Danger}> Danger Button</Button>
    <br />
    <br />
    <Button btnType={ButtonType.Link} href="https://www.baidu.com">
      Link Button
    </Button>
  </div>
);

storiesOf("Button Component", module)
  .add("Button", defaultButton)
  .add("不同尺寸的 Button", buttonWithSize)
  .add("不同类型的 Button", buttonWityType);
