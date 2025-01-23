const readPhotoUrlFromStorage = (key) => {
  if (!key) {
    return console.log('Storage is empty');
  }

  const value = localStorage.getItem(key);
  if (!value) {
    return console.log('Local stirage is empty');
  } else {
    return value;
  }
};
export default readPhotoUrlFromStorage;
