import React, { Component } from "react";
import "./plp.styles.sass";

import Categoryitem from "../../components/category-item/category-item.component";
import { useQuery, gql } from "@apollo/client";
import { connect } from "react-redux";
import { pushDescription } from "../../redux/product-description/pd.actions";
import { selectCategory } from "../../redux/category/category.selectors";

class Plp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  render() {
    const CATEGORY_ITEMS_QUERY = gql`
      query GetCategoryItems($categoryName: String!) {
        category(input: { title: $categoryName }) {
          name
          products {
            id
            name
            brand
            inStock
            gallery
            description
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
          }
        }
      }
    `;

    const describe = (productID) => {
      this.props.pushDescription(productID);
    };

    function QueryCategories(q, c) {
      const { data } = useQuery(q, {
        variables: { categoryName: c },
      });

      return data;
    }

    function ProductListingPage(cat) {
      const categoryNames = ["tech","clothes"];
      const categories = categoryNames.map((cat) =>
        QueryCategories(CATEGORY_ITEMS_QUERY, cat)
      );

      if (categories.indexOf(undefined) > -1) {
        return <div>"Loading..."</div>;
      }

      const plpContent = categories.map((category) => {
        const categoryItem = category.category;
        if (cat.cat !== "all" && category.category.name !== cat.cat) {
          return <div key={Math.random(0,1)} />;
        }

        return (
          <div className="productListPageContainer" key={category.category.name+Math.random(0,1)}>
            <h2 className="productListHeader">
              {categoryItem.name.charAt(0).toUpperCase() +
                categoryItem.name.slice(1)}
            </h2>
            <div className="productListPage">
              {categoryItem.products.map((i) => (
                <Categoryitem
                  info={i}
                  click={() => describe(i.id)}
                  key={i.id}
                />
              ))}
            </div>
          </div>
        );
      });

      return [...plpContent];
    }

    return <ProductListingPage cat={this.props.category} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  pushDescription: (product) => dispatch(pushDescription(product)),
});

const mapStateToProps = (state) => ({
  category: selectCategory(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Plp);
