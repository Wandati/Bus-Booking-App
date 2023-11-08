import React from "react";
import { Link } from "react-router-dom";
function ADasboard() {
  return (
    <div className="container text-center">
      <h1 className="mt-4">Welcome Admin!</h1>
      <Link className="btn btn-outline-dark m-2" to="/users">
        View Users
      </Link>
      <Link className="btn btn-outline-dark" to="/ad_routes">
        View Routes
      </Link>
    </div>
  );
}

export default ADasboard;
