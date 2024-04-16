const AccountSlot = ({acountType, accountTrailingId, accountAmount, balanceType}) => {
  return(
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank {acountType} (x{accountTrailingId})</h3>
        <p className="account-amount">${accountAmount}</p>
        <p className="account-amount-description">{balanceType} Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}

export default AccountSlot