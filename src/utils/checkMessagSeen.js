const checkMessageSeen = (
  messageRef,
  socket,
  messages,
  targetUserId,
  targetUserName
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && messages.firstName === targetUserName) {
        socket.current.emit('markAsSeen', {
          targetUserId,
          seen: true,
        });
      }
    },
    { threshold: 1.0 }
  );

  if (messageRef.current) {
    observer.observe(messageRef.current);
  }

  return () => {
    if (messageRef.current) {
      observer.unobserve(messageRef.current);
    }
  };
};
export default checkMessageSeen;
