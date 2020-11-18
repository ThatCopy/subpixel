import React from "react";

// set the defaults
const FileContext = React.createContext({
  file: null,
  setFile: () => {}
});

export default FileContext;
