import { JobCategory } from "./types";
import { data as governmentpublicsector } from "./jobs/governmentpublicsector";
import { data as logisticswarehouse } from "./jobs/logisticswarehouse";
import { data as agricultureruraltech } from "./jobs/agricultureruraltech";
import { data as creativedigitalroles } from "./jobs/creativedigitalroles";
import { data as vocationalselfemployment } from "./jobs/vocationalselfemployment";
import { data as freelanceworkfromhome } from "./jobs/freelanceworkfromhome";
import { data as officeadministration } from "./jobs/officeadministration";
import { data as salesmarketing } from "./jobs/salesmarketing";
import { data as healthcaremedicalsupport } from "./jobs/healthcaremedicalsupport";
import { data as factoryindustrial } from "./jobs/factoryindustrial";
import { data as retailstoremanagement } from "./jobs/retailstoremanagement";
import { data as transportdelivery } from "./jobs/transportdelivery";
import { data as itdigitalservices } from "./jobs/itdigitalservices";

export * from "./types";

export const JOB_FILTERS = [
  { id: "all", label: "All" },
  { id: "Government", label: "🏛 Government" },
  { id: "Private", label: "🏢 Private" },
  { id: "Remote", label: "💻 Remote" },
  { id: "high_salary", label: "💰 High Salary" },
  { id: "Apprenticeship", label: "🎓 Apprenticeship" },
  { id: "no_exam", label: "✅ No Exam" },
];

export const JOB_CATEGORIES: JobCategory[] = [
  governmentpublicsector,
  logisticswarehouse,
  agricultureruraltech,
  creativedigitalroles,
  vocationalselfemployment,
  freelanceworkfromhome,
  officeadministration,
  salesmarketing,
  healthcaremedicalsupport,
  factoryindustrial,
  retailstoremanagement,
  transportdelivery,
  itdigitalservices,
];
