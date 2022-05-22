import React, { useEffect, useRef, useState } from "react";
// import { Container } from "react-bootstrap";
import "./Bond.css";
import { Modal, Button, Container } from "react-bootstrap";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Card } from "reactstrap";

import hug from "../../src/assets/images/hug.png";
import Vector from "../../src/assets/images/vectorblue.png";
import Usdc from "../../src/assets/images/usdc.png";
import  Usdt from "../../src/assets/images/usdt.png";
import Dai from "../../src/assets/images/dai.png";
import "./Popup.css";
// import "./Step1.css";

let skills = [
  { img: hug, curr: "HUG" },
  { img: Vector, curr: "ETH" },
  { img: Usdc , curr: "USDC" },
  { img: Usdt, curr: "USDT" },
  { img: Dai, curr: "DAI" },
  // "HUG", "ETH", "USDC", "USDT", "DAI",
];
function PopupModal() {
  console.log("Popup");

  const [smShow, setSmShow] = useState(false);
  //   const [searchValue, setSearchValue] = useState("")

  const [selectedSkill, setSelectedSkill] = useState("");
  const [dropdownSearchValue, setDropdownSearchValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dropdownRef = useRef();

  /**
   * Close the dropdown when clicked outside
   * Refer https://www.codingdeft.com/posts/react-on-click-outside/ for details
   */
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        editMode &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setEditMode(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [editMode]);

  const skillSelectionHandler = (skill) => {
    setSelectedSkill(skill.curr);
    setDropdownSearchValue("");
    setEditMode(false);
  };

  const filteredSkills = skills.filter((skill) =>
    skill.curr.match(new RegExp(dropdownSearchValue, "i"))
  );
  return (
    <>
      <Button onClick={() => setSmShow(true)}>Popup</Button>{" "}
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Card className="card-popup">
          <Container>
            <div className="main-popup">
              <h2 className="token_sel">Select TOKEN</h2>

              {editMode ? (
                // display the dropdown when the input us focused
                <div ref={dropdownRef} className="dropdown-wrapper">
                  <input
                    className="dropdown-input"
                    name="dropdown-input"
                    autoFocus
                    onChange={(e) => setDropdownSearchValue(e.target.value)}
                    value={dropdownSearchValue}
                    placeholder="Search name or enter address"
                  />
                  <div className="dropdown-list">
                    <ul>
                      {filteredSkills.map((skill) => {
                        return (
                          <>
                            <li
                              key={skill.curr}
                              onClick={() => skillSelectionHandler(skill)}
                            >
                              <img
                                src={skill.img}
                                alt="Happy Emoticons"
                                className="demoimg" 
                              />
                              {skill.curr}{" "}
                              
                              
                              
                            </li>
                           
                              
                          </>
                        );
                      })}
                      {filteredSkills.length === 0 && (
                        <li className="no-result">No results found</li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <input
                  // Grey out the text when "Select Primary skill" input hint is shown
                  className={`dropdown-search ${
                    !(dropdownSearchValue || selectedSkill) && "default"
                  }`}
                  onFocus={() => setEditMode(true)}
                  // Display the selected skill or "Select Primary skill" input hint
                  value={selectedSkill || "Search name or enter address"}
                />
              )}
            </div>
          </Container>
        </Card>

        {/* </Modal.Body> */}
      </Modal>
    </>
  );
}

export default PopupModal;
