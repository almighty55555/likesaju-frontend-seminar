import { useState } from 'react';
export const OutputCardBack = ({ data, isLocked }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute flex flex-col w-[500px] h-[370px] p-[45px] bg-white text-neutral-800 rounded-[12px] transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? '0px 0px 16px 0px rgba(197, 179, 255, 0.5)' 
          : '0px 5px 16px 0px rgba(8, 15, 52, 0.06)',
        backdropFilter: isHovered ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: isHovered ? 'blur(10px)' : 'none',
        backfaceVisibility: isLocked ? 'visible' : 'hidden',
        transform: isLocked ? 'rotateY(0deg)' : 'rotateY(180deg)',
      }}
    >
      <h1 className="text-[28px] font-extrabold nanum-extra-bold">
        {data.title}
      </h1>
      {isLocked ? (
        <div className="bg-white opacity-30 blur-sm rounded-[12px] p-[10px]">
          <p className="text-[20px] leading-[180%] font-PretendardRegular">
            {data.msg}
          </p>
        </div>
      ) : (
        <p className="text-[20px] leading-[180%] font-PretendardRegular">
          {data.msg}
        </p>
      )}
    </div>
  );
};
