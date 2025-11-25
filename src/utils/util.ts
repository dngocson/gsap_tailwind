export const getInnerWidthAndHeight = () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    return {
      width: rootElement.clientWidth,
      height: rootElement.clientHeight,
    };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};
