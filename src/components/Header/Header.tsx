// components/Header/Header.tsx

import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  // 点击事件处理函数
  const handleClick = () => {
    alert('Header 被点击了！');
    // 在这里可以添加其他点击事件处理逻辑
  };

  return (
    <header className="header" onClick={handleClick}>
      <h1>header</h1>
    </header>
  );
};

export default Header;
