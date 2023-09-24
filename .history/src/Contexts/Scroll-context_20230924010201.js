const { createContext, useContext } = require("react");

const ScrollContext = createContext();
function ScrollProvider(props) {
  const value = {}
  return <ScrollContext.Provider value={value} {...props} ></ScrollContext.Provider>
}
function useScroll() {
  const context = useContext(ScrollContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
}