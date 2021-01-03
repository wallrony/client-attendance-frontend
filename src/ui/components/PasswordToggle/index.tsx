import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import './styles.css';
import { convertToInputElement } from '../../../core/utils/ConvertUtils';

interface PasswordToggleProps {
  inputId: string;
}

const PasswordToggle = (props: PasswordToggleProps) => {
  const [isVisible, setVisible] = useState(false);

  const icon = isVisible
    ? <FaRegEyeSlash />
    : <FaRegEye />;

  function handleToggleVisibility() {
    const input = convertToInputElement(document.getElementById(props.inputId));

    if (input) {
      let type = 'password';

      if (!isVisible) {
        type = 'text';
      }

      input.type = type;
    }

    setVisible(!isVisible);
  }

  return <span onClick={handleToggleVisibility} className="password-toggle">{icon}</span>;
}

export default PasswordToggle;