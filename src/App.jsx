import { useState } from "react";
import itemData from "./items.json";
import FinalList from "./components/FinalList";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputStates, setInputStates] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showFinalList, setShowFinalList] = useState(false);

  const handleToggle = (itemName) => {
    const isSelected = selectedItems.find((item) => item.name === itemName);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((item) => item.name !== itemName));
    } else {
      const { quantity = "", unit = "" } = inputStates[itemName] || {};
      setSelectedItems([...selectedItems, { name: itemName, quantity, unit }]);
    }
  };

  const handleInputChange = (itemName, key, value) => {
    setInputStates((prev) => ({
      ...prev,
      [itemName]: {
        ...prev[itemName],
        [key]: value,
      },
    }));

    setSelectedItems((prev) =>
      prev.map((item) =>
        item.name === itemName ? { ...item, [key]: value } : item
      )
    );
  };

  const handleCopy = () => {
    const text = selectedItems
      .map(
        ({ name, quantity, unit }) =>
          `${getHindiName(name)} - ${quantity || "?"} ${unit || ""}`
      )
      .join("\n");

    navigator.clipboard.writeText(text);
  };

  const getHindiName = (eng) => {
    for (const category in itemData) {
      if (itemData[category][eng]) {
        return itemData[category][eng];
      }
    }
    return eng;
  };

  const formatCategory = (name) => {
    return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <h1>Catering Ingredient Selector</h1>

        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {Object.entries(itemData).map(([category, items]) => {
          // Filter items based on search query
          const filteredItems = Object.entries(items).filter(
            ([eng, hindi]) =>
              eng.toLowerCase().includes(searchQuery.toLowerCase()) ||
              hindi.includes(searchQuery)
          );

          return (
            <div key={category}>
              <h3
                style={{
                  marginTop: "30px",
                  color: "#444",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "4px",
                }}
              >
                {formatCategory(category)}
              </h3>

              <div className="item-grid">
                {(searchQuery ? filteredItems : Object.entries(items)).map(
                  ([eng, hindi]) => (
                    <div key={eng} className="item-card">
                      <div className="item-header">
                        <div>
                          <strong>{eng}</strong>
                          <div className="hindi">{hindi}</div>
                        </div>
                        <button
                          onClick={() => handleToggle(eng)}
                          className={
                            selectedItems.find((item) => item.name === eng)
                              ? "remove-btn"
                              : "add-btn"
                          }
                        >
                          {selectedItems.find((item) => item.name === eng)
                            ? "Remove"
                            : "Add"}
                        </button>
                      </div>

                      {selectedItems.find((item) => item.name === eng) && (
                        <div className="inputs">
                          <input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Quantity"
                            value={inputStates[eng]?.quantity || ""}
                            onChange={(e) =>
                              handleInputChange(eng, "quantity", e.target.value)
                            }
                          />

                          <select
                            value={inputStates[eng]?.unit || ""}
                            onChange={(e) =>
                              handleInputChange(eng, "unit", e.target.value)
                            }
                          >
                            <option value="">Select Unit</option>
                            <option value="grams">Grams</option>
                            <option value="kg">Kilograms</option>
                            <option value="पैकेट">पैकेट</option>
                            <option value="लीटर">लीटर</option>
                            <option value="पीपा">पीपा</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      <FinalList
        selectedItems={selectedItems}
        setShowFinalList={setShowFinalList}
        showFinalList={showFinalList}
        handleToggle={handleToggle}
        handleCopy={handleCopy}
        getHindiName={getHindiName}
      />

      <footer className="footer">
        <button onClick={() => setShowFinalList(true)}>View Final List</button>
      </footer>
    </div>
  );
}

export default App;
