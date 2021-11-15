import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 550px)").matches
  );
  const [smallMatches, setSmallMatches] = useState(
    window.matchMedia("(min-width: 375px)").matches
  );

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    window
      .matchMedia("(min-width: 550px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    const handler = (e) => setSmallMatches(e.matches);
    window
      .matchMedia("(min-width: 375px)")
      .addEventListener("change", (e) => setSmallMatches(e.matches));
  }, []);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    window
      .matchMedia("(min-height: 750px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const Bold = ({ children }) => (
    <text style={{ fontWeight: 600 }}>{children}</text>
  );

  return (
    <div className={matches ? "Unsubscribe_App_Tall" : "Unsubscribe_App_Small"}>
      <div className={matches ? "Container_Tall" : "Container_Small"}>
        <div className="Survey_Container container_bottom_margin">
          <h1>teamfloral</h1>
          {!unsubscribed ? (
            <>
              <div className="unsubscribe_text_container">
                <h3 className={matches ? "h3_large" : "h3_small"}>
                  We're sad to see you go!
                </h3>
                <text className={matches ? "text_large" : "text_small"}>
                  Click below to unsubscribe from all future marketing emails
                  from Teleflorist.
                </text>
              </div>
              <button
                className="unsubscribe_button button_large"
                onClick={() => setUnsubscribed(true)}
              >
                Unsubscribe
              </button>
            </>
          ) : (
            <>
              <div className="unsubscribe_text_container">
                <h3 className={matches ? "h3_large" : "h3_small"}>
                  We miss you already!
                </h3>
                <text className={matches ? "text_large" : "text_small"}>
                  You've successfully unsubscribed from all future emails from
                  Teleflorist! Please allow{" "}
                  <text style={{ fontWeight: "bold" }}>
                    7 - 10 business days{" "}
                  </text>
                  for this to fully take effect.
                </text>
              </div>
              <div className="button_placeholder_large" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
