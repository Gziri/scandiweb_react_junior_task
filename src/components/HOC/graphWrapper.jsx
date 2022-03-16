import React from "react";
import { useQuery, gql } from "@apollo/client";

export const graphWrapper = (WrappedComponent) => (props) => {
  const PRODUCT_TO_DESCRIBE_QUERY = gql`
    query GetProductToDescribeByID($id: String!) {
      product(id: $id) {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  `;
  const { loading, error, data } = useQuery(PRODUCT_TO_DESCRIBE_QUERY, {
    variables: { id: props.desc },
  });

  if (loading) return "Loading...";
  if (error) {
    return "Error";
  }

  return <WrappedComponent {...props} product={data?.product} />;
};
