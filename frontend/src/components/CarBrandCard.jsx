import React from 'react';

export const CarBrandCard = ({ brand, img, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      style={{
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.3s',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.borderColor = '#3b82f6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#e0e0e0';
      }}
    >
      <div style={{ 
        width: '100%', 
        height: '100px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '15px'
      }}>
        <img 
          src={img} 
          alt={brand} 
          style={{ 
            maxWidth: '90%', 
            maxHeight: '90%', 
            objectFit: 'contain' 
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${brand}&size=100&background=random`;
          }}
        />
      </div>
      <h3 style={{ 
        margin: 0, 
        fontSize: '18px', 
        color: '#333',
        fontWeight: '600'
      }}>
        {brand}
      </h3>
    </div>
  );
};