import { SkillCategory } from "./types";
import { data as digitalit } from "./skills/digitalit";
import { data as technicalengineering } from "./skills/technicalengineering";
import { data as creativemedia } from "./skills/creativemedia";
import { data as healthcareallied } from "./skills/healthcareallied";
import { data as businessfinance } from "./skills/businessfinance";
import { data as vocationaltrades } from "./skills/vocationaltrades";
import { data as agriculturegreenenergy } from "./skills/agriculturegreenenergy";
import { data as remotemicrojobeconomy } from "./skills/remotemicrojobeconomy";
import { data as logisticssupplychain } from "./skills/logisticssupplychain";
import { data as deliverygigwork } from "./skills/deliverygigwork";
import { data as officeadminjobs } from "./skills/officeadminjobs";
import { data as hospitalitytourism } from "./skills/hospitalitytourism";
import { data as governmentjobsprepentrance } from "./skills/governmentjobsprepentrance";
import { data as govtsponsoredskillprograms } from "./skills/govtsponsoredskillprograms";

export * from "./types";

export const SKILL_FILTERS = [
  { id: "all", label: "All" },
  { id: "high_salary", label: "💰 High Salary" },
  { id: "short_duration", label: "⚡ Short (<3 Months)" },
  { id: "free", label: "🆓 Free / Govt" },
  { id: "remote", label: "🌐 Remote / WFH" },
  { id: "self_employment", label: "🛒 Self-Employment" },
  { id: "future_skill", label: "🚀 Future Skill" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  digitalit,
  technicalengineering,
  creativemedia,
  healthcareallied,
  businessfinance,
  vocationaltrades,
  agriculturegreenenergy,
  remotemicrojobeconomy,
  logisticssupplychain,
  deliverygigwork,
  officeadminjobs,
  hospitalitytourism,
  governmentjobsprepentrance,
  govtsponsoredskillprograms,
];

export const QUAL_COURSE_MAP: Record<string, string[]> = {
  "10th": [
    "vocational",
    "agri_green",
    "govt_skill",
    "remote_economy",
    "digital_it",
    "logistics",
    "delivery_gig",
    "hospitality_tourism",
    "govt_jobs",
  ],
  "12th_sci": [
    "healthcare",
    "technical",
    "digital_it",
    "creative",
    "agri_green",
    "logistics",
    "hospitality_tourism",
    "govt_jobs",
  ],
  "12th_com": [
    "business",
    "digital_it",
    "creative",
    "remote_economy",
    "govt_skill",
    "logistics",
    "delivery_gig",
    "office_admin",
    "hospitality_tourism",
    "govt_jobs",
  ],
  iti: [
    "technical",
    "vocational",
    "agri_green",
    "digital_it",
    "govt_skill",
    "logistics",
    "govt_jobs",
  ],
  diploma: [
    "technical",
    "digital_it",
    "business",
    "creative",
    "agri_green",
    "logistics",
    "office_admin",
    "hospitality_tourism",
    "govt_jobs",
  ],
  graduation: [
    "digital_it",
    "business",
    "creative",
    "technical",
    "remote_economy",
    "office_admin",
    "hospitality_tourism",
    "govt_jobs",
  ],
};
