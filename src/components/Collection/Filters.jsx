import React, { useEffect, useState } from 'react';
import DownCaret from '../../assets/DownCaret.svg';

export const Filters = props => {
  const { links, width, location } = props;
  const [currPath, setCurrPath] = useState('');

  useEffect(() => {
    setCurrPath(window.location.pathname);
  }, []);

  return (
    width > 991 ?
      <ul className="Collection__filters">
        {
          links.map((val, index) => {
            const url = val?.link?.value?.data?.url
            const name = val?.link?.value?.data?.name
            const isProductPageLink = val?.link?.value?.data?.isProductPageLink
            const linkPath = '/' + currPath?.split('/')[1] + url


            return (
              <li className="Collection__filters-item" key={index}>
                <a href={isProductPageLink ? url : linkPath} className={currPath === linkPath ? "selected" : ""}>{name} {location}</a>
              </li>
            )
          })
        }
      </ul>
      :
      <div className="Collection__filters-dropdown-container">
        <div className="Collection__filters-dropdown-container-caret">
          <img src={DownCaret}></img>
        </div>
        <label htmlFor="filters" hidden></label>
        <select
          className="Collection__filters-dropdown"
          name="filters"
          id="filters"
          onChange={e => window.location = e.currentTarget.value}
        >
          {
            links.map((val, index) => {
              const url = val?.link?.value?.data?.url
              const name = val?.link?.value?.data?.name
              const isProductPageLink = val?.link?.value?.data?.isProductPageLink
              const linkPath = '/' + currPath?.split('/')[1] + url
              return (
                <option key={index} selected={currPath === linkPath} value={isProductPageLink ? url : linkPath}>{name} {location}</option>
              )
            })
          }
        </select>
      </div>
  );
};
