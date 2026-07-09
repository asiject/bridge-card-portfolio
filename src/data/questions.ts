import type { Language, QuestionItem } from '@/types/game'

/** 공통 질문 8장 — 라이트/딥 모드 모두 포함 */
const BASE_QUESTIONS: Record<Language, QuestionItem[]> = {
  kr: [
    {
      icon: '☀️',
      question: '오늘 하루 중 가장 기억에 남는 순간은?',
      subQuestion: '그 순간을 떠올리며 이야기해 보세요.',
    },
    {
      icon: '🎵',
      question: '요즘 자주 듣는 노래가 있나요?',
      subQuestion: '그 노래를 좋아하는 이유도 들려주세요.',
    },
    {
      icon: '🌿',
      question: '주말에 보통 뭘 하며 쉬나요?',
      subQuestion: '나만의 루틴이 있다면 공유해 보세요.',
    },
    {
      icon: '🎨',
      question: '최근에 빠진 취미가 있나요?',
      subQuestion: '어떻게 시작하게 되었는지도 궁금해요.',
    },
    {
      icon: '✈️',
      question: '여행 간다면 어디로 가고 싶나요?',
      subQuestion: '그곳에서 하고 싶은 일이 있나요?',
    },
    {
      icon: '🍜',
      question: '좋아하는 음식이나 메뉴는?',
      subQuestion: '추천 맛집이 있다면 알려주세요.',
    },
    {
      icon: '💭',
      question: '어릴 때 꿈이었던 직업은?',
      subQuestion: '지금과 어떻게 다른가요?',
    },
    {
      icon: '🔋',
      question: '스트레스 받을 때 나만의 해소법은?',
      subQuestion: '에너지가 충전되는 순간도 들려주세요.',
    },
  ],
  en: [
    {
      icon: '☀️',
      question: 'What moment from today stands out the most?',
      subQuestion: 'Take a moment to share why it stayed with you.',
    },
    {
      icon: '🎵',
      question: 'Is there a song you have been listening to lately?',
      subQuestion: 'What do you like about it?',
    },
    {
      icon: '🌿',
      question: 'How do you usually spend your weekends?',
      subQuestion: 'Do you have a routine you enjoy?',
    },
    {
      icon: '🎨',
      question: 'Any hobby you have picked up recently?',
      subQuestion: 'How did you get into it?',
    },
    {
      icon: '✈️',
      question: 'If you could travel anywhere, where would you go?',
      subQuestion: 'What would you want to do there?',
    },
    {
      icon: '🍜',
      question: 'What is your favorite food or dish?',
      subQuestion: 'Any place you would recommend?',
    },
    {
      icon: '💭',
      question: 'What did you want to be when you were young?',
      subQuestion: 'How is that different from now?',
    },
    {
      icon: '🔋',
      question: 'How do you relieve stress?',
      subQuestion: 'When do you feel recharged?',
    },
  ],
}

/** 라이트 모드 전용 질문 8장 — 가벼운 대화 */
const LIGHT_QUESTIONS: Record<Language, QuestionItem[]> = {
  kr: [
    {
      icon: '😊',
      question: '요즘 나를 웃게 만든 일은?',
      subQuestion: '가볍게 털어놓아도 좋아요.',
    },
    {
      icon: '📺',
      question: '최근에 재미있게 본 영상이나 드라마는?',
      subQuestion: '추천하고 싶은 이유가 있나요?',
    },
    {
      icon: '☕',
      question: '하루를 시작하는 나만의 방식은?',
      subQuestion: '아침 루틴이 있다면 들려주세요.',
    },
    {
      icon: '🐾',
      question: '좋아하는 동물이나 반려동물 이야기',
      subQuestion: '없다면 키워보고 싶은 동물은?',
    },
    {
      icon: '🎁',
      question: '받았던 선물 중 기억에 남는 것은?',
      subQuestion: '그때의 기분을 나눠 주세요.',
    },
    {
      icon: '🏃',
      question: '가장 좋아하는 계절과 그 이유는?',
      subQuestion: '그 계절에 하는 일이 있나요?',
    },
    {
      icon: '📚',
      question: '최근에 읽은 책이나 글귀가 있나요?',
      subQuestion: '인상 깊었던 한 문장을 공유해 보세요.',
    },
    {
      icon: '🤝',
      question: '처음 만난 사람에게 건네는 인사말은?',
      subQuestion: '나만의 어색함 푸는 방법이 있나요?',
    },
  ],
  en: [
    {
      icon: '😊',
      question: 'What made you smile recently?',
      subQuestion: 'Feel free to keep it light.',
    },
    {
      icon: '📺',
      question: 'A show or video you enjoyed lately?',
      subQuestion: 'Would you recommend it?',
    },
    {
      icon: '☕',
      question: 'How do you like to start your day?',
      subQuestion: 'Any morning ritual?',
    },
    {
      icon: '🐾',
      question: 'A favorite animal or pet story?',
      subQuestion: 'Or one you would love to have?',
    },
    {
      icon: '🎁',
      question: 'A gift you still remember?',
      subQuestion: 'How did it make you feel?',
    },
    {
      icon: '🏃',
      question: 'Your favorite season and why?',
      subQuestion: 'What do you do in that season?',
    },
    {
      icon: '📚',
      question: 'A book or quote you read recently?',
      subQuestion: 'Share a line that stuck with you.',
    },
    {
      icon: '🤝',
      question: 'How do you break the ice with someone new?',
      subQuestion: 'Any go-to conversation starter?',
    },
  ],
}

/** 딥 모드 전용 질문 8장 — 깊은 대화 */
const DEEP_QUESTIONS: Record<Language, QuestionItem[]> = {
  kr: [
    {
      icon: '🌱',
      question: '지금의 나를 만든 경험 하나를 꼽는다면?',
      subQuestion: '그때 무엇을 배웠나요?',
    },
    {
      icon: '🙏',
      question: '최근에 가장 감사했던 일은?',
      subQuestion: '누구에게 고맙다고 느꼈나요?',
    },
    {
      icon: '🎯',
      question: '앞으로 1년 안에 이루고 싶은 것은?',
      subQuestion: '그 목표가 의미 있는 이유는?',
    },
    {
      icon: '🛋️',
      question: '나에게 "휴식"이란 어떤 의미인가요?',
      subQuestion: '진짜 쉬었다고 느끼는 순간은?',
    },
    {
      icon: '💬',
      question: '누군가에게 받은 말 중 아직 기억하는 것은?',
      subQuestion: '그 말이 나에게 어떤 영향을 줬나요?',
    },
    {
      icon: '📈',
      question: '실패했지만 배운 경험이 있다면?',
      subQuestion: '다시 돌아간다면 달라질 점은?',
    },
    {
      icon: '💛',
      question: '나를 가장 잘 이해해 주는 사람은?',
      subQuestion: '그 사람과의 관계에서 소중한 점은?',
    },
    {
      icon: '🔮',
      question: '10년 뒤의 나는 어떤 모습이면 좋을까요?',
      subQuestion: '그 모습을 위해 지금 할 수 있는 일은?',
    },
  ],
  en: [
    {
      icon: '🌱',
      question: 'One experience that shaped who you are today?',
      subQuestion: 'What did you learn from it?',
    },
    {
      icon: '🙏',
      question: 'Something you felt grateful for recently?',
      subQuestion: 'Who were you thankful for?',
    },
    {
      icon: '🎯',
      question: 'Something you want to achieve within a year?',
      subQuestion: 'Why does it matter to you?',
    },
    {
      icon: '🛋️',
      question: 'What does rest mean to you?',
      subQuestion: 'When do you feel truly rested?',
    },
    {
      icon: '💬',
      question: 'Words someone said that still stay with you?',
      subQuestion: 'How did those words affect you?',
    },
    {
      icon: '📈',
      question: 'A failure that taught you something?',
      subQuestion: 'What would you do differently?',
    },
    {
      icon: '💛',
      question: 'Who understands you the best?',
      subQuestion: 'What do you value in that relationship?',
    },
    {
      icon: '🔮',
      question: 'What do you hope your life looks like in 10 years?',
      subQuestion: 'What can you do now to move toward it?',
    },
  ],
}

export const QUESTIONS = {
  base: BASE_QUESTIONS,
  light: LIGHT_QUESTIONS,
  deep: DEEP_QUESTIONS,
} as const
