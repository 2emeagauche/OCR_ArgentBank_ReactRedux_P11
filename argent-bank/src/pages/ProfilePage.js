import AccountSlot from "../components/AccountSlot"

const ProfilePage = () => {
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountSlot acountType="Checking" accountTrailingId="8349" accountAmount="2,082.79" balanceType="Available" />
      <AccountSlot acountType="Savings" accountTrailingId="6712" accountAmount="10,928.42" balanceType="Available" />
      <AccountSlot acountType="Credit Card" accountTrailingId="8349" accountAmount="184.30" balanceType="Current" />
    </main>
  )
}

export default ProfilePage