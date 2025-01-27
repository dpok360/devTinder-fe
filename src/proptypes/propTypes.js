import PropTypes from 'prop-types';

export const ChatBubblePropTypes = {
  message: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
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
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      age: PropTypes.number.isRequired,
      gender: PropTypes.string.isRequired,
      isPremium: PropTypes.bool.isRequired,
    }).isRequired
  ),
  profilePhoto: PropTypes.string.isRequired,
  targetUserPhoto: PropTypes.string.isRequired,
  lastIndex: PropTypes.bool.isRequired,
};

export const ChatHeaderPropTypes = {
  targetUserDetails: PropTypes.shape({
    photoUrl: PropTypes.string.isRequired,
    userFirstName: PropTypes.string.isRequired,
  }).isRequired,
  isUserActive: PropTypes.bool.isRequired,
};

export const ConnectionTablePropTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    about: PropTypes.string.isRequired,
    photoUrl: PropTypes.number.isRequired,
  }).isRequired,
};

export const UserCardPropTypes = {
  user: ConnectionTablePropTypes.user,
};

export const EditProfilePropTypes = {
  user: ConnectionTablePropTypes.user,
};

export const InputPorpTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setterFunc: PropTypes.func.isRequired,
};

export const ErrorFallBackPropTypes = {
  error: PropTypes.instanceOf(Error),
};

export const LabelPropTypes = {
  label: PropTypes.string.isRequired,
};

export const MessageInputPropTypes = {
  newMessages: PropTypes.string,
  handleKeyDown: PropTypes.func,
  setNewMessages: PropTypes.func,
};

export const OnlinePropTypes = {
  status: PropTypes.string.isRequired,
};

export const RequestTablePropTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      fromUserId: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        photoUrl: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        gender: PropTypes.oneOf(['male', 'female', 'other']).isRequired,
        about: PropTypes.string,
      }).isRequired,
      status: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ),
  index: PropTypes.number.isRequired,
};

export const SuccessToastPropTypes = {
  status: PropTypes.string.isRequired,
};
