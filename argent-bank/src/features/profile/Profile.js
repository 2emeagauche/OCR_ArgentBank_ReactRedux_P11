import { useState } from 'react'
import { useSelector } from 'react-redux'
import InputBlock from '../../components/InputBlock'

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
            <InputBlock
              classes="input-wrapper"
              type="text"
              id="username"
              label="User name:"
              val={profileUserName}
              disabled={false}
              onChange={(e) => setProfileUserName(e.target.value)}
            />
            <InputBlock
              classes="input-wrapper"
              type="text"
              id="firstname"
              label="First name:"
              val={firstName}
              disabled={true}
              onChange={() => {}}
            />
            <InputBlock
              classes="input-wrapper"
              type="text"
              id="lastname"
              label="Last name:"
              val={lastName}
              disabled={true}
              onChange={() => {}}
            />
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