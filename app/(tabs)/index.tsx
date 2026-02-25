import { useRouter } from 'expo-router';
import { BookOpen, Briefcase, ChevronRight, GraduationCap, Rocket, Wrench } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PATHS = [
  { id: 'edu', title: 'Further Education', icon: BookOpen, desc: 'Streams, degrees, colleges', color: '#e3f2fd', iconColor: '#1e88e5' },
  { id: 'job', title: 'Start Working', icon: Briefcase, desc: 'Govt & private jobs', color: '#e8f5e9', iconColor: '#43a047' },
  { id: 'skill', title: 'Skill Courses', icon: Wrench, desc: 'Certifications, vocations', color: '#fff3e0', iconColor: '#fb8c00' },
  { id: 'business', title: 'Start a Business', icon: Rocket, desc: 'Ideas & freelance', color: '#f3e5f5', iconColor: '#8e24aa' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState('edu');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Student! 👋</Text>
        <Text style={styles.subGreeting}>Let's chart your career roadmap</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What would you like to explore?</Text>
        <View style={styles.grid}>
          {PATHS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedPath === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.pathCard, { backgroundColor: item.color }, isSelected && styles.activeCard]}
                onPress={() => setSelectedPath(item.id)}
              >
                <Icon color={item.iconColor} size={32} style={styles.pathIcon} />
                <Text style={styles.pathTitle}>{item.title}</Text>
                <Text style={styles.pathDesc}>{item.desc}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        {selectedPath === 'edu' && (
          <View>
            <RecommendationCard
              title="B.Sc Computer Science"
              subtitle="Duration: 3 Years • Avg Salary: ₹4L - ₹8L"
              onPress={() => router.push('/(tabs)/explore')}
              icon={GraduationCap}
            />
            <RecommendationCard
              title="Diploma in IT"
              subtitle="Duration: 2 Years • Fast-track career"
              onPress={() => router.push('/(tabs)/explore')}
              icon={GraduationCap}
            />
          </View>
        )}
        {selectedPath === 'job' && (
          <View>
            <RecommendationCard
              title="Data Entry Operator"
              subtitle="Private • 12th Pass • ₹15k - ₹25k/mo"
              onPress={() => { }}
              icon={Briefcase}
            />
            <RecommendationCard
              title="SSC CHSL (Govt)"
              subtitle="Govt Exam • 12th Pass • Secure limits"
              onPress={() => { }}
              icon={Briefcase}
            />
          </View>
        )}
        {selectedPath === 'skill' && (
          <View>
            <RecommendationCard
              title="Graphic Design Course"
              subtitle="3 Months • Skill India • High demand"
              onPress={() => { }}
              icon={Wrench}
            />
          </View>
        )}
        {selectedPath === 'business' && (
          <View>
            <RecommendationCard
              title="Freelance Content Writing"
              subtitle="0 Investment • High Income Potential"
              onPress={() => { }}
              icon={Rocket}
            />
          </View>
        )}
      </View>
    </ScrollView>
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
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { backgroundColor: '#0d47a1', padding: 24, paddingTop: 60, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  subGreeting: { fontSize: 16, color: '#e3f2fd', marginTop: 8 },
  section: { padding: 24, paddingTop: 32 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  pathCard: { width: '48%', padding: 16, borderRadius: 16, marginBottom: 16, minHeight: 140 },
  activeCard: { borderWidth: 2, borderColor: '#1976d2' },
  pathIcon: { marginBottom: 12 },
  pathTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  pathDesc: { fontSize: 12, color: '#666' },
  recCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fcfcfc', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  recIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#e3f2fd', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  recDetails: { flex: 1 },
  recTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  recSub: { fontSize: 12, color: '#666' }
});
