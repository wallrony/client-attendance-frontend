import React from 'react';

import './styles.css';

interface CompressDirectionProps {
  direction?: 'vertical' | 'horizontal';
}

const CompressDirection: React.FC<CompressDirectionProps> = ({ children, direction = 'horizontal' }) => {
  return (
    <div className={`compress-direction ${direction === 'horizontal' ? 'i-row' : 'i-column'}`}>
      {children}
    </div>
  );
}

export default CompressDirection;
