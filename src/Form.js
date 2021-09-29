import React from "react";

export default function Form(props) {
  return (
    <div className="Form row">
      <div className="col-sm-8 col-md-7">
        <form onSubmit={props.handleSubmit}>
          <input
            type="search"
            id="search_form"
            className="form-control"
            placeholder="Type city..."
            autoComplete="off"
            onChange={props.handleCityChange}
          />
        </form>
      </div>
      <div className="col-12 col-sm-4 col-md-5 current-location">
        <form onSubmit={props.getCurrentLocation}>
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
