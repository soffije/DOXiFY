import React from "react";
import "./ContactUS.css";
import myImage from "../images/152.png";
function ContactUs() {
  return (
    <>
      <h2 className="text-center my-5" style={{ color: "white" }}>
        Contact
      </h2>
      <section className="my-5">
        <div className="row">
          <div className="col-6 d-flex align-items-center">
            <img src={myImage} style={{ width: "100%", height: "auto%" }} />
          </div>
          <div className="col-4 d-flex flex-column justify-content-center shadow pb-5 bg-white rounded">
            <div>
              <p>First name:</p>
              <input></input>
            </div>
            <div>
              <p>Last name:</p>
              <input></input>
            </div>
            <div>
              <p>What is your email?:</p>
              <input></input>
            </div>
            <div>
              <p>Your question:</p>
              <input></input>
            </div>
            <button>Send message</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
