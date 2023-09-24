const { createContext } = require("react");

const ScrollContext = createContext();
function ScrollProvider(props) {
  return <ScrollContext.Provider></ScrollContext.Provider>
}