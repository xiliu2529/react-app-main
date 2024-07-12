import React, { useState } from 'react';
import PageTwo from '../common/Chart/Chart';
import PageThree from '../common/InfoPanel/InfoPanel';
import './GraphPage.css';

const PageOne: React.FC = () => {
  
  return (
    <div className='Chart'>
      <PageThree/>
        <PageTwo/></div>
  );
};

export default PageOne;
