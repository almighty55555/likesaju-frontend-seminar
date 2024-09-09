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
        '사주는 개인의 생년월일을 바탕으로 운명을 예측하는 한국 전통 점술의 일종입니다. 주로 음양오행 이론에 기반하며 사주팔자라고 불리는 연, 월, 일, 시의 네 가지 기둥으로 구성됩니다. 사주는 자신을 이해하고 더 나은 삶을 살아가도록 도와주는 가이드로 사용될 수 있습니다... 라고 ChatGPT가 말해줬습니다ㅎㅎ 그나저나 여러분은 사주를 믿으시나요? 저는 어릴 때는 전혀 안 믿었는데 고등학교 3학년 때 친구들이랑 시내에서 우연히 사주를 보게 됐거든요. 거기 사주 선생님께서 저한테 수능공부 할 필요 없다고 하셨는데, 그때 저는 수능 최저가 빡센 대학들 준비하고 있어서 뭔소리야ㅋㅋ 하고 넘겼는데... 갑자기 9월에 최저가 없는 대학들로 원서를 바꿔 쓰게 되더니 수능 안 보는 대학들만 붙었음요 그때부터 살짝 믿음ㅋㅋㅋㅋ',
    },
    {
      question: 'Q. 어떤 기술이 사용되었나요?',
      answer:
        'React, Django를 기반으로 WebSocket, Redux, Three.js 등이 사용되었습니다. 또한 12기 운영진들의 황금같은 1학기와 여름방학이...',
    },
  ];

  return (
    <SectionLayout innerLayerClassName={'mobile:px-[10vw]'}>
      <div className="w-full h-full flex flex-col gap-[80px] mobile:gap-[40px]">
        <h3 className="text-left text-4xl mobile:text-2xl nanum-extra-bold dark:text-white">
          FAQs
        </h3>
        <div className="flex flex-col gap-[30px] mobile:gap-[15px] justify-center">
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
    <div className="flex flex-col rounded-xl px-[50px] py-10 mobile:px-[20px] mobile:py-3 shadow-xl w-full gap-5 mobile:gap-2 dark:bg-neutral-400">
      <div className="flex justify-between items-center gap-5">
        <p className="text-xl mobile:text-sm font-bold truncate mobile:text-wrap mobile:text-left">
          {question}
        </p>
        <button
          className="rounded-full shadow-md transition border border-[#D3D3D3]"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <svg
            className={`transition-transform transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      <div
        className={`transition-max-height duration-1000 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <p className="text-lg w-full text-left mt-4">{answer}</p>
      </div>
    </div>
  );
};
