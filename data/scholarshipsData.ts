import rawData from './scholarships.json';

export interface Scholarship {
  id: number;
  name: string;
  category: string;
  type: string;
  applicableLevels: string[];
  eligibility: {
    qualification: string;
    minPercentage: string;
    familyIncomeLimit: string;
    category: string;
    gender: string;
    stateConditions: string;
  };
  amount: string;
  documents: string[];
  applicationProcess: string[];
  portal: string;
  applyLink: string;
  timeline: string;
  renewalConditions: string;
  stateApplicability: string;
  forGirls: boolean;
  forDisabled: boolean;
  forMinority: boolean;
  incomeLimit: string;
  tags: string[];
}

export const ALL_SCHOLARSHIPS: Scholarship[] = rawData as Scholarship[];

/** Returns a rotating "scholarship of the week" based on current week number */
export function getScholarshipOfTheWeek(): Scholarship {
  const weekNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  const index = weekNumber % ALL_SCHOLARSHIPS.length;
  return ALL_SCHOLARSHIPS[index];
}

/** Filter scholarships by education level */
export function getScholarshipsByLevel(level: string): Scholarship[] {
  return ALL_SCHOLARSHIPS.filter(s =>
    s.applicableLevels.some(l => l.toLowerCase().includes(level.toLowerCase()))
  );
}

/** Filter by category keywords */
export function getScholarshipsByCategory(keyword: string): Scholarship[] {
  const kw = keyword.toLowerCase();
  return ALL_SCHOLARSHIPS.filter(
    s =>
      s.category.toLowerCase().includes(kw) ||
      s.type.toLowerCase().includes(kw) ||
      s.tags.some(t => t.toLowerCase().includes(kw))
  );
}

/** Filter for girls-only scholarships */
export function getGirlsScholarships(): Scholarship[] {
  return ALL_SCHOLARSHIPS.filter(s => s.forGirls);
}

/** Filter Maharashtra-specific */
export function getMaharashtraScholarships(): Scholarship[] {
  return ALL_SCHOLARSHIPS.filter(s =>
    s.stateApplicability.toLowerCase().includes('maharashtra')
  );
}
