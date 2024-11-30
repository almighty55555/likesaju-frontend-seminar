import { useState } from 'react';
import { SajuSearchInput } from './search-input';
import SajuSearchLoading from './search-loading';
import SajuSearchOutput from './search-output';
import sajuRequest from './saju-request.jsx';


export const SajuSearchContainer = ({ setHasSaju }) => {
  const [step, setStep] = useState(0);
  const [birthDate, setBirthDate] = useState(null);


  function onSubmit() {
    setStep(1);
    sajuRequest({ birthDate: birthDate.toISOString().split('T')[0] }).then(() => {
      if (localStorage.getItem('sajuResult')) {
        setStep(2);
        setHasSaju(true);
      }
    });
  }

  return (

    <div className="flex w-[800px] h-[670px] bg-white rounded-2xl shadow-lg flex-col justify-start items-start">
      {step === 0 && <SajuSearchInput onSubmit={onSubmit} birthDate={birthDate} setBirthDate={setBirthDate} />}
      {step === 1 && <SajuSearchLoading />}
      {step === 2 && <SajuSearchOutput />}
    </div>
  );
};