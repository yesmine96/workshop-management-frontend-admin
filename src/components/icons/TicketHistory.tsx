import React from 'react';

function TicketHistory({ fill = 'currentColor', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
      <g clipPath="url(#clip0_703_310)">
        <path
          fill="#6237B2"
          d="M10.688 0H2.811A2.816 2.816 0 000 2.813v7.874A2.816 2.816 0 002.813 13.5h7.874a2.816 2.816 0 002.813-2.813V2.814A2.816 2.816 0 0010.687 0zm1.687 2.813H8.437V1.125h2.25a1.687 1.687 0 011.688 1.688zM6.187 1.125h1.125v2.813a.563.563 0 11-1.125 0V1.124zm-3.375 0h2.25v1.688H1.126a1.687 1.687 0 011.688-1.688zm7.876 11.25H2.811a1.687 1.687 0 01-1.687-1.688v-6.75h3.938a1.687 1.687 0 103.375 0h3.937v6.75a1.687 1.687 0 01-1.688 1.688zm.562-1.688a.562.562 0 01-.563.563H9a.563.563 0 010-1.125h1.688a.562.562 0 01.562.563z"
        ></path>
      </g>
      <circle cx="12.5" cy="12.5" r="5.5" fill="#fff"></circle>
      <g clipPath="url(#clip1_703_310)">
        <path
          fill="#6237B2"
          d="M15.915 15.502l-1.741-1.74a2.921 2.921 0 10-.413.412l1.741 1.74a.292.292 0 00.412-.412zm-3.998-1.252a2.333 2.333 0 110-4.667 2.333 2.333 0 010 4.667z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_703_310">
          <path fill="#fff" d="M0 0H13.5V13.5H0z"></path>
        </clipPath>
        <clipPath id="clip1_703_310">
          <path fill="#fff" d="M0 0H7V7H0z" transform="translate(9 9)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default TicketHistory;
