import React, { useState } from "react";

const Form = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="mt-5 my-4 d-flex justify-content-center align-items-center gap-3 ">
      <input
        className="form-check-input"
        id="terms"
        type="checkbox"
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <div className="terms-box">
        <p style={{visibility:isHover?"visible":"hidden"}}>Size gerçekten bir şey teslim etmeyeceğiz</p>
        <label className="" htmlFor="terms">
          Koşulları okudun kabul ediyorum
        </label>
      </div>

      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        disabled={!isChecked}
        className="btn btn-primary"
      >
        Siparişi Onayla
      </button>
    </div>
  );
};

export default Form;
