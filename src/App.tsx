import React from 'react';
import Receipt from './Receipt';
import receiptData from "./receiptData"
const App: React.FC = () => {
  return (
    <div className="App">
      Number of Receipts: {receiptData.length}
      { receiptData.map(singleReceipt => <Receipt receipt={singleReceipt} />) }
    </div>
  );
}

export default App;
