export interface CardPage {
  id: string;
  title?: string;
  content: string;
  image?: string;
  backgroundColor?: string;
}

export const cardData: CardPage[] = [
  {
    id: 'cover',
    title: 'A Special Gift',
    content: 'For someone who makes every moment matter',
    backgroundColor: 'bg-amber-50',
  },
  {
    id: 'page1',
    title: 'Like a Bee',
    content: 'You move through the world with purpose and grace, bringing sweetness to everything you touch. Your kindness is the honey that makes life richer.',
    image: '/images/bee-watercolor.png',
    backgroundColor: 'bg-yellow-50',
  },
  {
    id: 'page2',
    title: 'Like an Iris',
    content: 'Beautiful and resilient, you bloom in your own unique way. Your strength is quiet but unmistakable, and your presence brings color to the world.',
    image: '/images/iris-botanical.png',
    backgroundColor: 'bg-purple-50',
  },
  {
    id: 'page3',
    title: 'Like a Dancer',
    content: "You move through life with rhythm and joy. Whether it's the tap of your feet or the way you sway through each day, you inspire others to dance along.",
    backgroundColor: 'bg-pink-50',
  },
  {
    id: 'page4',
    title: 'Like a Runner',
    content: 'You chase your dreams with determination and heart. Every step forward is a testament to your courage and your commitment to becoming who you want to be.',
    backgroundColor: 'bg-blue-50',
  },
  {
    id: 'page5',
    title: 'In a Café',
    content: "You create warmth wherever you go. Like a cozy café on a cold day, you are a refuge, a place where people feel safe and understood.",
    backgroundColor: 'bg-amber-50',
  },
  {
    id: 'closing',
    title: 'Thank You',
    content: 'For being exactly who you are. For the laughter, the kindness, the moments we share. This card is just a small way of saying: you matter more than you know.',
    backgroundColor: 'bg-cream',
  },
];
