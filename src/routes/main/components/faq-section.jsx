import { SectionLayout } from './section-layout';
import { useState } from 'react';

export const FAQSection = () => {
  const faqAccordionInfo = [
    {
      question: 'Q. 사주 운세를 확인하고 싶은데, 비용은 무료인가요?',
      answer:
        '통합운세는 무료로 제공됩니다. 테마별 운세(건강운, 취업/학업운, 연애운, 재물운)는 회 당 5P를 사용하여 확인할 수 있습니다.',
    },

    {
      question: 'Q. 사주가 무엇인가요?',
      answer:
        '사주는 개인의 생년월일을 바탕으로 운명을 예측하는 한국 전통 점술의 일종입니다. 주로 음양오행 이론에 기반하며 사주팔자라고 불리는 연, 월, 일, 시의 네 가지 기둥으로 구성됩니다. 사주는 자신을 이해하고 더 나은 삶을 살아가도록 도와주는 가이드로 사용될 수 있습니다.',
    },
    {
      question: 'Q. 어떤 기술이 사용되었나요?',
      answer:
        'React, Django를 기반으로 WebSocket, Redux, Three.js 등이 사용되었습니다. 또한 12기 운영진들의 황금같은 1학기와 여름방학이...',
    },
  ];

  return (
    <SectionLayout>
      <div className="w-full h-full flex flex-col gap-[80px]">
        <h3 className="text-left text-4xl nanum-extra-bold dark:text-white">
          FAQs
        </h3>
        <div className="flex flex-col gap-[30px] justify-center">
          {faqAccordionInfo.map((accordion) => (
            <FAQAccordion
              key={accordion.question}
              question={accordion.question}
              answer={accordion.answer}
            />
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-xl px-[50px] py-10 shadow-xl w-full gap-5 dark:bg-neutral-400">
      <div className="flex justify-between items-center gap-5">
        <p className="text-xl font-bold truncate">{question}</p>
        <button
          className="rounded-full shadow-lg transition"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <svg
            className={`transition transform ${isOpen ? '' : '-rotate-90'}`}
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
          >
            <circle
              className="transition"
              cx="25.6691"
              cy="25.3309"
              r="25.3309"
              fill={!isOpen ? '#FFFFFF' : '#6F6C90'}
            />
            <path
              className="transition"
              d="M17.4125 22.2212L25.6691 30.4405L33.9257 22.2212"
              stroke={!isOpen ? '#6F6C90' : '#FFFFFF'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {isOpen && <p className="text-lg w-full text-left">{answer}</p>}
    </div>
  );
};
