import { useRouter } from 'expo-router';
import { BookOpen, Briefcase, ChevronRight, FileText, GraduationCap, Rocket, Trophy, Wrench } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedPath, setSelectedPath] = useState('edu');

  const PATHS = [
    { id: 'edu', title: t('further_edu'), icon: BookOpen, desc: t('further_edu_desc'), color: '#e3f2fd', iconColor: '#1e88e5' },
    { id: 'job', title: t('start_working'), icon: Briefcase, desc: t('start_working_desc'), color: '#e8f5e9', iconColor: '#43a047' },
    { id: 'skill', title: t('skill_courses'), icon: Wrench, desc: t('skill_courses_desc'), color: '#fff3e0', iconColor: '#fb8c00' },
    { id: 'business', title: t('start_business'), icon: Rocket, desc: t('start_business_desc'), color: '#f3e5f5', iconColor: '#8e24aa' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{t('hello_student')}</Text>
        <Text style={styles.subGreeting}>{t('home_subtitle')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('explore_section')}</Text>
        <View style={styles.grid}>
          {PATHS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedPath === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.pathCard, { backgroundColor: item.color }, isSelected && styles.activeCard]}
                onPress={() => {
                  setSelectedPath(item.id);
                  router.push({ pathname: '/(tabs)/explore', params: { category: item.id } });
                }}
              >
                <Icon color={item.iconColor} size={28} style={styles.pathIcon} />
                <Text style={styles.pathTitle}>{item.title}</Text>
                <Text style={styles.pathDesc} numberOfLines={1}>{item.desc}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.recCard, { backgroundColor: '#fff8e1', borderColor: '#fef3c7', marginBottom: 12 }]}>
          <View style={[styles.recIconWrap, { backgroundColor: '#fef3c7' }]}>
            <Trophy color="#f39c12" size={24} />
          </View>
          <View style={styles.recDetails}>
            <Text style={styles.recTitle}>{t('scholarship_title')}</Text>
            <Text style={styles.recSub}>{t('scholarship_name')}</Text>
          </View>
          <ChevronRight color="#ccc" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.recCard, { backgroundColor: '#f8faff', marginBottom: 16 }]}>
          <View style={[styles.recIconWrap, { backgroundColor: '#e8eaf6' }]}>
            <FileText color="#3f51b5" size={24} />
          </View>
          <View style={styles.recDetails}>
            <Text style={styles.recTitle}>{t('resume_instant_title')}</Text>
            <Text style={styles.recSub}>{t('build_resume')}</Text>
          </View>
          <ChevronRight color="#ccc" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('recommended')}</Text>
          <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)/explore', params: { category: selectedPath } })}>
            <Text style={styles.seeMoreText}>{t('see_more')}</Text>
          </TouchableOpacity>
        </View>

        {selectedPath === 'edu' && (
          <>
            <RecommendationCard
              title="B.Sc Computer Science"
              subtitle="Duration: 3 Years • Avg Salary: ₹4L - ₹8L"
              onPress={() => router.push({ pathname: '/(tabs)/explore', params: { search: 'B.Sc Computer Science' } })}
              icon={GraduationCap}
            />
            <View style={{ height: 18 }} />
            <RecommendationCard
              title="Diploma in IT"
              subtitle="Duration: 2 Years • Fast-track career"
              onPress={() => router.push({ pathname: '/(tabs)/explore', params: { search: 'Diploma in IT' } })}
              icon={GraduationCap}
            />
          </>
        )}
        {selectedPath === 'job' && (
          <>
            <RecommendationCard
              title="Data Entry Operator"
              subtitle="Private • 12th Pass • ₹15k - ₹25k/mo"
              onPress={() => router.push({ pathname: '/(tabs)/explore', params: { search: 'Data Entry Operator' } })}
              icon={Briefcase}
            />
            <View style={{ height: 16 }} />
            <RecommendationCard
              title="SSC CHSL (Govt)"
              subtitle="Govt Exam • 12th Pass • Secure limits"
              onPress={() => router.push({ pathname: '/(tabs)/explore', params: { search: 'SSC CHSL' } })}
              icon={Briefcase}
            />
          </>
        )}
        {selectedPath === 'skill' && (
          <>
            <RecommendationCard
              title="Graphic Design Course"
              subtitle="3 Months • Skill India • High demand"
              onPress={() => router.push({ pathname: '/(tabs)/explore', params: { search: 'Graphic Design' } })}
              icon={Wrench}
            />
            <View style={{ height: 16 }} />
            <RecommendationCard
              title="Digital Marketing"
              subtitle="2 Months • Certification • Remote Work"
              onPress={() => router.push({ pathname: '/(tabs)/explore', params: { search: 'Digital Marketing' } })}
              icon={Wrench}
            />
          </>
        )}
        {selectedPath === 'business' && (
          <>
            <RecommendationCard
              title="Freelance Content Writing"
              subtitle="0 Investment • High Income Potential"
              onPress={() => router.push({ pathname: '/(tabs)/explore', params: { search: 'Content Writing' } })}
              icon={Rocket}
            />
            <View style={{ height: 16 }} />
            <RecommendationCard
              title="Dropshipping Basics"
              subtitle="Low Investment • E-commerce"
              onPress={() => router.push({ pathname: '/(tabs)/explore', params: { search: 'Dropshipping' } })}
              icon={Rocket}
            />
          </>
        )}

        <View style={{ height: 50 }} />
      </View>
    </View>
  );
}

function RecommendationCard({ title, subtitle, onPress, icon: Icon }: any) {
  return (
    <TouchableOpacity style={styles.recCard} onPress={onPress}>
      <View style={styles.recIconWrap}>
        <Icon color="#1976d2" size={24} />
      </View>
      <View style={styles.recDetails}>
        <Text style={styles.recTitle}>{title}</Text>
        <Text style={styles.recSub}>{subtitle}</Text>
      </View>
      <ChevronRight color="#ccc" size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', paddingBottom: 110 }, // Increased padding for more gap above tabs
  header: { backgroundColor: '#0d47a1', paddingHorizontal: 24, paddingTop: 50, paddingBottom: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, marginBottom: 4 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  subGreeting: { fontSize: 16, color: '#e3f2fd', marginTop: 4 },
  section: { paddingHorizontal: 24, paddingVertical: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 19, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  seeMoreText: { fontSize: 14, color: '#1976d2', fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  pathCard: {
    width: '48%',
    padding: 16,
    borderRadius: 20, // Clean, consistent radius
    marginBottom: 12,
    minHeight: 120,
    backgroundColor: '#fff', // Ensure solid background for clean corners
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  activeCard: { borderWidth: 2, borderColor: '#1976d2' },
  pathIcon: { marginBottom: 10 },
  pathTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  pathDesc: { fontSize: 12, color: '#666' },

  recCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 14, // Slightly increased from 12
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  recIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#e3f2fd', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  recDetails: { flex: 1 },
  recTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 2 },
  recSub: { fontSize: 13, color: '#666' }
});
