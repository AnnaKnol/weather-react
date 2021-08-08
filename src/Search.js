import React from "react";

import "./Search.css";

export default function Search() {
  return (
    <div className="Search row">
      <div className="col-7">
        <form id="search_form">
          <input
            type="search"
            id="type_city"
            className="form-control"
            placeholder="Type city..."
            autocomplete="off"
            autofocus="on"
          />
        </form>
      </div>
      <div className="col-5 current-location">
        <form id="current_location_form">
          <input
            type="submit"
            id="cur_loc_btn"
            className="btn btn-outline"
            value="current location"
          />
        </form>
      </div>
    </div>
  );
}
