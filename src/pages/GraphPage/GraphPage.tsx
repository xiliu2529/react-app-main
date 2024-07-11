import React, { useState } from 'react';
import PageTwo from '../common/Chart/Chart';
import PageThree from '../common/InfoPanel/InfoPanel';
import './GraphPage.css';

const PageOne: React.FC = () => {
  
  return (
    <div style={{ width: '100%' }}>
      <PageThree/>
      <PageTwo/>
    </div>
  );
};

export default PageOne;
