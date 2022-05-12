import React, { useState, useEffect, useRef } from 'react';
import { Filters } from './Filters';
import { CollectionList } from './CollectionList';
// import leftCaret from '../../assets/leftCaret.svg';


export const Collection = props => {
  const {
    location,
    footerHeader,
    footerSubheader,
    links = [],
    products,
    description
  } = props;
  const productsList = products?.value?.data?.products;
  const name = products?.value?.data?.name;
  const [width, setWidth] = useState(0);
  const [showDesc, setShowDesc] = useState(true);

  const breadcrumbLink = useRef(null);
  const backLink = useRef(null);

  useEffect(() => {
    const pathname = window.location.pathname.split("/");
    const current = pathname[1];

    breadcrumbLink.current.href = `/${current}`;
    backLink.current.href = `/${current}`;
  }, []);


  useEffect(() => {
    const w = () => setWidth(window.innerWidth);
    w();

    if (width < 991) {
      setShowDesc(false);
    };

    window.addEventListener('resize', w);
    return () => window.removeEventListener('resize', w);
  }, [width]);

  return (
    <div className="Collection">
      <div className="container">
        <p className="Collection__breadcrumbs"> <a ref={breadcrumbLink} href="/">{location}</a> / {name}</p>

        <a className="Collection__backLink" href="/" ref={backLink}>&lt;&nbsp;Back to store</a>
        <h6>VIEW ALL CATEGORIES</h6>

        <Filters location={location} width={width} links={links} />

        <h1>{name}</h1>
        {description !== "<p><br></p>" ?
          width > 991
            ? <div dangerouslySetInnerHTML={{ __html: description }} className="Collection__description"></div>
            : <div className={`Collection__description--mobile ${showDesc ? "show" : "hide"}`}>
              <div dangerouslySetInnerHTML={{ __html: description }} className="Collection__description"></div>
              {!showDesc ? <span id="read-more" onClick={() => setShowDesc(true)}>...Read More</span> : ""}
            </div>
          : ""
        }

        <CollectionList products={productsList} />
      </div>
      {
        footerHeader || footerSubheader
          ? <div className="Collection__visit-us">
            <h4>{footerHeader}</h4>
            <p>{footerSubheader}</p>
          </div>
          : ""
      }
    </div>
  );
};
