import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    // fetch("/config").then(async (r) => {
    fetch("mido/products").then(async (r) => {
      const { products } = await r.json();
      console.log("first", products);
      setProducts(products);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Buy Products Here</h2>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <br />
        {products?.map((product, i) => {
          return (
            <div style={{ padding: "50px" }}>
              <div style={{ width: "100%" }}>
                <h3>{product?.title}</h3>
                <h3>{product?.description}</h3>
                <h3>
                  <strong>${product?.price}</strong>
                </h3>
                <br />
              </div>
              <button>Buy now</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
