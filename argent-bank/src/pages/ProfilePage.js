import Profile from "../features/profile/Profile"
import AccountSlot from "../components/AccountSlot"

const ProfilePage = () => {
  return (
    <main className="main bg-dark">
      <div className="header">
        <Profile />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountSlot acountType="Checking" accountTrailingId="8349" accountAmount="2,082.79" balanceType="Available" />
      <AccountSlot acountType="Savings" accountTrailingId="6712" accountAmount="10,928.42" balanceType="Available" />
      <AccountSlot acountType="Credit Card" accountTrailingId="8349" accountAmount="184.30" balanceType="Current" />
    </main>
  )
}

export default ProfilePage