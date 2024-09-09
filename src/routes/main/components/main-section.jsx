import { Button } from 'components/button';
import { SectionLayout } from './section-layout';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const GRADIENT_TOP_START_COLOR = '#170F49';
const GRADIENT_TOP_END_COLOR = '#E3E6F7';
const GRADIENT_BOTTOM_START_COLOR = '#6F6C8F';
const GRADIENT_BOTTOM_END_COLOR = '#F7F7F7';

const DEFAULT_MAX_SCROLL = 4000;
const MOBILE_BREAKPOINT = 1024;

export const MainSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);
  const [viewPortHeight, setViewPortHeight] = useState(window.innerHeight);
  const [maxScroll, setMaxScroll] = useState(DEFAULT_MAX_SCROLL);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const designOuterRef = useRef(null);
  const designInnerRef = useRef(null);
  const welcomeMsgRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const lionRef = useRef(null);

  useEffect(() => {
    // 현재 브라우저의 높이에 기반하여 MAX_SCROLL 값 설정
    const updateViewPortState = () => {
      setViewPortWidth(window.innerWidth);
      setViewPortHeight(window.innerHeight);
      setMaxScroll(window.innerHeight * 4);
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    updateViewPortState(); // 초기 설정
    window.addEventListener('resize', updateViewPortState); // 창 크기 변경 시 재설정

    return () => window.removeEventListener('resize', updateViewPortState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const interpolateBackground = () => {
    const factor = Math.min(scrollY / maxScroll, 1); // 0 ~ 1 사이 값으로 제한
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        background: `linear-gradient(to bottom, 
          ${gsap.utils.interpolate(GRADIENT_TOP_START_COLOR, GRADIENT_TOP_END_COLOR, factor)},
          ${gsap.utils.interpolate(GRADIENT_BOTTOM_START_COLOR, GRADIENT_BOTTOM_END_COLOR, factor)}
        )`,
        duration: 0.2,
        ease: 'none',
      });
    }
  };

  const interpolateHeadingPosition = () => {
    const factor =
      scrollY < maxScroll / 2
        ? 0
        : Math.min(((scrollY - maxScroll / 2) * 2) / maxScroll, 1);
    const viewportXMiddle = viewPortWidth / 2;
    if (headingRef.current) {
      gsap.to(headingRef.current, {
        x: viewportXMiddle * 1.5 * factor + -viewportXMiddle * 1.5,
        opacity: 1,
        duration: 0,
        ease: 'none',
      });
    }
  };

  const interpolateDesignPosition = () => {
    const factor1 =
      scrollY < maxScroll / 2
        ? 0
        : Math.min(((scrollY - maxScroll / 2) * 2) / maxScroll, 1);

    const factor2 = Math.min(scrollY / (maxScroll / 2), 1);
    const viewportXMiddle = viewPortWidth / 2;
    const viewportYMiddle = viewPortHeight / 2;
    const originalX = designOuterRef.current.getBoundingClientRect().x;
    const originalY = designOuterRef.current.getBoundingClientRect().y;
    const offsetXFromMiddle = viewPortWidth / 2 - (originalX + 170);
    if (designInnerRef.current) {
      gsap.to(designInnerRef.current, {
        x: offsetXFromMiddle - offsetXFromMiddle * factor1,
        y: isMobile && 40,
        opacity: 1,
        duration: 0,
        ease: 'none',
      });
    }

    if (welcomeMsgRef.current) {
      gsap.to(welcomeMsgRef.current, {
        y: !isMobile ? -50 : 0,
        opacity: 1 - factor2,
        duration: 0,
        ease: 'none',
      });
    }

    if (card1Ref.current) {
      gsap.to(card1Ref.current, {
        x: !isMobile ? -180 + 30 * factor2 : -90 + 20 * factor2,
        y: !isMobile ? 0 - 80 * factor2 : 0 - 40 * factor2,
        rotate: 0 - 45 * factor2,
        opacity: isMobile && 1 - factor1 * 2,
        duration: 0,
        ease: 'none',
      });
    }

    if (card2Ref.current) {
      gsap.to(card2Ref.current, {
        x: !isMobile ? -60 : -30,
        y: !isMobile ? 0 - 160 * factor2 : 0 - 80 * factor2,
        rotate: 0 - 15 * factor2,
        opacity: isMobile && 1 - factor1 * 2,
        duration: 0,
        ease: 'none',
      });
    }

    if (card3Ref.current) {
      gsap.to(card3Ref.current, {
        x: !isMobile ? 60 : 30,
        y: !isMobile ? 0 - 160 * factor2 : 0 - 80 * factor2,
        rotate: 0 + 15 * factor2,
        opacity: isMobile && 1 - factor1 * 2,
        duration: 0,
        ease: 'none',
      });
    }

    if (card4Ref.current) {
      gsap.to(card4Ref.current, {
        x: !isMobile ? 180 - 30 * factor2 : 90 - 20 * factor2,
        y: !isMobile ? 0 - 80 * factor2 : 0 - 40 * factor2,
        rotate: 0 + 45 * factor2,
        opacity: isMobile && 1 - factor1 * 2,
        duration: 0,
        ease: 'none',
      });
    }

    if (lionRef.current) {
      gsap.to(lionRef.current, {
        y: viewportYMiddle * 1.5 - viewportYMiddle * 1.5 * factor2,
        opacity: isMobile && 1 - factor1 * 2,
        duration: 0,
        ease: 'none',
      });
    }
  };

  useEffect(() => {
    interpolateBackground();
    interpolateHeadingPosition();
    interpolateDesignPosition();
  }, [scrollY, isMobile]);

  return (
    <SectionLayout
      outerLayerClassName={'h-[500vh] flex items-start'}
      innerLayerClassName={`sticky top-[80px] h-[calc(100vh-80px)]`}
      innerLayerRef={sectionRef}
    >
      <div className="relative flex flex-col w-full gap-8 items-start mobile:items-center">
        <div
          ref={headingRef}
          className="flex flex-col items-start mobile:items-center gap-8"
        >
          <h1 className="text-[64px] mobile:text-[32px] leading-normal whitespace-pre-wrap text-left mobile:text-center nanum-extra-bold text-black dark:text-white">
            <span>멋쟁이</span>{' '}
            <s className="text-gray-500 dark:text-gray-400">사자</s>
            {'\n'}
            <span>사주처럼</span>
          </h1>
          <p className="text-lg mobile:text-sm text-left mobile:text-center mobile:whitespace-pre-wrap dark:text-white">
            {'오늘의 사주 운세를 확인하고,\n친구에게 공유하자!'}
          </p>
          <a href="/saju">
            <Button>멋사주 시작하기</Button>
          </a>
        </div>
        <div
          ref={designOuterRef}
          className="absolute -bottom-10 right-0 size-[340px]"
        >
          <div
            className="w-full h-full flex justify-center"
            ref={designInnerRef}
          >
            <p
              ref={welcomeMsgRef}
              className="font-extrabold text-[44px] mobile:text-[28px] text-white text-nowrap w-fit"
            >
              오늘의 운세가 궁금해?
            </p>
            <img
              ref={lionRef}
              src="/images/snulion.png"
              className="absolute z-50 mobile:scale-[50%] object-contain"
              alt="Main Illustration"
            />
            <img
              ref={card1Ref}
              src="/images/card1.png"
              className="absolute scale-[60%] mobile:scale-[30%] object-contain"
              alt="Card1 Illustration"
            />
            <img
              ref={card2Ref}
              src="/images/card2.png"
              className="absolute scale-[60%] mobile:scale-[30%] object-contain"
              alt="Card2 Illustration"
            />
            <img
              ref={card3Ref}
              src="/images/card3.png"
              className="absolute scale-[60%] mobile:scale-[30%] object-contain"
              alt="Card3 Illustration"
            />
            <img
              ref={card4Ref}
              src="/images/card4.png"
              className="absolute scale-[60%] mobile:scale-[30%] object-contain"
              alt="Card4 Illustration"
            />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
