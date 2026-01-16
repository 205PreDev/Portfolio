export interface PersonalInfo {
    growthProcess: string;
    strengths: string;
    weaknesses: string;
    motto: string;
}

export const personalInfo: PersonalInfo = {
    growthProcess: "여기에 본인의 성장과정을 작성해주세요. (예: 어릴 적부터 기계 분해를 좋아하며 문제 해결의 즐거움을 알게 되었고...)",
    strengths: "본인의 장점을 작성해주세요. (예: 책임감이 강하고 새로운 기술을 습득하는 속도가 빠릅니다.)",
    weaknesses: "본인의 단점을 작성해주세요. (예: 한 가지 문제에 너무 깊게 몰입하는 경향이 있으나, 이를 일정 관리 도구로 극복하고 있습니다.)",
    motto: "좌우명이나 가치관을 작성해주세요. (예: 어제보다 더 나은 오늘의 코드를 짜자!)",
};
