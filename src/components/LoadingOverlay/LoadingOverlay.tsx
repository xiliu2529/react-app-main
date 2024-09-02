import React from 'react';
import './LoadingOverlay.css';
import { useMyContext, } from '../../contexts/MyContext'; 

const LoadingOverlay: React.FC = () => {
    const {  setLoading} = useMyContext(); 
    const handleCancel = () => {
        setLoading(false);
      };
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <div className="cancel-test">分析には30秒以上かかる場合があります</div>
      <button className="cancel-button" onClick={handleCancel}>分析キャンセル</button>
    </div>
  );
};

export default LoadingOverlay;
