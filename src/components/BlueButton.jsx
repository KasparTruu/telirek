import React from 'react';

const BlueButton = ({ children, href, ...props }) => {
  const commonClasses = 'bg-[#00529c] hover:bg-[#004583] text-[#fbfbfb] duration-200 px-[35px] py-[7px] text-[18px]';

  if (href) {
    return (
      <a href={href} className={commonClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={commonClasses} {...props}>
      {children}
    </button>
  );
};

export default BlueButton;
