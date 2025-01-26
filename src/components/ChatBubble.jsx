import { DEFAULT_USER_URL } from '../constants/constants';
import { format } from 'date-fns';
import ChekMark from './ChekMark';
import PropTypes from 'prop-types';

const ChatBubble = ({ message, user, profilePhoto, targetUserPhoto }) => {
  const name = message.firstName + ' ' + message.lastName;
  const { createdAt } = message;

  //TODO: show time stamp for message->last seen 2 hours ago
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
            {createdAt
              ? format(new Date(createdAt), 'EEEE/dd/yyyy')
              : format(new Date(Date.now()), 'EEEE/dd/yyyy')}
          </time>
        </div>
        <div className="chat-bubble">{message?.text}</div>
        <div className="chat-footer opacity-50">
          <ChekMark />
        </div>
      </div>
    </>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      emailId: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      photoUrl: PropTypes.string.isRequired,
      about: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.string).isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      age: PropTypes.number.isRequired,
      gender: PropTypes.string.isRequired,
      isPremium: PropTypes.bool.isRequired,
    }).isRequired
  ),
  profilePhoto: PropTypes.string.isRequired,
  targetUserPhoto: PropTypes.string.isRequired,
};

export default ChatBubble;
