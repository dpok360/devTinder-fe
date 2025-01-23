const savePhotoUrlToStorage = (targetedUserphotoUrl) => {
  if (!targetedUserphotoUrl) {
    return;
  }
  localStorage.setItem('targetUserPhotoUrl', targetedUserphotoUrl);
};

export default savePhotoUrlToStorage;
