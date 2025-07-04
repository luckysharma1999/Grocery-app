import React from "react";

export default function FinalList({
  selectedItems,
  setShowFinalList,
  showFinalList,
  handleToggle,
  handleCopy,
  getHindiName,
}) {
  return (
    <>
      {showFinalList && (
        <div className="final-list-popup">
          <div className="final-list-box">
            <div className="final-list-header">
              <h2>Final Selected Items</h2>
              <button
                className="close-btn"
                onClick={() => setShowFinalList(false)}
              >
                ✕
              </button>
            </div>

            <div className="final-list-content">
              <ul className="final-list">
                {selectedItems.length === 0 ? (
                  <li>No items selected</li>
                ) : (
                  selectedItems.map(({ name, quantity, unit }) => (
                    <li key={name} className="final-list-item">
                      <span>
                        {getHindiName(name)} - {quantity || "?"} {unit || ""}
                      </span>
                      <button
                        className="remove-btn"
                        onClick={() => handleToggle(name)}
                        title="Remove item"
                      >
                        Remove
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {selectedItems.length > 0 && (
              <div className="final-list-footer">
                <button className="copy-btn" onClick={handleCopy}>
                  Copy List
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
