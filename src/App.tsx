import React from "react";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu mode="horizontal">
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link 2</MenuItem>
          <SubMenu title="下拉菜单">
            <MenuItem>drop down 1</MenuItem>
            <MenuItem>drop dowm 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>
        <br />
        <Menu mode="vertical" defaultOpenSubMenus={["2"]}>
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link 2</MenuItem>
          <SubMenu title="下拉菜单">
            <MenuItem>drop down 1</MenuItem>
            <MenuItem>drop dowm 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>
      </header>

      <p>Learn React</p>
    </div>
  );
}

export default App;
