import { useSelector } from 'react-redux'

const Profile = () => {

  const {firstName, lastName} = useSelector(state =>state.profile)

  return (
    <>
      <h1>Welcome back<br />{firstName} {lastName}!</h1>
      <button className="edit-button">Edit Name</button>
    </>
  )
}

export default Profile