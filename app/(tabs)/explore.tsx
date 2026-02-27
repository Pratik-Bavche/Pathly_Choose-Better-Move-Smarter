import { useLocalSearchParams } from 'expo-router';
import { BookMarked, Briefcase, Building2, ChevronDown, ChevronUp, GraduationCap, MapPin, Search, Star, Wrench } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';

const EDUCATION_PATHWAYS = [
  {
    id: 'hs_streams',
    title: 'Higher Secondary Streams (Class 11–12)',
    description: 'The foundation for higher education. Choose a stream based on your career interests.',
    icon: <BookMarked color="#1976d2" size={24} />,
    details: [
      '• Science (PCM/PCB): For Engineering, Medical, Architecture, and Pure Sciences.',
      '• Commerce: For Business, Finance, Accounting (CA/CS/CMA), and Economics.',
      '• Arts/Humanities: For Civil Services, Law, Design, Journalism, and Social Sciences.',
      '• Boards: CBSE, CISCE, State Boards, and Open Schooling (NIOS).'
    ]
  },
  {
    id: 'diploma',
    title: 'Diploma (Polytechnic) Programs',
    description: '3-year practical programs right after 10th. Offers lateral entry direct to 2nd year B.Tech/B.E.',
    icon: <Building2 color="#1976d2" size={24} />,
    details: [
      '• Engineering Diplomas: Mechanical, Civil, Computer, Electronics, Electrical.',
      '• Allied Diplomas: Design, Architecture Assistantship, Hospitality, Pharmacy.',
      '• Healthcare Diplomas: DMLT, X-Ray Tech, Nursing Assistant.',
    ]
  },
  {
    id: 'iti',
    title: 'ITI (Industrial Training Institute)',
    description: 'Short-term training focusing on practical vocational trades for direct employment.',
    icon: <Wrench color="#1976d2" size={24} />,
    details: [
      '• Engineering Trades: Fitter, Electrician, Welder, Machinist, Draftsman.',
      '• Non-Engineering Trades: COPA (Computer Operator), Dress Making, Stenography.',
    ]
  },
  {
    id: 'vocational',
    title: 'Vocational & Certificate Courses',
    description: 'Short-term skill-based programs designed to make you industry-ready quickly.',
    icon: <Briefcase color="#1976d2" size={24} />,
    details: [
      '• Popular Fields: Beauty & Wellness, Electronics Repair, Hardware & Networking, Computing.',
      '• Other Skills: Tailoring, Culinary Arts, Front Office Management, Retail.',
    ]
  },
  {
    id: 'undergrad',
    title: 'Undergraduate Degree Programs (After 12th)',
    description: '3 to 5-year bachelor degree programs for professional and academic careers.',
    icon: <GraduationCap color="#1976d2" size={24} />,
    details: [
      '• Programs: Engineering (B.E/B.Tech), Medicine (MBBS/BDS), Science (B.Sc), Commerce (B.Com), Arts (B.A).',
      '• Specialized Degrees: Law (LLB), Design (B.Des), Hospitality (BHM), Nursing, Pharmacy.',
      '• Key Entrance Exams: JEE (Engineering), NEET (Medical), NATA (Architecture), CUET (Central Universities).'
    ]
  },
  {
    id: 'specialized',
    title: 'Specialized Fields',
    description: 'Niche, fast-growing career paths with highly specialized training.',
    icon: <Star color="#1976d2" size={24} />,
    details: [
      '• Paramedical Sciences, Physiotherapy, and Occupational Therapy.',
      '• Agriculture, Forestry, and Veterinary Sciences.',
      '• Fashion Design, Animation, VFX, and Multimedia.',
      '• Forensic Science, Sports Sciences, and Aviation.'
    ]
  },
  {
    id: 'bridge',
    title: 'Bridge / Pre-University Paths',
    description: 'Alternative pathways and foundation programs to transition to university.',
    icon: <MapPin color="#1976d2" size={24} />,
    details: [
      '• Open Schooling (NIOS) for flexible learning.',
      '• Foundation / Coaching integrated programs for competitive exams.',
      '• International Curricula (IB, A-Levels).',
      '• Lateral-Entry Pathways from Diploma to Degree.'
    ]
  },
  {
    id: 'certification',
    title: 'Professional / Technical Certifications',
    description: 'Industry-recognized credentials to upskill or reskill at any stage.',
    icon: <BookMarked color="#1976d2" size={24} />,
    details: [
      '• IT Certifications: Cisco (CCNA), AWS, Microsoft, CompTIA.',
      '• Business & Finance: Tally, Accounting Software, Digital Marketing.',
      '• Tech Skills: Programming Bootcamps, UI/UX Design Certifications.',
    ]
  },
  {
    id: 'alternative',
    title: 'Other Alternative Education Paths',
    description: 'Flexible learning, apprenticeships, and government initiatives.',
    icon: <Building2 color="#1976d2" size={24} />,
    details: [
      '• Apprenticeships (Skill India) for earn-while-you-learn opportunities.',
      '• Open Universities & Distance Learning (e.g., IGNOU).',
      '• NSDC Skill Programs and Government Upskilling Schemes.',
      '• Specialized Academies: Sports Academies, Fine Arts Institutes.'
    ]
  }
];

export default function ExploreScreen() {
  const { category: categoryParam, search: searchParam } = useLocalSearchParams();
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (searchParam) {
      setSearch(searchParam as string);
    } else {
      setSearch('');
    }
  }, [searchParam]);

  const filteredItems = EDUCATION_PATHWAYS.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, searchParam && styles.headerCompact]}>
        <Text style={styles.headerTitle}>Explore Education Options</Text>
        <Text style={styles.headerSubtitle}>Discover all major pathways after 10th and 12th</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#888" size={20} />
          <TextInput
            placeholder="Search pathways, streams, degrees..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <View style={styles.listContainer}>
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.pathwayCard, isExpanded && styles.pathwayCardExpanded]}
                onPress={() => setExpandedId(isExpanded ? null : item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    {item.icon}
                  </View>
                  <View style={styles.cardHeaderDetails}>
                    <Text style={styles.pathwayTitle}>{item.title}</Text>
                    <Text style={styles.pathwayDesc} numberOfLines={isExpanded ? undefined : 2}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={styles.expandIcon}>
                    {isExpanded ? <ChevronUp color="#888" size={20} /> : <ChevronDown color="#888" size={20} />}
                  </View>
                </View>

                {isExpanded && (
                  <View style={styles.cardExpandedContent}>
                    <View style={styles.divider} />
                    {item.details.map((detail, index) => (
                      <Text key={index} style={styles.detailText}>
                        {detail}
                      </Text>
                    ))}
                    <TouchableOpacity style={styles.learnMoreBtn}>
                      <Text style={styles.learnMoreText}>Find Associated Courses</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {filteredItems.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.noResults}>No matching pathways found.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafc' },
  header: { backgroundColor: '#0d47a1', padding: 24, paddingTop: 60, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, marginBottom: 20 },
  headerCompact: { paddingTop: 40, paddingBottom: 16, marginBottom: 12 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#ffffff', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 14, color: '#e3f2fd', marginTop: 6, opacity: 0.9 },
  searchContainer: { paddingHorizontal: 24, marginBottom: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, borderWidth: 1, borderColor: '#e1efff', elevation: 2, shadowColor: '#0d47a1', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 15, color: '#333' },
  listContainer: { flex: 1, paddingHorizontal: 20 },
  scrollArea: { flex: 1 },
  pathwayCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f9',
    elevation: 2,
    shadowColor: '#1976d2',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  pathwayCardExpanded: {
    borderColor: '#bbdefb',
    backgroundColor: '#ffffff',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  iconContainer: { width: 48, height: 48, backgroundColor: '#eef6ff', borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  cardHeaderDetails: { flex: 1, justifyContent: 'center' },
  pathwayTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 6 },
  pathwayDesc: { fontSize: 13, color: '#666', lineHeight: 18 },
  expandIcon: { paddingLeft: 8, paddingTop: 4 },
  cardExpandedContent: { marginTop: 12 },
  divider: { height: 1, backgroundColor: '#f0f4f8', marginBottom: 16, marginTop: 4 },
  detailText: { fontSize: 14, color: '#444', marginBottom: 10, lineHeight: 22 },
  learnMoreBtn: {
    marginTop: 12,
    backgroundColor: '#eef6ff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  learnMoreText: { color: '#1976d2', fontWeight: 'bold', fontSize: 14 },
  emptyContainer: { alignItems: 'center', paddingTop: 40 },
  noResults: { color: '#888', fontSize: 15 },
});
