const getOnlineStatus = () => {
  const status = navigator.onLine;
  return status === true ? 'online' : 'offline';
};
export default getOnlineStatus;
