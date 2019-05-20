export default (text) => {
  const encodedText = encodeURIComponent(text);
  const url = `https://dummyimage.com/1920x1080/3d3d3d/000000&text=${encodedText}`;
  return url;
};
