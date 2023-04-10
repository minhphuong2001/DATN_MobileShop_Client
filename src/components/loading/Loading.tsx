import React from "react";
import "./loading.scss";
import PropTypes from "prop-types";

Loading.propTypes = {
  backgroundColor: PropTypes.string,
};

Loading.defaultProps = {
  backgroundColor: "white",
};
export default function Loading(props: any) {
  const { backgroundColor } = props;

  return (
    <div className="Loading">
      <div className="bounce1" style={{ backgroundColor }}></div>
      <div className="bounce2" style={{ backgroundColor }}></div>
      <div className="bounce3" style={{ backgroundColor }}></div>
    </div>
  );
}
