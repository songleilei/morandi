import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload, UploadFile } from "./upload";

const defaultFileList: UploadFile[] = [
  { uid: "123", size: 1234, name: "hell.md", status: "uploading", percent: 30 },
  { uid: "122", size: 1234, name: "zdd.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "ko.md", status: "error", percent: 30 },
];

const checkFileSize = (file: File) => {
  // if (Math.round(file.size / 1024) > 50) {
  //   alert("file too big");
  //   return false;
  // }
  return true;
};

const filePromise = (file: File) => {
  const newFile = new File([file], "new_name", { type: file.type });
  return Promise.resolve(newFile);
};

const SimpleUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      defaultFileList={defaultFileList}
      onProgress={action("onProgress")}
      onSuccess={action("onSuccess")}
      onError={action("onError")}
      onChange={action("onChange")}
      beforeUpload={checkFileSize}
      drag
    >
      <p>drag file to upload</p>
    </Upload>
  );
};

const PromiseUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      beforeUpload={filePromise}
      onChange={action("onChange")}
      onProgress={action("onProgress")}
    />
  );
};

storiesOf("Upload component", module)
  .add("Upload", SimpleUpload)
  .add("promise", PromiseUpload);
