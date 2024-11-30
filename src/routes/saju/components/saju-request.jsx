import { getSajuResult } from "apis/api";

export default async function sajuRequest({ birthDate }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // ai api
  let result = await getSajuResult(birthDate);
  if (result === "error") {
    result = {
      "generalFortune": [
        {
          "headline": "일시적인 오류가 발생했습니다.",
          "content": "잠시 후 다시 시도해주세요."
        }
      ],
      "healthFortune": [
        {
          "content": "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }
      ],
      "loveFortune": [
        {
          "content": "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }
      ],
      "careerFortune": [
        {
          "content": "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }
      ],
      "wealthFortune": [
        {
          "content": "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }
      ]
    }
  }
  localStorage.setItem("sajuResult", JSON.stringify(result));
  return result;
}