import React, { useState } from 'react';
import { SajuLion } from './saju-lion';
import { SajuSearchContainer } from './search-container';

const SajuSearch = ({ setHasSaju }) => {
  return (
    <div className="flex flex-row gap-4 justify-center items-center pb-20">
      <SajuLion />
      <SajuSearchContainer setHasSaju={setHasSaju} />
    </div>
  );
};

export default SajuSearch;