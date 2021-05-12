import React from "react";
export default (props) => {
  return (
    <nav className="navbar bg-dark justify-content-center">
      <form className="form-inline m-2">
        <input
          className="form-control"
          value={props.value}
          onChange={props.handleInputChange}
          placeholder="Search"
        />
      </form>
    </nav>
  );
};
