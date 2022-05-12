import React, { useCallback, useEffect, useMemo, useState } from 'react';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LENGTH = 48;
const DEFAULT_SCROLL_EFFECT = true;
const PAGE_DOTS_SYMBOL = '...';

const PaginationItem = ({ index, selected, onClick }) => {
  const value = index + 1;
  const onClickHandler = useCallback(() => {
    if (typeof onClick === 'function') onClick(index);
  }, [index]);
  return (
    <button
      value={value}
      className={`Pagination-item Btn ${selected ? "is-selected" : ""}`}
      onClick={onClickHandler}>{value}
    </button>
  );
};

const PaginationItemList = ({ position, paginationNumbers, onClick, scrollRef }) => {
  const items = useMemo(() => {
    if (!paginationNumbers || !Array.isArray(paginationNumbers)) return;

    let _items = paginationNumbers.filter(
      index =>
        (index >= position - 2 && index <= position + 2) ||
        index === 0 ||
        index === paginationNumbers.length - 1,
    );
    if (position > 3)
      _items.splice(
        1,
        0,
        <span key="dots-1" className="Pagination-dots">
          {PAGE_DOTS_SYMBOL}
        </span>,
      )
    if (position < paginationNumbers.length - 4)
      _items.splice(
        _items.length - 1,
        0,
        <span key="dots-2" className="Pagination-dots">
          {PAGE_DOTS_SYMBOL}
        </span>,
      )
    return _items;
  }, [paginationNumbers, position]);

  const onClickHandler = useCallback(
    payload => {
      if (typeof onClick === 'function') {
        onClick(payload)
        window.scrollTo(0, scrollRef.current.offsetTop)
      }
    },
    [onClick],
  );

  return (
    <div className="Pagination-items">
      {items && Array.isArray(items)
        ? items.map(index =>
          isNaN(index) ? (
            index
          ) : (
              <PaginationItem
                key={`page-${index.toString()}`}
                index={index}
                selected={index === position}
                onClick={onClickHandler}
                scrollRef={scrollRef}
              />
            ),
        )
        : null}
    </div>
  );
};

const Pagination = ({
  defaultPage = DEFAULT_PAGE,
  pageLength = DEFAULT_PAGE_LENGTH,
  itemTotal = 0,
  scrollEffect = DEFAULT_SCROLL_EFFECT,
  onChange,
  scrollRef
}) => {
  const [position, setPosition] = useState(defaultPage - 1);
  const paginationNumbers = useMemo(() => {
    const size = Math.ceil(itemTotal / pageLength);
    return Array.apply(null, Array(size)).map((_, index) => index);
  }, [itemTotal, pageLength]);
  const hasPrev = position > 0;
  const hasNext = position < paginationNumbers.length - 1;

  useEffect(() => {
    setPosition(defaultPage - 1);
  }, [defaultPage]);

  const onClickHandler = useCallback(
    position => {
      setPosition(position);
    },
    [setPosition],
  );
  const onClickPrevHandler = useCallback(() => {
    setPosition(position - 1);
    window.scrollTo(0, scrollRef.current.offsetTop)
  }, [setPosition, position]);
  const onClickNextHandler = useCallback(() => {
    setPosition(position + 1);
    window.scrollTo(0, scrollRef.current.offsetTop)
  }, [setPosition, position]);

  useEffect(() => {
    if (typeof onChange === 'function') onChange(position + 1);
  }, [position]);

  return paginationNumbers.length > 1 ? (
    <div
      className={`Pagination-selectors
      ${hasPrev ? "Pagination-selectors--has-prev" : ""}
      ${hasNext ? "Pagination-selectors--has-next" : ""}
      `}>
      {hasPrev && (
        <button
          value="Previous"
          onClick={onClickPrevHandler}
          className="Pagination-item Pagination-prev Btn">PREV
        </button>
      )}
      <PaginationItemList
        paginationNumbers={paginationNumbers}
        position={position}
        onClick={onClickHandler}
        scrollRef={scrollRef}
      />
      {hasNext && (
        <button
          value="Next"
          onClick={onClickNextHandler}
          className="Pagination-item Pagination-next Btn">NEXT
        </button>
      )}
    </div>
  ) : null
};

export default Pagination;
