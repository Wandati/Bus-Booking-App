import React from "react";

function Payment() {
  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Please Confirm Your Payment Here</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Phone Number
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=""
          />
        </div>
        <button className="btn btn-success mb-5">Confirm Payment</button>
      </form>
    </div>
  );
}

export default Payment;
