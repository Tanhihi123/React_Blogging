const { createContext } = require("react");

const ScrollContext = createContext();
function ScrollProvider(props) {
  const value = {}
  return <ScrollContext.Provider value={value} {...props} ></ScrollContext.Provider>
}
