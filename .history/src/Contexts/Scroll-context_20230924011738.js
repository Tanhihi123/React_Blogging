const { createContext, useContext } = require("react");

const ScrollContext = createContext();
function ScrollProvider(props) {
  const value = {}
  function HandleScroll(classname){
    document.querySelector(classname).scrollIntoView({
      
    })
  }
  return <ScrollContext.Provider value={value} {...props} ></ScrollContext.Provider>
}
function useScroll() {
  const context = useContext(ScrollContext);
  if (typeof context === "undefined")
    throw new Error("useScroll must be used within ScrollProvider");
  return context;
}
export {ScrollProvider,useScroll}