import React from "react";

const Pagination = ({ pokes, pokesPerPage, pagination }) => {
  let pageNum = [];
  for (let i = 1; i <= Math.ceil(pokes?.length / pokesPerPage); i++) {
    pageNum.push(i);
  }
  if (pokes?.length <= 12 || !pokes) {
    return null;
  } else {
    return (
      <div className="pagesHolder">
        <ul style={{ margin: "0", display: "contents" }}>
          {pageNum &&
            pageNum.map((number) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                key={number}
                className="page"
                onClick={() => pagination(number)}
              >
                {number}
              </a>
            ))}
        </ul>
      </div>
    );
  }
};

export default Pagination;
