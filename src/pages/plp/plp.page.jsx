import React, { Component } from "react";
import "./plp.styles.sass";

import Categoryitem from "../../components/category-item/category-item.component";
import { useQuery, gql } from "@apollo/client";
import { connect } from "react-redux";
import { pushDescription } from "../../redux/product-description/pd.actions";
import { selectCategory } from "../../redux/category/category.selectors";

class Plp extends Component {
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

    const describe = (product) => {
      this.props.pushDescription(product);
    };
    
    

    function ProductListingPage(cat) {
      const categoryName = cat === undefined ? "all" : cat.cat;
      const { loading, error, data } = useQuery(CATEGORY_ITEMS_QUERY, {
        variables: { categoryName: categoryName },
      });

      if (loading) return "Loading...";
      if (error) {
        return "Error";
      }
      return (
        <div className="productListPageContainer">
          <h2 className="productListHeader" >{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
          <div className="productListPage">
            {data?.category.products.map((i) => (
              <Categoryitem info={i} click={() => describe(i)} key={i.id} />
            ))}
          </div>
        </div>
      );
    }

    return <ProductListingPage cat={this.props.category.toLowerCase()} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  pushDescription: (product) => dispatch(pushDescription(product)),
});

const mapStateToProps = (state) => ({
  category: selectCategory(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Plp);
