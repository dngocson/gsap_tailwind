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

export const formatTime = (value: number) => String(value).padStart(2, "0");
