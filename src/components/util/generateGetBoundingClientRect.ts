export const generateGetBoundingClientRect = (x: number = 0, y: number = 0) => {
  return () => {
    return {
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x,
    };
  };
};
