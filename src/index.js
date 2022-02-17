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

import { BrowserRouter } from "react-router-dom";

import { resolvers, typeDefs } from "./graphQL/resolvers";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  typeDefs,
  resolvers
});

let data = "";
// client
//   .query({
//     query: gql`
//       query {
//         categories {
//           name
//           products {
//             id
//             name
//             brand
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

client.writeData({
  data: {
    cartHidden: true,
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App data={data} />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
