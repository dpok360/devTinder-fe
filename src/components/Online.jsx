const Online = ({ status }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill={status === 'online' ? 'green' : 'gray'}
      className="absolute left-12 sm:left-16 top-8 sm:top-16 z-10"
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z" />
        </g>
      </g>
    </svg>
  );
};

export default Online;
