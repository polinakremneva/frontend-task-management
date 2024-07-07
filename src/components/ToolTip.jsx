import React, { useState } from "react";
import { Manager, Reference, Popper } from "react-popper";
import { FaInfoCircle } from "react-icons/fa";

const TooltipIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Manager>
      <div className="relative flex items-center">
        <Reference>
          {({ ref }) => (
            <div
              ref={ref}
              className="text-md cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <FaInfoCircle />
            </div>
          )}
        </Reference>
        {showTooltip && (
          <Popper placement="bottom">
            {({ ref, style, placement, arrowProps }) => (
              <div
                ref={ref}
                style={style}
                data-placement={placement}
                className="px-3 py-2 text-sm w-[13em] text-white bg-gray-800 rounded shadow-lg"
              >
                Password must be at least 8 characters long, with at least one
                uppercase letter, one number, and one special character.
                <div ref={arrowProps.ref} style={arrowProps.style} />
              </div>
            )}
          </Popper>
        )}
      </div>
    </Manager>
  );
};

export default TooltipIcon;
