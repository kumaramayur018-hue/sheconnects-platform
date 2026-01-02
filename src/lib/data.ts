
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export type User = {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  bio: string;
  connections: string[];
  location: string;
  coverPhoto: string;
  interests: string[];
  badges: string[];
  role: 'entrepreneur' | 'mentor' | 'investor' | 'admin';
};

export type Post = {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  createdAt: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  attendees: number;
};

export type Message = {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
};

export type Conversation = {
    id: string;
    participant: User;
    lastMessage: Message;
};

export type Product = {
    id: string;
    sellerId: string;
    name:string;
    description: string;
    price: number;
    imageUrls: string[];
    coverImage: string;
    tags: string[];
    category: string;
    attributes: ('handmade' | 'rural_origin' | 'eco_friendly')[];
    stock: number;
    rating: number;
    quantity: number;
    shortDescription: string;
    longDescription: string;
    verificationStatus: 'pending' | 'approved' | 'rejected';
};

export type TrainingProgram = {
    id: string;
    title: string;
    description: string;
    trainerName: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    topics: string[];
    language: string;
    mode: 'online' | 'offline' | 'hybrid';
    maxParticipants: number;
    coverImage: string;
};

export type TrainingSession = {
    id: string;
    programId: string;
    title: string;
    dateTime: string;
    recordingUrl: string;
    description: string;
};

export type FundingOpportunity = {
    id: string;
    title: string;
    description: string;
    eligibility: string;
    deadline: string;
    applicationLink: string;
    tags: string[];
    funder: string;
    region: string;
};

export const users: User[] = [
  { id: 'user-1', name: 'Alina Starkov', avatar: getImage('user1'), headline: 'Founder at Alina\'s Crafts', bio: 'Passionate about creating sustainable, handmade goods and empowering rural artisans. I believe in the power of connection to drive innovation and create a better future for everyone. Currently exploring new eco-friendly materials.', connections: ['user-2', 'user-3'], location: 'Jaipur, India', coverPhoto: getImage('coverPhoto'), interests: ['Handmade', 'Eco-friendly', 'Textiles'], badges: ['Founder', 'Community Builder'], role: 'entrepreneur' },
  { id: 'user-2', name: 'Ben Barnes', avatar: getImage('user2'), headline: 'Impact Investor at GrowthCap', bio: 'Bridging the gap between capital and social impact. Focused on investing in women-led businesses in emerging markets.', connections: ['user-1'], location: 'New York, NY', coverPhoto: getImage('coverPhoto'), interests: ['Investing', 'Finance', 'Social Impact'], badges: ['Investor'], role: 'investor' },
  { id: 'user-3', name: 'Jessie Mei Li', avatar: getImage('user3'), headline: 'Digital Marketing Guru & Mentor', bio: '10+ years of experience in digital marketing. Open to mentoring aspiring entrepreneurs on how to build a powerful online brand.', connections: ['user-1', 'user-4'], location: 'London, UK', coverPhoto: getImage('coverPhoto'), interests: ['Marketing', 'Branding', 'Mentorship'], badges: ['Mentor', 'Top Contributor'], role: 'mentor' },
  { id: 'user-4', name: 'Archie Renaux', avatar:getImage('user4'), headline: 'Software Engineer', bio: 'Full-stack developer with a love for open-source and tech for good.', connections: ['user-3'], location: 'Berlin, Germany', coverPhoto: getImage('coverPhoto'), interests: ['Software Engineering', 'AI'], badges: [], role: 'mentor' },
  { id: 'user-5', name: 'Amita Suman', avatar: getImage('user5'), headline: 'Founder at Suman Organics', bio: 'Entrepreneur focused on bringing organic produce from rural farms to urban tables.', connections: [], location: 'Mumbai, India', coverPhoto: getImage('coverPhoto'), interests: ['Entrepreneurship', 'Organic Farming', 'Food'], badges: ['Founder'], role: 'entrepreneur' },
];

export const currentUser = users[0];

export const posts: Post[] = [
    { id: 'post-1', authorId: 'user-3', content: 'So excited to share my latest article on inclusive design principles! It covers everything from accessibility to cultural considerations. Would love to hear your thoughts. #UX #Design #Inclusivity', imageUrl: getImage('postImage1'), likes: 128, comments: 12, createdAt: '2h ago' },
    { id: 'post-2', authorId: 'user-5', content: 'Our new batch of turmeric is ready! We\'ve worked hard to ensure the highest quality, grown using traditional and sustainable methods. Check it out on our marketplace page!', imageUrl: getImage('product2'), likes: 256, comments: 45, createdAt: '1d ago' },
    { id: 'post-3', authorId: 'user-1', content: 'Just finished a session on Financial Literacy on SheConnects. Feeling so much more confident about managing my business finances! The trainer was fantastic. #Learning #Finance', imageUrl: getImage('postImage2'), likes: 98, comments: 22, createdAt: '2d ago' },
    { id: 'post-4', authorId: 'user-2', content: 'Mentorship has been a game-changer in my career. To all the senior professionals here, consider mentoring someone. To the juniors, don\'t be afraid to ask! It can accelerate your growth exponentially. #Mentorship #CareerGrowth', imageUrl: getImage('event1'), likes: 431, comments: 88, createdAt: '3d ago' },
     { id: 'post-5', authorId: 'user-4', content: 'Working on a new open-source library to help simplify Firebase authentication in Next.js apps. The goal is to make it easier for developers to build secure, scalable applications quickly. Any other devs interested in collaborating? #Firebase #NextJS #OpenSource', imageUrl: getImage('postImage3'), likes: 150, comments: 30, createdAt: '4d ago' },
];

export const events: Event[] = [
  { id: 'event-1', title: 'Women in Tech Global Summit', date: 'Oct 25, 2024', location: 'Online', description: 'A 3-day virtual summit featuring talks from industry leaders, workshops, and networking sessions.', imageUrl: getImage('event1'), attendees: 1500 },
  { id: 'event-2', title: 'SheConnects: Local Meetup Jaipur', date: 'Nov 12, 2024', location: 'Jaipur, India', description: 'Join us for a casual evening of networking and community building with fellow SheConnects members in the Pink City.', imageUrl: getImage('event2'), attendees: 75 },
  { id: 'event-3', title: 'Workshop: Build Your Personal Brand', date: 'Nov 20, 2024', location: 'Online', description: 'Learn how to effectively build and communicate your personal brand in this interactive workshop.', imageUrl: getImage('event3'), attendees: 200 },
];

export const conversations: Conversation[] = [
    {
        id: 'conv-1',
        participant: users[2],
        lastMessage: { id: 'msg-1', senderId: 'user-3', text: 'That sounds great! Let\'s catch up then.', timestamp: '10:45 AM' }
    },
    {
        id: 'conv-2',
        participant: users[4],
        lastMessage: { id: 'msg-2', senderId: 'user-1', text: 'Just sent over the proposal.', timestamp: 'Yesterday' }
    },
    {
        id: 'conv-3',
        participant: users[1],
        lastMessage: { id: 'msg-3', senderId: 'user-1', text: 'Thanks for the connection!', timestamp: '2 days ago' }
    }
];

export const messages: Message[] = [
    { id: 'm-1', senderId: 'user-3', text: 'Hey Alina! Thanks for reaching out. I\'d be happy to chat about mentorship.', timestamp: '10:40 AM' },
    { id: 'm-2', senderId: 'user-1', text: 'Hi Jessie, that would be amazing! I\'ve been following your work for a while. Would you be free for a quick virtual coffee next week?', timestamp: '10:42 AM' },
    { id: 'm-3', senderId: 'user-3', text: 'Absolutely! How about Tuesday at 3 PM PST?', timestamp: '10:43 AM' },
    { id: 'm-4', senderId: 'user-1', text: 'Perfect, that works for me. I\'ll send a calendar invite.', timestamp: '10:44 AM' },
    { id: 'm-5', senderId: 'user-3', text: 'That sounds great! Let\'s catch up then.', timestamp: '10:45 AM' }
];

export const suggestedConnections = users.filter(u => u.id === 'user-3' || u.id === 'user-4');

export const products: Omit<Product, 'sellerId' | 'id'>[] = [
    { name: 'Handwoven Silk Scarf', shortDescription: 'A beautiful, ethically-sourced silk scarf handwoven by artisans in a rural cooperative.', longDescription: 'This vibrant piece tells a story of tradition and craftsmanship. Made with 100% pure silk and natural dyes.', price: 2800.00, coverImage: getImage('product1-alt1'), imageUrls: [getImage('product1'), getImage('product1-alt1'), getImage('product1-alt2')], tags: ['fashion', 'accessory', 'ethical'], category: 'Apparel', attributes: ['handmade', 'rural_origin'], stock: 15, rating: 4.8, quantity: 1, verificationStatus: 'approved' },
    { name: 'Organic Spice Blend', shortDescription: 'A unique blend of organic spices grown using sustainable farming practices.', longDescription: 'Adds incredible flavor to any dish, from curries to roasted vegetables. Our blend is free from pesticides and artificial additives.', price: 800.00, coverImage: getImage('product2'), imageUrls: [getImage('product2'), getImage('product2-alt1'), getImage('product2-alt2')], tags: ['food', 'organic', 'spices'], category: 'Groceries', attributes: ['eco_friendly', 'rural_origin'], stock: 50, rating: 4.9, quantity: 1, verificationStatus: 'approved' },
    { name: 'Ceramic Coffee Mug', shortDescription: 'A sturdy and stylish handcrafted ceramic mug, perfect for your morning coffee or tea.', longDescription: 'Microwave and dishwasher safe. Each mug is uniquely glazed, making it a one-of-a-kind piece.', price: 1200.00, coverImage: getImage('product3'), imageUrls: [getImage('product3'), getImage('product3-alt1'), getImage('product3-alt2')], tags: ['homeware', 'kitchen', 'artisan'], category: 'Home Goods', attributes: ['handmade'], stock: 30, rating: 4.7, quantity: 1, verificationStatus: 'approved' },
    { name: 'Sun-dried Tomato Pesto', shortDescription: 'A delicious and tangy pesto made from sun-dried tomatoes and fresh basil.', longDescription: 'Perfect for pasta, as a sandwich spread, or a dip. Made with all-natural ingredients.', price: 650.00, coverImage: getImage('product4'), imageUrls: [getImage('product4')], tags: ['food', 'condiments', 'pesto'], category: 'Groceries', attributes: ['eco_friendly'], stock: 25, rating: 4.9, quantity: 1, verificationStatus: 'approved' },
    { name: 'Block-Printed Cotton Tote Bag', shortDescription: 'A stylish and durable tote bag made from 100% cotton, featuring traditional block-printed designs.', longDescription: 'Spacious and strong, this bag is perfect for daily use, whether you\'re heading to the market or the office.', price: 1500.00, coverImage: getImage('product5'), imageUrls: [getImage('product5')], tags: ['fashion', 'accessory', 'bag'], category: 'Accessories', attributes: ['handmade', 'eco_friendly'], stock: 20, rating: 4.6, quantity: 1, verificationStatus: 'approved' },
    { name: 'Terracotta Jewelry Set', shortDescription: 'An elegant, handmade terracotta necklace and earring set, painted with eco-friendly colors.', longDescription: 'This beautiful jewelry set is inspired by traditional Indian art forms and adds a unique, earthy touch to any outfit.', price: 2200.00, coverImage: getImage('product6'), imageUrls: [getImage('product6')], tags: ['fashion', 'jewelry', 'terracotta'], category: 'Jewelry', attributes: ['handmade', 'rural_origin', 'eco_friendly'], stock: 10, rating: 4.8, quantity: 1, verificationStatus: 'approved' },
].map((p, i) => ({ ...p, id: `prod-${i+1}`, sellerId: users[i % 2 === 0 ? 0 : 4].id }));


export const trainingPrograms: TrainingProgram[] = [
    { id: 'train-1', title: 'Digital Marketing for Beginners', description: 'Learn the fundamentals of digital marketing, including SEO, social media, and email campaigns to grow your business online. This program is ideal for those new to the digital landscape and provides actionable steps to build a strong online presence.', trainerName: 'Jessie Mei Li', level: 'Beginner', topics: ['Marketing', 'SEO', 'Social Media'], language: 'English', mode: 'online', maxParticipants: 50, coverImage: getImage('training1') },
    { id: 'train-2', title: 'Financial Literacy for Entrepreneurs', description: 'Master your business finances. This course covers budgeting, cash flow management, and how to prepare for investment. Gain the confidence to make sound financial decisions and drive sustainable growth for your venture.', trainerName: 'Ben Barnes', level: 'Intermediate', topics: ['Finance', 'Business'], language: 'English', mode: 'hybrid', maxParticipants: 25, coverImage: getImage('training2') },
    { id: 'train-3', title: 'Advanced E-commerce Strategies', description: 'Take your online store to the next level. Learn about conversion rate optimization, customer retention, and scaling your operations with cutting-edge tools. This program is for experienced sellers looking to maximize their impact.', trainerName: 'Jessie Mei Li', level: 'Advanced', topics: ['E-commerce', 'Marketing', 'Sales'], language: 'English', mode: 'online', maxParticipants: 30, coverImage: getImage('training3') },
];

export const trainingSessions: TrainingSession[] = [
    { id: 'session-1-1', programId: 'train-1', title: 'Introduction to SEO', dateTime: '2024-08-01T10:00:00Z', recordingUrl: 'https://www.youtube.com/embed/MYE6T_gd7H0', description: 'Understand the core concepts of Search Engine Optimization. Learn how to identify keywords, optimize your website content, and improve your search engine ranking to drive organic traffic. This session is perfect for anyone new to digital marketing.' },
    { id: 'session-1-2', programId: 'train-1', title: 'Social Media Marketing 101', dateTime: '2024-08-03T10:00:00Z', recordingUrl: 'https://www.youtube.com/embed/mZm8hksRaIA', description: 'An introduction to using social media for business. We will cover how to choose the right platforms, create engaging content, and build a community around your brand. Learn the dos and don\'ts of interacting with customers online.' },
    { id: 'session-1-3', programId: 'train-1', title: 'Email Campaign Basics', dateTime: '2024-08-05T10:00:00Z', recordingUrl: 'https://www.youtube.com/embed/cxk7otDsSKQ', description: 'Discover the power of email marketing. This session covers building a subscriber list, writing effective copy, and designing campaigns that convert leads into customers. Get ready to connect directly with your audience.' },
    { id: 'session-2-1', programId: 'train-2', title: 'Budgeting for Your Business', dateTime: '2024-08-10T14:00:00Z', recordingUrl: 'https://www.youtube.com/embed/2_mP7f5t21k', description: 'A practical, step-by-step guide to creating and managing a business budget. Learn to track expenses, forecast revenue, and make informed financial decisions that set you up for success.' },
    { id: 'session-2-2', programId: 'train-2', title: 'Understanding Cash Flow', dateTime: '2024-08-12T14:00:00Z', recordingUrl: 'https://www.youtube.com/embed/2_mP7f5t21k', description: 'Learn to analyze and manage your cash flow for long-term business health. We will cover cash flow statements, forecasting, and strategies for improvement to ensure your business remains resilient.' },
    { id: 'session-3-1', programId: 'train-3', title: 'Conversion Rate Optimization', dateTime: '2024-08-15T09:00:00Z', recordingUrl: 'https://www.youtube.com/embed/umC_3L3x0A4', description: 'Turn more visitors into customers. This session explores A/B testing, user experience (UX) design, and persuasive copywriting to improve your website\'s performance and boost your sales.' },
];

export const fundingOpportunities: FundingOpportunity[] = [
    {
        id: 'fund-1',
        title: 'Women Entrepreneurship Fund',
        description: 'A grant dedicated to supporting early-stage businesses led by women. Provides seed capital and mentorship.',
        eligibility: 'Woman-founded or co-founded business, less than 2 years in operation.',
        deadline: '2025-12-31',
        applicationLink: '#',
        tags: ['Grant', 'Early-Stage', 'Seed Capital'],
        funder: 'SheCapital Ventures',
        region: 'Pan-India'
    },
    {
        id: 'fund-2',
        title: 'Tech for Good Grant',
        description: 'Supports businesses using technology to address social or environmental challenges.',
        eligibility: 'Must have a technology component with a clear social impact mission.',
        deadline: '2025-11-15',
        applicationLink: '#',
        tags: ['Technology', 'Social Impact', 'Grant'],
        funder: 'Innovate Foundation',
        region: 'Global'
    },
    {
        id: 'fund-3',
        title: 'Rural Artisan Support Scheme',
        description: 'A government scheme to provide financial assistance and market access to rural artisans.',
        eligibility: 'Registered artisan with a valid artisan card, operating in a rural area.',
        deadline: '2026-01-31',
        applicationLink: '#',
        tags: ['Government', 'Artisan', 'Rural'],
        funder: 'Ministry of Textiles',
        region: 'India'
    },
     {
        id: 'fund-4',
        title: 'Green Business Loan',
        description: 'Low-interest loans for businesses focused on sustainability and eco-friendly products.',
        eligibility: 'Business must have a clear environmental-friendly model and be operational for at least 1 year.',
        deadline: '2026-06-30',
        applicationLink: '#',
        tags: ['Loan', 'Eco-friendly', 'Sustainability'],
        funder: 'GreenBank',
        region: 'Varies by Country'
    }
];