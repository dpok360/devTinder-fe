const UserCard = ({ user }) => {
  const { firstName, lastName, emailId, age, photoUrl, about, gender } =
    user?.users[0];

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="user phot" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-serif">{firstName + ' ' + lastName}</h2>
        {age && gender && <p>{age + ',' + gender}</p>}
        <p className="font-sans">{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-outline btn-error">Ignore</button>
          <button className="btn btn-outline btn-success">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
