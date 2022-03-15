import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});


const FIRST_QUERY = gql`
  query GetCategories{
    categories {
      name
      products {
        prices {
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

function AppComponentApolloWrapper() {
  const { loading, error, data } = useQuery(FIRST_QUERY);

  if (loading) return "Loading...";
  if (error) return error;
  return <App data={data} />;
}

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppComponentApolloWrapper />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
