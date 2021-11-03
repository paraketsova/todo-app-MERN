import React from 'react';

export default function List({_id, title, contents, lastModifiedAt}) {
  return (
    <>
      <div>
        <div>
          <h5>{title}</h5>
          <p>{contents}</p>
          <p>Latest modified: {lastModifiedAt}</p>
        </div>
      </div>
    </>
  )
}