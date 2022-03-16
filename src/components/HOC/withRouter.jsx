import React from "react";
import { useLocation } from "react-router-dom";

export const withRouter = (WrappedComponent) => (props) => {
  const params = useLocation();

  return <WrappedComponent {...props} location={params} />;
};
