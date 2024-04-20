import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserName } from './profileSlice'
import InputBlock from '../../components/InputBlock'

const Profile = () => {

  const [isEditMode, setIsEditMode] = useState(false)
  const [profileUserName, setProfileUserName] = useState("")

  const {userName, firstName, lastName, status} = useSelector(state =>state.profile)
  const bearerToken = useSelector(state => state.login.token)
  
  const dispatch = useDispatch()

  const canUpdate = profileUserName && status !== 'loading'

  const onUserNameChangeSubmited = async (e) => {
    e.preventDefault()
    if(canUpdate) {
      try{
        await dispatch(fetchUserName([bearerToken, profileUserName])).unwrap()
      } catch(err) {
        console.error('Failed to login: ', err)
      }
    }
  }

  return (
    <>
    {
      isEditMode ?
        <>
          <h1>Edit user info</h1>
          <form onSubmit={onUserNameChangeSubmited}>
            <InputBlock
              classes="input-wrapper"
              type="text"
              id="username"
              label="User name:"
              val={profileUserName}
              placeholder={`Change "${userName}" to ?`}
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
            <div className="in-row">
              <button className="edit-button" type="submit" onClick={() => {}}>Submit</button>
              <button className="edit-button" onClick={() => {
                setProfileUserName("")
                setIsEditMode(false)
              }}>Cancel</button>
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