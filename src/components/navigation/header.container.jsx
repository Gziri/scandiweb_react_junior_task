import React from "react";

import { Query } from "@apollo/client/react/components";

import { gql } from "@apollo/client";

import { Header } from "./header.component";
import { render } from "@testing-library/react";

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const headerContainer = () => {
    
  <Query query={GET_CART_HIDDEN}>
    {({ data: { cartHidden } }) => <Header hidden={cartHidden} />}
  </Query>
};

export default headerContainer;
