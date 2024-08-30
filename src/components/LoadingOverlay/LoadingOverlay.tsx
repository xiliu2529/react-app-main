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
      <button className="cancel-button" onClick={handleCancel}>キャンセル</button>
    </div>
  );
};

export default LoadingOverlay;
