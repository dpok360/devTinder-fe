const savePhotoUrlToStorage = (targetedUserphotoUrl, targetUserFirstName) => {
  if (!targetedUserphotoUrl && !targetUserFirstName) {
    return;
  }
  const targetUserDeatils = {
    photoUrl: targetedUserphotoUrl,
    userFirstName: targetUserFirstName,
  };

  localStorage.setItem('targetUserDetails', JSON.stringify(targetUserDeatils));
};

export default savePhotoUrlToStorage;
