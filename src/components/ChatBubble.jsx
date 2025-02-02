import { DEFAULT_USER_URL } from '../constants/constants';
import { format } from 'date-fns';
import { ChatBubblePropTypes } from '../proptypes/propTypes';

const ChatBubble = ({
  message,
  user,
  profilePhoto,
  targetUserPhoto,
  lastIndex,
}) => {
  const name = message.firstName + ' ' + message.lastName;
  const { createdAt } = message;
  //TODO: limit messages when fetching messages from db
  const targetUserImage = targetUserPhoto || DEFAULT_USER_URL;

  return (
    <>
      <div
        className={
          'chat ' +
          (user.firstName === message.firstName ? 'chat-start' : 'chat-end')
        }
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                user.firstName === message.firstName
                  ? profilePhoto
                  : targetUserImage
              }
            />
          </div>
        </div>
        <div className="chat-header">
          {name}{' '}
          <time className="text-xs opacity-50">
            {lastIndex &&
              (createdAt
                ? format(new Date(createdAt), 'EEEE/dd/yyyy')
                : format(new Date(Date.now()), 'EEEE/dd/yyyy'))}
          </time>
        </div>
        <div className="chat-bubble">{message?.text}</div>
        <div className="chat-footer opacity-50">{/* <ChekMark /> */}</div>
      </div>
    </>
  );
};

ChatBubble.propTypes = ChatBubblePropTypes;

export default ChatBubble;
