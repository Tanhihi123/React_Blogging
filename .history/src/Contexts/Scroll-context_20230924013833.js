const { createContext, useContext, useState } = require("react");

const ScrollContext = createContext();
function ScrollProvider(props) {
  const [className,setClassName] = useState("");
  const value = {className,setClassName,HandleScroll}
  function HandleScroll() {
    const commentElement = document.querySelector(".comment");
    window.scrollTo({
      top: commentElement.offsetTop,
      behavior: "smooth",
    });
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