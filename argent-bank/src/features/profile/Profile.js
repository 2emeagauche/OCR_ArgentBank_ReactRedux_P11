import { useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const {userName, firstName, lastName} = useSelector(state =>state.profile)

  const [isEditMode, setIsEditMode] = useState(false)
  const [profileUserName, setProfileUserName] = useState(userName)


  return (
    <>
    {
      isEditMode ?
        <>
          <h1>Edit user info</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">User name:</label>
              <input type="text" id="username" value={profileUserName} onChange={(e) => setProfileUserName(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstname">First name</label>
              <input type="text" id="firstname" value={firstName} disabled />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastname">Last name</label>
              <input type="text" id="lastname" value={lastName} disabled />
            </div>
          </form>
        </>
      :
        <>
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          <button className="edit-button" onClick={() => {setIsEditMode(true)}}>Edit Name</button>
        </>
      }
    </>
  )
}

export default Profile