import React from "react";
import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./home.css";

const FaqItem = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="faq-list">
      <div className="col-12 col-sm-10 col-lg-9">
        <div className="accordion faq-accordian" id="faqAccordion">
          <div className="card border-0 wow fadeInUp">
            <div className="card-header" onClick={() => setIsActive(!isActive)}>
              <h6 className="mb-0 collapsed">
                {title}
                <div>{isActive ? <IoIosArrowUp /> : <IoIosArrowDown className="arrowdown" />}</div>
              </h6>
            </div>
            {isActive && <div className="card-body">{content}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
