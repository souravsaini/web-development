import React from "react";
import { ProductConsumer } from "../context";
import {Link} from "react-router-dom";
import Button from "./Button";

class Details extends React.Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {id, company, img, info, price, title, inCart} = value.detailProduct;
          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1> {title} </h1>
                </div>
              </div>
              {/* end of title */}
              {/* product info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="product" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2> model : {title} </h2>
                  <h4 className="text-title text-uppercase text-muted mb-2 mt-3"> made by :
                    <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price: <span>$</span>{price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about the Product
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/*buttons*/}
                  <div>
                    <Link to ="/">
                      <Button>back to products</Button>
                    </Link>
                    <Button
                      cart
                      disabled={inCart? true: false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "inCart" : "add to cart"}
                    </Button>
                  </div>
                </div>
              </div>
              {/* end of product info */}
            </div>
          )
        }}
      </ProductConsumer>
    )
  }
}

export default Details;
