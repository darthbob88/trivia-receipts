import React from "react";
import "./App.css";
import Receipt from "./Receipt";
import { receiptData } from "./receiptData";
import html2canvas from "html2canvas";

type ReceiptData = (typeof receiptData)[number];

const App: React.FC = () => {
  const [singleReceipt, setSingleReceipt] = React.useState<ReceiptData>(
    receiptData[0],
  );

  const updateReceiptField = (
    field: Exclude<keyof ReceiptData, "items">,
    value: string,
  ) => {
    setSingleReceipt((receipt) => ({ ...receipt, [field]: value }));
  };

  const updateReceiptItem = (
    index: number,
    field: "name" | "price",
    value: string,
  ) => {
    setSingleReceipt((receipt) => ({
      ...receipt,
      items: receipt.items.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [field]: field === "price" ? Number(value) : value }
          : item,
      ),
    }));
  };

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
      <label htmlFor="receipt-selection">Receipt to edit</label>
      <select id="receipt-selection" value={singleReceipt.answer}>
        {receiptData.map((receipt, index) => (
          <option
            key={receipt.answer}
            value={receipt.answer}
            onClick={() => setSingleReceipt(receipt)}
          >
            {receipt.answer}
          </option>
        ))}
      </select>

      <form>
        <label>
          Trivia answer
          <input
            required
            value={singleReceipt.answer}
            onChange={(event) =>
              updateReceiptField("answer", event.currentTarget.value)
            }
          />
        </label>
        <label>
          Store name
          <input
            required
            value={singleReceipt.storeName}
            onChange={(event) =>
              updateReceiptField("storeName", event.currentTarget.value)
            }
          />
        </label>
        <label>
          Location
          <input
            required
            value={singleReceipt.location}
            onChange={(event) =>
              updateReceiptField("location", event.currentTarget.value)
            }
          />
        </label>
        <label>
          Date
          <input
            required
            value={singleReceipt.date}
            onChange={(event) =>
              updateReceiptField("date", event.currentTarget.value)
            }
          />
        </label>
        <label>
          Currency
          <input
            required
            value={singleReceipt.currency}
            onChange={(event) =>
              updateReceiptField("currency", event.currentTarget.value)
            }
          />
        </label>

        <fieldset>
          <legend>Items</legend>
          {singleReceipt.items.map((item, index) => (
            <div key={index}>
              <label>
                Item {index + 1} name
                <input
                  required
                  value={item.name}
                  onChange={(event) =>
                    updateReceiptItem(index, "name", event.currentTarget.value)
                  }
                />
              </label>
              <label>
                Item {index + 1} price
                <input
                  required
                  min="0"
                  type="number"
                  value={item.price}
                  onChange={(event) =>
                    updateReceiptItem(index, "price", event.currentTarget.value)
                  }
                />
              </label>
              <button
                type="button"
                onClick={() =>
                  setSingleReceipt((receipt) => ({
                    ...receipt,
                    items: receipt.items.filter(
                      (_, itemIndex) => itemIndex !== index,
                    ),
                  }))
                }
              >
                Remove item
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setSingleReceipt((receipt) => ({
                ...receipt,
                items: [...receipt.items, { name: "", price: 0 }],
              }))
            }
          >
            Add item
          </button>
        </fieldset>
      </form>
      <Receipt receipt={singleReceipt} />
    </div>
  );
};

export default App;
