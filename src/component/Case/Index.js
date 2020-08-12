import React from 'react';
import './index.css';

export default props => (
  <div className="caseContainer">
    {props.CaseList.map((item, index) => (
      <div className="caseItem" key={index}>
        {item()}
      </div>
    ))}
  </div>
);
