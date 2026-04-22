export type CourseMode = "Online" | "Offline" | "Blended";

export type SpecialBadge =
  | "High Salary"
  | "Remote Friendly"
  | "Future Skill"
  | "Global Certification"
  | "Govt Sponsored"
  | "Self-Employment"
  | "Industry Skill"
  | "Field Job"
  | "Freelancing"
  | "Stable Career"
  | "Corporate Jobs"
  | "Free Course"
  | "Rural Support"
  | "Work From Home"
  | "Short Duration"
  | "Social Impact"
  | "Creative Skill"
  | "No Degree Required"
  | "Industry Recognition";

export interface SkillCourse {
  id: string;
  name: string;
  duration: string;
  eligibility: string;
  certAuthority: string;
  mode: CourseMode;
  platforms: string[];
  jobRoles: string[];
  salaryLabel: string;
  salaryMin: number;
  badges: SpecialBadge[];
  tags: string[];
  isFree?: boolean;
  forQual: string[];
  applyUrl?: string;
  courseFees: string;
  careerGrowth: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  iconBg: string;
  accentColor: string;
  description: string;
  courses: SkillCourse[];
}

export type JobType =
  | "Government"
  | "Private"
  | "Remote"
  | "Apprenticeship"
  | "Freelance"
  | "Field";

export interface JobCard {
  id: string;
  title: string;
  shortDesc: string;
  eligibility: string;
  skills: string[];
  salaryMin: number;
  salaryMax: number;
  salaryLabel: string;
  jobType: JobType;
  applySource: string;
  applyUrl: string; // official portal link for Apply Now
  nextStep: "Apply Now" | "Prepare" | "Skill Required";
  isExamBased?: boolean;
  tags: string[]; // for filter
}

export interface JobCategory {
  id: string;
  title: string;
  icon: string; // emoji
  color: string; // card bg color
  iconBg: string; // icon bg
  accentColor: string;
  description: string;
  jobs: JobCard[];
}
