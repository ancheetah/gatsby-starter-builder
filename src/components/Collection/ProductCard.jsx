import React, { useState, useEffect } from 'react';

export const ProductCard = props => {
  const { id } = props;
  const [product, setProduct] = useState(false);
  const [description, setDescription] = useState(false);
  const {
    title,
    handle,
    image,
    variants = []
  } = product || {};

  const { price, compare_at_price } = variants[0] || {};
  const { src, alt = '' } = image || {};

  useEffect(() => {
    if (id) {
      fetch(`https://cdn.builder.io/api/v1/shopify/products/${id}.json?apiKey=6117a497b395429c9013fca36d3f7360`)
        .then(res => res.json())
        .then(p => setProduct(p.product))
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`https://cdn.builder.io/api/v1/shopify/products/${id}/metafields.json?apiKey=6117a497b395429c9013fca36d3f7360`)
        .then(res => res.json())
        .then(p => {
          if (p.metafields && p.metafields.length) {
            p.metafields.forEach(e => {
              if (e.key === "builder_desc") {
                setDescription(e.value)
              };
            })
          };
        });
    };
  }, [product]);

  return (
    <li className="Collection__product-card">
      <div className="Collection__product-card-image">
        <img src={src} alt={alt ? alt : title}></img>
      </div>

      <h5 className="Collection__product-card-title">{title}</h5>
      {description
        ? <p>{description}</p>
        : ""
      }

      <div className="Collection__product-card-bottom">
        <p className="Collection__product-card-price">
          {compare_at_price ? <span className="Collection__product-compare">Starting At&nbsp;</span> : ""}
          {compare_at_price ? <span className="Collection__product-compare-price">${compare_at_price}&nbsp;</span> : ""}
          <span className={`${compare_at_price ? "compare_at_price" : ""}`}>${price}</span>
        </p>
        <a className="Collection__product-card-details" href={`https://relaxtheback.com/products/${handle}`}>
          <p>See more details</p>
        </a>
      </div>
    </li>
  );
};
