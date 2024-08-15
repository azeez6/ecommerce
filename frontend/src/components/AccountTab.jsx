const AccountTab = ({ userInfo, logout }) => {
    return (
      <>
      <div className="max-w-md">
        <div className=" mb-4">
          <strong>Name:</strong> {userInfo.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {userInfo.email}
        </div>
        {userInfo.imageUrl && (
          <img src={userInfo.imageUrl} alt={userInfo.name} className="w-full h-48 object-cover" />
        )}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-full"
        >
          Logout
        </button>
        </div>
      </>
    );
  };
  
  export default AccountTab;
  