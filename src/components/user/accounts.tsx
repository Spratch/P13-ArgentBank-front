export default function Accounts() {
  const accounts = [
    { id: 1, title: "Argent Bank Checking (x8349)", amount: "$2,082.79" },
    { id: 2, title: "Argent Bank Savings (x6712)", amount: "$10,928.42" },
    { id: 3, title: "Argent Bank Credit Card (x8349)", amount: "$184.30" }
  ];

  return (
    <>
      {accounts.map((account, index) => (
        <section
          key={index}
          className="account"
        >
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </>
  );
}
