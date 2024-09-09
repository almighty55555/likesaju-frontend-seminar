import { useState } from 'react';
import { OutputCard } from './output-card';
import { Button } from '../../../components/button';
import { OutputCardBack } from './output-card-back';
import { SajuPurchaseModal } from '../../../components/modals/saju-purchase-modal';
import { SajuShareModal } from '../../../components/modals/share-modal';
import locked from '../../../assets/images/locked.png';
import { useSelector } from 'react-redux';
import { PointModal } from 'components/modals/point-modal';

export const SearchOutputTheme = () => {
  const OutputCardData = [
    {
      title: '건강운',
      image: '/images/health.png',
      shadow: 'rgba(136, 73, 0, 0.30)',
      msg: JSON.parse(localStorage.getItem('sajuResult')).healthFortune[0].content,
    },
    {
      title: '취업/학업운',
      image: '/images/career.png',
      shadow: 'rgba(0, 15, 96, 0.30)',
      msg: JSON.parse(localStorage.getItem('sajuResult')).careerFortune[0].content,  
    },
    {
      title: '연애운',
      image: '/images/love.png',
      shadow: 'rgba(225, 0, 0, 0.30)',
      msg: JSON.parse(localStorage.getItem('sajuResult')).loveFortune[0].content,
    },
    {
      title: '재물운',
      image: '/images/wealth.png',
      shadow: 'rgba(103, 0, 152, 0.30)',
      msg: JSON.parse(localStorage.getItem('sajuResult')).wealthFortune[0].content,
    },
  ];

  const data = useSelector((data) => data);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const isLocked = data.user.isLocked;

  const openPurchaseModal = () => {
    setIsPurchaseModalOpen(true);
  };

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center items-center p-20 gap-20">
      <h1 className="text-[40px] font-extrabold leading-[48px] nanum-extra-bold mt-2">
        테마별 운세 보기
      </h1>
      {isLocked ? (
        <div className="relative" onClick={openPurchaseModal}>
          <div className="relative w-fit grid grid-cols-2 gap-16 p-4 justify-items-center">
            {OutputCardData.map((data, index) => (
              <div className={'relative w-[500px] h-[370px] cursor-pointer'}>
                <OutputCardBack key={index} data={data} isLocked={isLocked} />
              </div>
            ))}
          </div>
          <img
            src={locked}
            alt="locked"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[228px] h-[228px] cursor-pointer"
          />
        </div>
      ) : (
        <div className="relative w-fit grid grid-cols-2 gap-16 p-4 justify-items-center">
          {OutputCardData.map((data, index) => (
            <OutputCard key={index} data={data} isLocked={isLocked} />
          ))}
        </div>
      )}
      {isPurchaseModalOpen && (
        <SajuPurchaseModal
          setIsModalOpen={setIsPurchaseModalOpen}
          setIsPointModalOpen={setIsPointModalOpen}
        />
      )}
      {isPointModalOpen && <PointModal setIsModalOpen={setIsPointModalOpen} />}
      {!isLocked && (
        <>
          <Button
            className={
              'bg-primary-500 text-white font-bold rounded-[10px] mt-4'
            }
            onButtonClick={openShareModal}
          >
            오늘 운세 공유하기
          </Button>
          {isShareModalOpen && (
            <SajuShareModal setIsModalOpen={setIsShareModalOpen} />
          )}
        </>
      )}
    </div>
  );
};
