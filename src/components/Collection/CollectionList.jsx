import React, { Fragment, useRef, useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import Pagination from './Pagination';

export const CollectionList = props => {
  const { products } = props;

  const SCROLL_REF = useRef(null);
  const INITIAL_PAGE = 1;
  const PAGE_LENGTH = 12;
  const [page, setPage] = useState(INITIAL_PAGE);

  useEffect(() => {
    setPage(INITIAL_PAGE);
  }, [products]);

  const paginate = () => {
    let newProductSet = [...products];
    return newProductSet.slice(
      (page - 1) * PAGE_LENGTH,
      page * PAGE_LENGTH < newProductSet.length ? page * PAGE_LENGTH : newProductSet.length,
    );
  };

  const getDecodedProductId = (e, i) => {
    const regex = /^(gid):\/\/(shopify)\/(Product)\/([0-9].*)/;
    const decodedCartId = atob(e);
    const [id] = decodedCartId.match(regex).slice(i);

    return id;
  };

  const handleProducts = (p = []) => {
    return p.length > 0 ? (
      p.map((product, index) => {
        return (<ProductCard key={index} id={getDecodedProductId(product, -1)} />)
      })
    ) : (
        <h3>No products</h3>
      );
  };


  return (
    <Fragment>
      <span>Showing {products && products.length} Products</span>
      <a ref={SCROLL_REF}></a>
      <ul className="Collection__list">
        {products && products.length && handleProducts(paginate())}
      </ul>
      <Pagination
        defaultPage={page}
        pageLength={PAGE_LENGTH}
        itemTotal={products && products.length}
        onChange={setPage}
        scrollRef={SCROLL_REF}
      />
    </Fragment>
  );
};
