import React from "react";
import Receipt from "./Receipt";
import { receiptData } from "./receiptData";
import html2canvas from "html2canvas";
const App: React.FC = () => {
  const [singleReceipt, setSingleReceipt] = React.useState<any>(receiptData[0]);
  const exportReceipt = () => {
    const listOfReceipts: any = document.getElementsByClassName("receipt");
    console.log(`Exporting ${listOfReceipts.length} receipts`);
    for (let receipt of listOfReceipts) {
      html2canvas(receipt, {
        width: 450,
        allowTaint: true,
      }).then(function (canvas) {
        const parentNode = receipt.parentNode;
        parentNode.replaceChild(canvas, receipt);
      });
    }
  };
  return (
    <div className="App">
      <button onClick={exportReceipt}>Export receipts</button>
      <br />
      <select>
        {receiptData.map((receipt) => (
          <option
            key={receipt.answer}
            value={receipt.answer}
            onClick={() => setSingleReceipt(receipt)}
          >
            {receipt.answer}
          </option>
        ))}
      </select>

      <Receipt receipt={singleReceipt} />
    </div>
  );
};

export default App;
