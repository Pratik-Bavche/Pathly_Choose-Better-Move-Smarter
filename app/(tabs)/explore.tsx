import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, BookOpen, Briefcase, Building, ChevronDown, ChevronRight, ChevronUp, GraduationCap, Plane, Rocket, Target, Trophy, Wrench } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BRANCH_DETAILS } from '../../data/educationDetails';

const QUALIFICATIONS = [
  { id: '10th', title: 'After 10th', subtitle: 'Start your foundation journey', icon: <BookOpen color="#1976d2" size={28} /> },
  { id: '12th', title: 'After 12th', subtitle: 'Choose your professional degree', icon: <GraduationCap color="#1976d2" size={28} /> },
  { id: 'diploma', title: 'After Diploma', subtitle: 'Advance your technical career', icon: <Wrench color="#1976d2" size={28} /> },
  { id: 'iti', title: 'After ITI', subtitle: 'Level up your vocational skills', icon: <Target color="#1976d2" size={28} /> },
  { id: 'graduation', title: 'After Graduation', subtitle: 'Master degrees & top jobs', icon: <Trophy color="#1976d2" size={28} /> },
];

const PATHWAYS: Record<string, { id: string; title: string; tags: string[]; desc: string; icon: React.ReactNode }[]> = {
  '10th': [
    { id: 'dip', title: 'Diploma (Polytechnic)', tags: ['Govt Job', 'Private Job', 'High Salary', 'Higher Study', 'Study Abroad'], desc: '3-year engineering & non-engineering practical programs.', icon: <Building color="#1976d2" size={20} /> },
    { id: 'iti', title: 'ITI Courses', tags: ['Govt Job', 'Private Job', 'Skill-Based', 'Study Abroad'], desc: 'Government recognized short-term vocational training.', icon: <Wrench color="#1976d2" size={20} /> },
    { id: 'para', title: 'Paramedical', tags: ['Govt Job', 'Private Job', 'High Salary', 'Skill-Based', 'Study Abroad'], desc: 'DMLT, X-Ray Technician, Assistant roles in healthcare.', icon: <Target color="#1976d2" size={20} /> },
    { id: 'hs', title: 'Higher Secondary (11-12)', tags: ['Govt Job', 'High Salary', 'Higher Study', 'Study Abroad'], desc: 'Science, Commerce, Arts streams for higher education.', icon: <BookOpen color="#1976d2" size={20} /> },
    { id: 'voc', title: 'Vocational Courses', tags: ['Private Job', 'Skill-Based'], desc: 'Short-term training for quick employment in various sectors.', icon: <Briefcase color="#1976d2" size={20} /> },
    { id: 'bridge', title: 'Open Schooling / Bridge', tags: ['Govt Job', 'Higher Study'], desc: 'NIOS or foundation courses for competitive exams.', icon: <BookOpen color="#1976d2" size={20} /> }
  ],
  '12th': [
    { id: 'it', title: 'Computer & IT', tags: ['Govt Job', 'Private Job', 'High Salary', 'Study Abroad', 'Skill-Based'], desc: 'BCA, Cyber Security, Data Science, Cloud, Multimedia.', icon: <Building color="#1976d2" size={20} /> },
    { id: 'med', title: 'Medical & Healthcare', tags: ['Govt Job', 'Private Job', 'High Salary', 'Higher Study', 'Study Abroad'], desc: 'MBBS, BDS, Nursing, Pharmacy, Physiotherapy.', icon: <Target color="#1976d2" size={20} /> },
    { id: 'eng', title: 'Engineering & Tech', tags: ['Govt Job', 'Private Job', 'High Salary', 'Higher Study', 'Study Abroad'], desc: 'B.Tech/B.E in CS, Mechanical, Civil, AI, etc.', icon: <Wrench color="#1976d2" size={20} /> },
    { id: 'com', title: 'Commerce & Mgmt', tags: ['Govt Job', 'Private Job', 'High Salary', 'Higher Study'], desc: 'B.Com, BBA, CA, CS, CMA for banking and business.', icon: <Briefcase color="#1976d2" size={20} /> },
    { id: 'des', title: 'Design & Creative', tags: ['Private Job', 'Skill-Based', 'Study Abroad'], desc: 'Fashion, Interior, Graphic Design, B.Arch, Animation.', icon: <Target color="#1976d2" size={20} /> },
    { id: 'arts', title: 'Arts, Humanities, Law', tags: ['Govt Job', 'Private Job', 'High Salary', 'Higher Study'], desc: 'B.A., BA LLB, Journalism, Civil Services prep.', icon: <BookOpen color="#1976d2" size={20} /> },
    { id: 'hosp', title: 'Hospitality & Aviation', tags: ['Private Job', 'Skill-Based', 'Study Abroad'], desc: 'Hotel Management, Travel & Tourism, Culinary Arts.', icon: <Plane color="#1976d2" size={20} /> },
    { id: 'gov', title: 'Govt & Defense Exams', tags: ['Govt Job', 'High Salary'], desc: 'NDA, SSC, Banking, Police and Defense services.', icon: <Trophy color="#1976d2" size={20} /> },
    { id: 'sci', title: 'Pure Science & Research', tags: ['Govt Job', 'Private Job', 'Higher Study'], desc: 'B.Sc in Physics, Chem, Bio, Agriculture, Biotech.', icon: <BookOpen color="#1976d2" size={20} /> }
  ],
  'diploma': [
    { id: 'dip_gov', title: 'Government Jobs (JE)', tags: ['Govt Job', 'High Salary'], desc: 'SSC JE, RRB JE, PSU Technical Posts, State Electricity.', icon: <Building color="#1976d2" size={20} /> },
    { id: 'dip_priv', title: 'Private Sector', tags: ['Private Job', 'Skill-Based', 'High Salary', 'Study Abroad'], desc: 'Core Engineering, IT, Manufacturing, Abroad Jobs.', icon: <Wrench color="#1976d2" size={20} /> },
    { id: 'dip_lat', title: 'B.Tech (Lateral Entry)', tags: ['Higher Study', 'High Salary', 'Study Abroad'], desc: 'Direct 2nd-year B.Tech admission for higher growth.', icon: <GraduationCap color="#1976d2" size={20} /> },
    { id: 'dip_bde', title: 'Bachelor Degrees', tags: ['Higher Study', 'Private Job', 'High Salary'], desc: 'BCA, B.Sc IT, BBA for IT/Management progression.', icon: <Briefcase color="#1976d2" size={20} /> },
    { id: 'dip_amie', title: 'AMIE Equivalency', tags: ['Higher Study', 'Govt Job', 'Private Job'], desc: 'Equivalent to B.Tech for working professionals.', icon: <BookOpen color="#1976d2" size={20} /> }
  ],
  'iti': [
    { id: 'iti_gov', title: 'Government Jobs', tags: ['Govt Job', 'High Salary'], desc: 'Railway Technician, PSU, State Electricity Boards.', icon: <Building color="#1976d2" size={20} /> },
    { id: 'iti_priv', title: 'Private Jobs', tags: ['Private Job', 'Skill-Based', 'High Salary', 'Study Abroad'], desc: 'Electrician, Fitter, Welder, HVAC, CNC Operator.', icon: <Wrench color="#1976d2" size={20} /> },
    { id: 'iti_app', title: 'Apprenticeships', tags: ['Govt Job', 'Private Job', 'Skill-Based'], desc: 'Paid industry training (Railways, PSUs, Private).', icon: <Briefcase color="#1976d2" size={20} /> },
    { id: 'iti_lat', title: 'Diploma (Lateral Entry)', tags: ['Higher Study', 'High Salary'], desc: 'Direct 2nd-year entry to Polytechnic Diploma.', icon: <GraduationCap color="#1976d2" size={20} /> },
    { id: 'iti_adv', title: 'Advanced ITI Courses', tags: ['Higher Study', 'Skill-Based', 'Study Abroad', 'High Salary'], desc: 'CNC, PLC, HVAC, Industrial Safety Specializations.', icon: <BookOpen color="#1976d2" size={20} /> }
  ],
  'graduation': [
    { id: 'grad_gov', title: 'Government Exams', tags: ['Govt Job', 'High Salary', 'Higher Study'], desc: 'UPSC, SSC CGL, Banking, State PSC.', icon: <Building color="#1976d2" size={20} /> },
    { id: 'grad_pg', title: 'Postgraduate Degrees', tags: ['Private Job', 'Higher Study', 'High Salary'], desc: 'MBA, M.Tech, MCA, MD/MS, MA, M.Sc.', icon: <GraduationCap color="#1976d2" size={20} /> },
    { id: 'grad_prof', title: 'Professional Courses', tags: ['Private Job', 'High Salary'], desc: 'CA, CS, CMA, Data Certifications.', icon: <Briefcase color="#1976d2" size={20} /> },
    { id: 'grad_skill', title: 'Skill Certifications', tags: ['Skill-Based', 'Private Job', 'High Salary'], desc: 'Data Science, Cyber Security, Cloud Computing.', icon: <Wrench color="#1976d2" size={20} /> },
    { id: 'grad_abroad', title: 'Study Abroad', tags: ['Study Abroad', 'Higher Study', 'High Salary'], desc: 'MS, MBA, Healthcare Programs Abroad.', icon: <Plane color="#1976d2" size={20} /> },
    { id: 'grad_res', title: 'Research & Academic', tags: ['Higher Study', 'Govt Job', 'Study Abroad'], desc: 'Ph.D., M.Tech (Research), Academic roles.', icon: <BookOpen color="#1976d2" size={20} /> },
    { id: 'grad_ent', title: 'Entrepreneurship', tags: ['Entrepreneurship', 'Private Job', 'High Salary'], desc: 'Tech Startup, Consulting, Digital Agency.', icon: <Target color="#1976d2" size={20} /> }
  ]
};

const FILTERS = ['All', 'Govt Job', 'Private Job', 'Higher Study', 'High Salary', 'Skill-Based', 'Study Abroad', 'Entrepreneurship'];

export default function ExploreScreen() {
  const { category: categoryParam } = useLocalSearchParams();
  const [selectedQual, setSelectedQual] = useState<string | null>(null);
  const [selectedPathway, setSelectedPathway] = useState<{ id: string, title: string } | null>(null);
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // We check if "category" means the user explicitly clicked "Explore Education Options" from another screen
  // For context, they will just arrive here. If they want to reset, they hit the back arrow.
  useFocusEffect(
    useCallback(() => {
      // Reset state when tab is focused, preventing retained states 
      setSelectedQual(null);
      setSelectedPathway(null);
      setExpandedBranch(null);
      setActiveFilter('All');
    }, [])
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Your Qualification</Text>
      <Text style={styles.stepSubtitle}>To show you the most relevant educational pathways</Text>

      <View style={styles.qualGrid}>
        {QUALIFICATIONS.map((qual) => (
          <TouchableOpacity
            key={qual.id}
            style={styles.qualCard}
            onPress={() => {
              setSelectedQual(qual.id);
              setActiveFilter('All');
            }}
            activeOpacity={0.8}
          >
            <View style={styles.qualIconWrapper}>
              {qual.icon}
            </View>
            <View style={styles.qualTextContainer}>
              <Text style={styles.qualTitle}>{qual.title}</Text>
              <Text style={styles.qualSubtitle}>{qual.subtitle}</Text>
            </View>
            <ChevronRight color="#ccc" size={20} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => {
    if (!selectedQual) return null;
    const currentQual = QUALIFICATIONS.find(q => q.id === selectedQual);
    const options = PATHWAYS[selectedQual] || [];

    const filteredOptions = activeFilter === 'All'
      ? options
      : options.filter(opt => opt.tags.includes(activeFilter));

    return (
      <View style={styles.stepContainer}>
        {/* Step 2 Header */}
        <View style={styles.backRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedQual(null)}
          >
            <ArrowLeft color="#1976d2" size={22} />
          </TouchableOpacity>
          <Text style={styles.selectedQualHeader}>{currentQual?.title} Options</Text>
        </View>

        {/* Filters */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>What is your goal?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {FILTERS.map(filter => (
              <TouchableOpacity
                key={filter}
                style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results List */}
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.resultsScroll} contentContainerStyle={styles.resultsContent}>
          {filteredOptions.map(opt => (
            <TouchableOpacity
              key={opt.id}
              style={styles.pathwayCard}
              activeOpacity={0.7}
              onPress={() => setSelectedPathway({ id: opt.id, title: opt.title })}
            >
              <View style={styles.pathwayHeader}>
                <View style={styles.iconBox}>
                  {opt.icon}
                </View>
                <View style={styles.pathwayInfo}>
                  <Text style={styles.pathwayName}>{opt.title}</Text>
                  <Text style={styles.pathwayDesc}>{opt.desc}</Text>

                  <View style={styles.tagsRow}>
                    {opt.tags.map(tag => (
                      <View key={tag} style={styles.microTag}>
                        <Text style={styles.microTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <ChevronRight color="#1976d2" size={20} style={{ alignSelf: 'center', opacity: 0.5 }} />
              </View>
            </TouchableOpacity>
          ))}

          {filteredOptions.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No options found for this filter.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const renderStep3 = () => {
    if (!selectedPathway) return null;
    const branches = BRANCH_DETAILS[selectedPathway.id] || [];

    return (
      <View style={styles.stepContainer}>
        {/* Step 3 Header */}
        <View style={styles.backRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setSelectedPathway(null);
              setExpandedBranch(null);
            }}
          >
            <ArrowLeft color="#1976d2" size={22} />
          </TouchableOpacity>
          <Text style={styles.selectedQualHeader} numberOfLines={1}>{selectedPathway.title}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.resultsScroll} contentContainerStyle={styles.resultsContent}>
          {branches.length > 0 ? branches.map((branch: any) => {
            const isExpanded = expandedBranch === branch.id;
            return (
              <View key={branch.id} style={[styles.branchCard, isExpanded && styles.branchCardExpanded]}>
                <TouchableOpacity
                  style={styles.branchHeader}
                  onPress={() => setExpandedBranch(isExpanded ? null : branch.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.branchTitle}>{branch.title}</Text>
                  {isExpanded ? <ChevronUp color="#1976d2" size={20} /> : <ChevronDown color="#888" size={20} />}
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.branchDetails}>
                    <Text style={styles.branchDesc}>{branch.desc}</Text>

                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Duration:</Text>
                      <Text style={styles.detailValue}>{branch.duration}</Text>
                    </View>

                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Eligibility:</Text>
                      <Text style={styles.detailValue}>{branch.eligibility}</Text>
                    </View>

                    <Text style={styles.detailSubtitle}>🏛️ Govt Jobs / Options:</Text>
                    {branch.govt.map((g: string, i: number) => (
                      <Text key={i} style={styles.listItem}>• {g}</Text>
                    ))}

                    <Text style={[styles.detailSubtitle, { marginTop: 12 }]}>💼 Private Sector Roles:</Text>
                    {branch.private.map((p: string, i: number) => (
                      <Text key={i} style={styles.listItem}>• {p}</Text>
                    ))}

                    <Text style={[styles.detailSubtitle, { marginTop: 12 }]}>🎓 Higher Study Paths:</Text>
                    {branch.higher.map((h: string, i: number) => (
                      <Text key={i} style={styles.listItem}>• {h}</Text>
                    ))}
                  </View>
                )}
              </View>
            );
          }) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Detailed branches for this pathway are coming soon!</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  let headerTitle = 'Explore Pathways';
  let headerSubtitle = 'Discover your perfect career route';

  if (categoryParam === 'job') {
    headerTitle = 'Start Working';
    headerSubtitle = 'Find job opportunities tailored for you';
  } else if (categoryParam === 'skill') {
    headerTitle = 'Skill Courses';
    headerSubtitle = 'Short-term certifications to boost your career';
  } else if (categoryParam === 'business') {
    headerTitle = 'Start a Business';
    headerSubtitle = 'Entrepreneurship pathways and startups';
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
      </View>

      {(!categoryParam || categoryParam === 'edu') ? (
        selectedPathway
          ? renderStep3()
          : selectedQual
            ? renderStep2()
            : renderStep1()
      ) : (
        <View style={[styles.stepContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          {categoryParam === 'job' && <Briefcase color="#ccc" size={60} style={{ marginBottom: 20 }} />}
          {categoryParam === 'skill' && <Wrench color="#ccc" size={60} style={{ marginBottom: 20 }} />}
          {categoryParam === 'business' && <Rocket color="#ccc" size={60} style={{ marginBottom: 20 }} />}

          <Text style={[styles.stepTitle, { textAlign: 'center', color: '#888' }]}>
            Coming Soon
          </Text>
          <Text style={[styles.stepSubtitle, { textAlign: 'center' }]}>
            We are building the perfect {headerTitle} pathways for you. Check back soon!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8ff' },
  header: {
    backgroundColor: '#0d47a1',
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#ffffff', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 14, color: '#e3f2fd', marginTop: 4, opacity: 0.9 },

  stepContainer: { flex: 1, padding: 20 },
  stepTitle: { fontSize: 20, fontWeight: 'bold', color: '#0d47a1', marginBottom: 4 },
  stepSubtitle: { fontSize: 14, color: '#666', marginBottom: 20 },

  qualGrid: { gap: 14 },
  qualCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1efff',
    elevation: 2,
    shadowColor: '#1976d2',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  qualIconWrapper: {
    width: 50, height: 50,
    borderRadius: 14,
    backgroundColor: '#f0f6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  qualTextContainer: { flex: 1 },
  qualTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  qualSubtitle: { fontSize: 13, color: '#666', marginTop: 4 },

  // Step 2 Styles
  backRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: '#e1efff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  selectedQualHeader: { fontSize: 20, fontWeight: 'bold', color: '#0d47a1' },

  filterSection: { marginBottom: 16 },
  filterLabel: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 10 },
  filterScroll: { gap: 8, paddingBottom: 10 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d0e3ff',
    marginRight: 10
  },
  filterChipActive: { backgroundColor: '#1976d2', borderColor: '#1976d2' },
  filterText: { color: '#1976d2', fontWeight: '500', fontSize: 13 },
  filterTextActive: { color: '#ffffff', fontWeight: 'bold' },

  resultsScroll: { flex: 1 },
  resultsContent: { paddingBottom: 40 },
  pathwayCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e1efff',
    elevation: 2,
    shadowColor: '#1976d2',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  pathwayHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  iconBox: {
    width: 44, height: 44,
    borderRadius: 12,
    backgroundColor: '#f5f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e1efff'
  },
  pathwayInfo: { flex: 1, paddingRight: 8 },
  pathwayName: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 4 },
  pathwayDesc: { fontSize: 13, color: '#666', lineHeight: 18, marginBottom: 10 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  microTag: { backgroundColor: '#f0f0f0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  microTagText: { fontSize: 10, color: '#555', fontWeight: '500' },

  emptyState: { padding: 40, alignItems: 'center' },
  emptyStateText: { color: '#888', fontStyle: 'italic', textAlign: 'center' },

  // Step 3 (Branch details)
  branchCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1efff',
    elevation: 2,
    shadowColor: '#1976d2',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    overflow: 'hidden'
  },
  branchCardExpanded: {
    borderColor: '#bbdefb',
  },
  branchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  branchTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', flex: 1, paddingRight: 10 },
  branchDetails: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#fafcff',
    borderTopWidth: 1,
    borderTopColor: '#f0f6ff'
  },
  branchDesc: { fontSize: 13, color: '#555', lineHeight: 18, marginBottom: 12, marginTop: 12 },
  detailItem: { flexDirection: 'row', marginBottom: 6 },
  detailLabel: { fontSize: 13, fontWeight: 'bold', color: '#1976d2', width: 75 },
  detailValue: { fontSize: 13, color: '#333', flex: 1 },
  detailSubtitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 6, marginTop: 8 },
  listItem: { fontSize: 13, color: '#555', marginBottom: 4, paddingLeft: 8, lineHeight: 18 }
});
