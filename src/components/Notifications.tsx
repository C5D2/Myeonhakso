'use client';

import NotificationsDropdown from '@/components/NotificationsDropdown';
import { useState } from 'react';

export default function Notifications({
  notifications,
}: {
  notifications: number;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {isDropdownOpen && <NotificationsDropdown />}

      <div className="flex relative">
        <button type="button" onClick={toggleDropdown}>
          <svg
            width="53"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C10.8954 2 10 2.89543 10 4V5.04244C7.17981 5.53018 5 8.04254 5 11V16L3 18V19H21V18L19 16V11C19 8.04254 16.8202 5.53018 14 5.04244V4C14 2.89543 13.1046 2 12 2ZM7 11V16H17V11C17 8.79086 15.2091 7 13 7H11C8.79086 7 7 8.79086 7 11ZM14 21H10C10 22.1046 10.8954 23 12 23C13.1046 23 14 22.1046 14 21Z"
              fill="#000000"
            />
            {notifications > 0 ? (
              <>
                <circle cx="20" cy="8" r="8" fill="#FAC56C" />
                <text
                  x="20"
                  y="11"
                  fontSize="8"
                  fill="#FFFFFF"
                  textAnchor="middle"
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  {notifications}
                </text>
              </>
            ) : null}
          </svg>
        </button>
      </div>
    </>
  );
}
