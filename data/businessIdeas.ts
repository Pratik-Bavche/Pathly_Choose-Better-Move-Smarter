import expandedIdeasJSON from './businessIdeasExpanded.json';

export interface BusinessIdea {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  setupBudget: string;
  setupBudgetCategory: 'Very Low' | 'Low' | 'Medium' | 'High';
  setupBreakdown: string[];
  monthlyCost: string;
  expectedProfit: string;
  breakEvenTime: string;
  skillsRequired: string;
  eligibility: string;
  manpower: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
  marketingTips: string;
  scalability: string;
  addons?: {
    example?: string;
    youtubeLink?: string;
    starterKit?: string;
  };
}

export const BUSINESS_CATEGORIES = [
  { id: 'local', title: '🔧 Local Services', desc: 'Repair, tailoring, beauty, tiffin' },
  { id: 'digital', title: '🧑💻 Digital / Online', desc: 'Freelancing, reselling, YouTube' },
  { id: 'creative', title: '🧵 Creative / Handmade', desc: 'Resin art, jewelry, crafts, gifts' },
  { id: 'retail', title: '🛍️ Retail / Shops', desc: 'Stationery, tea stall, mobile acc' },
  { id: 'agri', title: '🚜 Rural / Agri Businesses', desc: 'Dairy, poultry, mushroom farming' },
  { id: 'franchise', title: '📦 Franchise / Reseller', desc: 'Mobile recharge, delivery partner' },
  { id: 'food', title: '🍔 Food & Beverage', desc: 'Cloud kitchens, food trucks, cafes' },
  { id: 'health', title: '💆 Health & Wellness', desc: 'Yoga, physio, salon, mental health' },
  { id: 'education', title: '🎓 Education & Training', desc: 'Coaching, bootcamps, tutoring' },
];

const expandedIdeas: BusinessIdea[] = expandedIdeasJSON.map((item: any) => {
  let cid = 'local';
  const rawCategory = (item.category || '').toLowerCase();
  
  if (rawCategory.includes('digital') || rawCategory.includes('online')) cid = 'digital';
  else if (rawCategory.includes('creative') || rawCategory.includes('handmade')) cid = 'creative';
  else if (rawCategory.includes('retail') || rawCategory.includes('shop')) cid = 'retail';
  else if (rawCategory.includes('rural') || rawCategory.includes('agri') || rawCategory.includes('agriculture')) cid = 'agri';
  else if (rawCategory.includes('franchise') || rawCategory.includes('reseller') || rawCategory.includes('dealership')) cid = 'franchise';
  else if (rawCategory.includes('food') || rawCategory.includes('beverage')) cid = 'food';
  else if (rawCategory.includes('health') || rawCategory.includes('wellness')) cid = 'health';
  else if (rawCategory.includes('education') || rawCategory.includes('training')) cid = 'education';

  let resolvedMode: 'Offline' | 'Online' | 'Hybrid' = 'Hybrid';
  const rawMode = (item.businessMode || '').toLowerCase();
  if (rawMode.includes('online') || rawMode.includes('home')) resolvedMode = 'Online';
  if (rawMode.includes('offline')) resolvedMode = 'Offline';

  return {
    id: `expanded_${item.id}`,
    name: item.name,
    categoryId: cid,
    description: item.description,
    setupBudget: item.initialInvestment,
    setupBudgetCategory: item.investmentCategory as 'Very Low' | 'Low' | 'Medium' | 'High',
    setupBreakdown: item.toolsNeeded ? [`Tools/Equipment needed: ${item.toolsNeeded}`] : [],
    monthlyCost: item.monthlyExpenses,
    expectedProfit: item.expectedMonthlyProfit,
    breakEvenTime: item.breakEvenTime,
    skillsRequired: item.requiredSkills,
    eligibility: item.eligibility,
    manpower: item.manpowerRequired,
    mode: resolvedMode,
    marketingTips: item.marketingMethods,
    scalability: item.growthPotential,
  };
});

export const BUSINESS_IDEAS: BusinessIdea[] = [
  ...expandedIdeas,
  // Local Services
  {
    id: 'tiffin_service',
    name: 'Home-based Tiffin/Cloud Kitchen',
    categoryId: 'local',
    description: 'Providing home-cooked meals to students, bachelors, and working professionals in the area.',
    setupBudget: '₹5,000 - ₹15,000',
    setupBudgetCategory: 'Very Low',
    setupBreakdown: ['Utensils & packaging: ₹3,000', 'Initial groceries: ₹2,000', 'FSSAI Basic Reg: ₹100', 'Gas/Equipment: ₹5,000'],
    monthlyCost: '₹10,000 - ₹15,000 (Gas, Groceries, Packaging)',
    expectedProfit: '₹15,000 - ₹30,000 / month',
    breakEvenTime: '1-2 months',
    skillsRequired: 'Good cooking skills, basic hygiene, time management.',
    eligibility: 'No formal qualification. Basic FSSAI registration recommended.',
    manpower: 'Solo or 1 Helper',
    mode: 'Hybrid',
    marketingTips: 'WhatsApp groups of nearby PGs, distributing flyers outside colleges/offices, Justdial listing.',
    scalability: 'Can scale to a premium cloud kitchen, catering service, or a proper cafe.',
    addons: {
      example: 'Start with just 10 fixed customers paying ₹2,500/month to ensure guaranteed income.',
      starterKit: 'Bulk food delivery containers and thermal bags.',
    }
  },
  {
    id: 'mobile_laptop_repair',
    name: 'Mobile & Laptop Repair Service',
    categoryId: 'local',
    description: 'Diagnosing and repairing hardware and software issues for smartphones and laptops.',
    setupBudget: '₹10,000 - ₹25,000',
    setupBudgetCategory: 'Low',
    setupBreakdown: ['Repair toolkit & soldering: ₹5,000', 'Spare parts stock: ₹10,000', 'Workspace setup: ₹5,000'],
    monthlyCost: '₹3,000 - ₹5,000 (Parts, electricity)',
    expectedProfit: '₹20,000 - ₹50,000 / month',
    breakEvenTime: '2-3 months',
    skillsRequired: 'Technical repair skills.',
    eligibility: 'Short-term certificate course (Diploma/ITI or Private Institute).',
    manpower: 'Solo',
    mode: 'Offline',
    marketingTips: 'Local SEO, tie-ups with mobile accessory shops, distributing flyers locally.',
    scalability: 'Open a full tech-store, offer second-hand device sales.',
  },
  {
    id: 'tailoring_boutique',
    name: 'Tailoring & Alteration Boutique',
    categoryId: 'local',
    description: 'Stitching clothes, offering alteration services, and custom dress designing.',
    setupBudget: '₹8,000 - ₹20,000',
    setupBudgetCategory: 'Very Low',
    setupBreakdown: ['Sewing machine: ₹5,000-₹10,000', 'Threads, needles, tools: ₹2,000', 'Basic raw materials: ₹3,000'],
    monthlyCost: '₹2,000 (Electricity, minor supplies)',
    expectedProfit: '₹15,000 - ₹25,000 / month',
    breakEvenTime: '1-3 months',
    skillsRequired: 'Sewing, cutting, measurement, design sense.',
    eligibility: 'No strict requirement. A tailoring course certificate helps.',
    manpower: 'Solo initially, later 1-2 helpers',
    mode: 'Offline',
    marketingTips: 'Word of mouth, tie up with local cloth merchants, WhatsApp catalog.',
    scalability: 'Expand into a specialized designer boutique or school uniform mass-production.',
  },
  
  // Digital / Online
  {
    id: 'freelance_content',
    name: 'Freelance Content & Copywriting',
    categoryId: 'digital',
    description: 'Writing blogs, social media posts, website content, and sales copy for clients globally.',
    setupBudget: '₹0 - ₹2,000',
    setupBudgetCategory: 'Very Low',
    setupBreakdown: ['Existing Laptop/PC: ₹0', 'Internet Content: ₹500/mo', 'Domain (optional): ₹1000'],
    monthlyCost: '₹500 - ₹1,000 (Internet)',
    expectedProfit: '₹15,000 - ₹50,000+ / month',
    breakEvenTime: 'Immediate',
    skillsRequired: 'Good English/Regional language writing, basic SEO research.',
    eligibility: 'Anyone (Students especially 12th/Graduation pass).',
    manpower: 'Solo',
    mode: 'Online',
    marketingTips: 'Fiverr, Upwork, Cold messaging on LinkedIn, joining Facebook writing groups.',
    scalability: 'Start a Content Marketing Agency and hire other writers.',
    addons: {
      youtubeLink: 'Search "Freelance Copywriting for beginners" on YouTube.',
    }
  },
  {
    id: 'youtube_creator',
    name: 'YouTube Channel & Vlogging',
    categoryId: 'digital',
    description: 'Creating educational, entertainment, or review videos and earning via Ads, Sponsorships, and Affiliates.',
    setupBudget: '₹2,000 - ₹10,000',
    setupBudgetCategory: 'Very Low',
    setupBreakdown: ['Phone/Camera Tripod: ₹1,000', 'Basic Mic (e.g., Boya M1): ₹800', 'Lighting (Ring light): ₹1,000'],
    monthlyCost: 'Internet costs only initially',
    expectedProfit: 'Variable (₹0 initially, up to ₹1L+ / month later)',
    breakEvenTime: '6-12 months',
    skillsRequired: 'Communication, basic video editing, storytelling, consistency.',
    eligibility: 'No qualification needed.',
    manpower: 'Solo',
    mode: 'Online',
    marketingTips: 'Consistent posting, engaging thumbnails, YouTube Shorts to gain quick subscribers.',
    scalability: 'Build out courses, merchandise, and a media company.',
  },

  // Creative / Handmade
  {
    id: 'custom_gifts',
    name: 'Customized Gifts & Resin Art',
    categoryId: 'creative',
    description: 'Creating personalized gifts like resin keychains, frames, customized mugs, and greeting cards.',
    setupBudget: '₹5,000 - ₹15,000',
    setupBudgetCategory: 'Low',
    setupBreakdown: ['Resin kit & molds: ₹3,000', 'Craft supplies & packaging: ₹2,000', 'Sublimation printer (optional): ₹10,000'],
    monthlyCost: '₹3,000 - ₹6,000 (Restocking raw materials)',
    expectedProfit: '₹10,000 - ₹30,000 / month',
    breakEvenTime: '2-3 months',
    skillsRequired: 'Creativity, basic craft skills, attention to detail.',
    eligibility: 'Anyone.',
    manpower: 'Solo',
    mode: 'Hybrid',
    marketingTips: 'Instagram Reels showing the making process, WhatsApp Status, college events/stalls.',
    scalability: 'Set up an e-commerce website, sell pan-India through shipping partners.',
  },
  
  // Retail / Shops
  {
    id: 'tea_snacks_stall',
    name: 'Modern Tea & Snacks Stall',
    categoryId: 'retail',
    description: 'A hygienic, aesthetic stall serving varieties of tea, coffee, Maggi, and quick snacks.',
    setupBudget: '₹20,000 - ₹50,000',
    setupBudgetCategory: 'Medium',
    setupBreakdown: ['Stall/Cart setup: ₹15,000', 'Utensils & stove: ₹5,000', 'Initial Stock (Tea, sugar, snacks): ₹5,000', 'License/Permits: ₹2,000'],
    monthlyCost: '₹10,000 - ₹20,000 (Raw materials, space rent)',
    expectedProfit: '₹25,000 - ₹60,000 / month',
    breakEvenTime: '2-4 months',
    skillsRequired: 'Making good tea/snacks, customer service.',
    eligibility: 'FSSAI License.',
    manpower: '1-2 persons',
    mode: 'Offline',
    marketingTips: 'Location is marketing! Set up near colleges, IT parks, or busy markets. Maintain high hygiene.',
    scalability: 'Expand to multiple carts or a proper cafe franchise.',
  },
  {
    id: 'mobile_acc_shop',
    name: 'Mobile Accessories & Recharge Shop',
    categoryId: 'retail',
    description: 'Selling screen guards, covers, earphones, chargers, and providing mobile recharges.',
    setupBudget: '₹30,000 - ₹60,000',
    setupBudgetCategory: 'Medium',
    setupBreakdown: ['Initial Inventory (Covers, glasses, etc): ₹25,000', 'Shop deposit/rent advance: ₹20,000', 'Display boards: ₹5,000'],
    monthlyCost: '₹10,000 - ₹15,000 (Rent, electricity, restocking)',
    expectedProfit: '₹20,000 - ₹45,000 / month',
    breakEvenTime: '3-6 months',
    skillsRequired: 'Sales skills, ability to apply screen protectors.',
    eligibility: 'Anyone.',
    manpower: 'Solo',
    mode: 'Offline',
    marketingTips: 'Offer combo deals (Screen guard + Cover), attractive lighting for the shop.',
    scalability: 'Add second-hand mobile sales and electronic gadgets.',
  },

  // Rural / Agri
  {
    id: 'poultry_farming',
    name: 'Small-scale Poultry Farming',
    categoryId: 'agri',
    description: 'Raising chickens for eggs (layers) or meat (broilers).',
    setupBudget: '₹50,000 - ₹1,00,000',
    setupBudgetCategory: 'Medium',
    setupBreakdown: ['Shed construction (bamboo/cheap materials): ₹20,000', 'Chicks (500 birds): ₹15,000', 'Feed & Medicine: ₹20,000', 'Equipments: ₹5,000'],
    monthlyCost: '₹10,000 - ₹25,000 (Feed and vaccines)',
    expectedProfit: '₹20,000 - ₹40,000 / batch (mostly 45 days for broilers)',
    breakEvenTime: '3-5 months',
    skillsRequired: 'Knowledge of bird health, temperature management.',
    eligibility: 'Training from KVK (Krishi Vigyan Kendra) highly recommended.',
    manpower: '1-2 persons',
    mode: 'Offline',
    marketingTips: 'Direct tie-up with local butchers, restaurants/dhabas, and wholesale egg markets.',
    scalability: 'Expand shed size, start own retail outlet for fresh meat.',
    addons: {
      starterKit: 'Brooder, feeders, waterers, and initial vaccine kit.',
    }
  },
  {
    id: 'mushroom_farming',
    name: 'Mushroom Cultivation',
    categoryId: 'agri',
    description: 'Growing high-demand mushrooms like Oyster or Button mushrooms in customized dark rooms.',
    setupBudget: '₹15,000 - ₹30,000',
    setupBudgetCategory: 'Low',
    setupBreakdown: ['Spawn (seeds): ₹2,000', 'Straw/Substrate: ₹3,000', 'Polythene bags & chemicals: ₹2,000', 'Room temp setup (fans/foggers): ₹10,000'],
    monthlyCost: '₹5,000 (Recurring spawn & straw)',
    expectedProfit: '₹15,000 - ₹35,000 / month',
    breakEvenTime: '2-3 months',
    skillsRequired: 'Technical knowledge of humidity, temperature, and hygiene maintenance.',
    eligibility: 'Short training course on Mushroom Cultivation.',
    manpower: 'Solo or 1 Helper',
    mode: 'Offline',
    marketingTips: 'Sell directly to supermarkets, local vegetable vendors, and hotels.',
    scalability: 'Move to AC rooms for year-round premium button mushroom production.',
  },

  // Franchise / Reseller
  {
    id: 'insurance_posp',
    name: 'Insurance POSP (Point of Sales Person)',
    categoryId: 'franchise',
    description: 'Selling basic insurance products (health, motor, term life) on behalf of companies.',
    setupBudget: '₹0 - ₹1,000',
    setupBudgetCategory: 'Very Low',
    setupBreakdown: ['Registration/Training fee: ₹0-₹500', 'Smartphone/Internet: ₹0'],
    monthlyCost: '₹500 (Travel/Internet)',
    expectedProfit: '₹10,000 - ₹50,000+ / month (Commission based)',
    breakEvenTime: 'Immediate',
    skillsRequired: 'Networking, explaining terms clearly, relationship building.',
    eligibility: '10th Pass minimum, IRDAI Basic POSP Certification (usually online and 15 hours).',
    manpower: 'Solo',
    mode: 'Hybrid',
    marketingTips: 'Start with family and friends, organize small free "health awareness" camps.',
    scalability: 'Build a massive client base, passive renewal income.',
  },
  {
    id: 'common_service_center',
    name: 'CSC / Jan Seva Kendra',
    categoryId: 'franchise',
    description: 'Providing PAN card, Aadhaar prints, bills payment, and govt scheme forms filing services.',
    setupBudget: '₹30,000 - ₹50,000',
    setupBudgetCategory: 'Medium',
    setupBreakdown: ['PC/Laptop: ₹20,000', 'Printer & Scanner: ₹10,000', 'Lamination machine & Setup: ₹5,000', 'CSC ID Registration: ₹1,500'],
    monthlyCost: '₹3,000 - ₹6,000 (Internet, paper, shop rent if any)',
    expectedProfit: '₹15,000 - ₹35,000 / month',
    breakEvenTime: '3-6 months',
    skillsRequired: 'Basic computer operation, form filling accuracy.',
    eligibility: '10th Pass, TEC Certification (Telecentre Entrepreneur Course).',
    manpower: 'Solo',
    mode: 'Offline',
    marketingTips: 'Clear signboard, tie-ups with local cyber cafes or stationary spots without these facilities.',
    scalability: 'Add banking correspondent services, train ticketing (IRCTC), insurance sales.',
  }
];
