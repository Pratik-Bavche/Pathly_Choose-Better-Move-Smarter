import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ArrowLeft, Briefcase, Download, Edit3, Eye, FileText, GraduationCap, Mail, MapPin, Phone, Plus, User, Trash2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Share } from 'react-native';

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: { school: string; degree: string; year: string }[];
  experience: { company: string; role: string; duration: string; desc: string }[];
  skills: string[];
}

export default function ResumeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [resume, setResume] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: 'Highly motivated student looking for opportunities to grow...',
    education: [],
    experience: [],
    skills: []
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const parsed = JSON.parse(data);
        setResume(prev => ({
          ...prev,
          name: parsed.full_name || parsed.name || '',
          email: parsed.email || '',
          location: parsed.location || '',
          skills: parsed.interests || [],
          education: parsed.education_level ? [{ school: 'My High School', degree: parsed.education_level, year: '2024' }] : []
        }));
      }
    } catch (e) {}
  };

  const handleShare = async () => {
     try {
       await Share.share({
         message: `Resume of ${resume.name}\n\nEducation: ${resume.education.map(e => e.degree).join(', ')}\nSkills: ${resume.skills.join(', ')}`,
         title: `${resume.name} Resume`
       });
     } catch (e) {}
  };

  const addEducation = () => {
    setResume({ ...resume, education: [...resume.education, { school: '', degree: '', year: '' }] });
  };

  const addExperience = () => {
    setResume({ ...resume, experience: [...resume.experience, { company: '', role: '', duration: '', desc: '' }] });
  };

  const renderEdit = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      {/* Personal Info */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}><User size={18} color="#0d47a1" /> Personal Information</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Full Name" 
          value={resume.name} 
          onChangeText={(val) => setResume({...resume, name: val})} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Email Address" 
          keyboardType="email-address"
          value={resume.email} 
          onChangeText={(val) => setResume({...resume, email: val})} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Phone Number" 
          keyboardType="phone-pad"
          value={resume.phone} 
          onChangeText={(val) => setResume({...resume, phone: val})} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Location (City, State)" 
          value={resume.location} 
          onChangeText={(val) => setResume({...resume, location: val})} 
        />
        <TextInput 
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]} 
          placeholder="Career Summary" 
          multiline
          value={resume.summary} 
          onChangeText={(val) => setResume({...resume, summary: val})} 
        />
      </View>

      {/* Education */}
      <View style={styles.formSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}><GraduationCap size={18} color="#0d47a1" /> Education</Text>
          <TouchableOpacity onPress={addEducation}><Plus size={20} color="#0d47a1" /></TouchableOpacity>
        </View>
        {resume.education.map((edu, i) => (
          <View key={i} style={styles.itemCard}>
            <TextInput style={styles.input} placeholder="School/College" value={edu.school} onChangeText={(v) => {
              const next = [...resume.education]; next[i].school = v; setResume({...resume, education: next});
            }} />
            <TextInput style={styles.input} placeholder="Degree/Course" value={edu.degree} onChangeText={(v) => {
              const next = [...resume.education]; next[i].degree = v; setResume({...resume, education: next});
            }} />
            <TextInput style={styles.input} placeholder="Year" value={edu.year} onChangeText={(v) => {
              const next = [...resume.education]; next[i].year = v; setResume({...resume, education: next});
            }} />
          </View>
        ))}
      </View>

      {/* Experience */}
      <View style={styles.formSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}><Briefcase size={18} color="#0d47a1" /> Experience / Projects</Text>
          <TouchableOpacity onPress={addExperience}><Plus size={20} color="#0d47a1" /></TouchableOpacity>
        </View>
        {resume.experience.map((exp, i) => (
          <View key={i} style={styles.itemCard}>
            <TextInput style={styles.input} placeholder="Company/Project Name" value={exp.company} onChangeText={(v) => {
               const next = [...resume.experience]; next[i].company = v; setResume({...resume, experience: next});
            }} />
            <TextInput style={styles.input} placeholder="Role" value={exp.role} onChangeText={(v) => {
               const next = [...resume.experience]; next[i].role = v; setResume({...resume, experience: next});
            }} />
            <TextInput style={styles.input} placeholder="Duration" value={exp.duration} onChangeText={(v) => {
               const next = [...resume.experience]; next[i].duration = v; setResume({...resume, experience: next});
            }} />
          </View>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );

  const renderPreview = () => (
    <ScrollView style={styles.previewContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.a4Page}>
        {/* Banner */}
        <View style={styles.previewHeaderBorder} />
        <Text style={styles.prevName}>{resume.name || 'Your Name'}</Text>
        <View style={styles.prevContactRow}>
          {resume.email ? <Text style={styles.prevContact}><Mail size={12} color="#666" /> {resume.email}</Text> : null}
          {resume.phone ? <Text style={styles.prevContact}><Phone size={12} color="#666" /> {resume.phone}</Text> : null}
          {resume.location ? <Text style={styles.prevContact}><MapPin size={12} color="#666" /> {resume.location}</Text> : null}
        </View>

        <View style={styles.divider} />

        {/* Summary */}
        <Text style={styles.prevSectionTitle}>PROFESSIONAL SUMMARY</Text>
        <Text style={styles.prevText}>{resume.summary}</Text>

        {/* Exp */}
        {resume.experience.length > 0 && (
          <>
            <Text style={[styles.prevSectionTitle, {marginTop: 20}]}>EXPERIENCE</Text>
            {resume.experience.map((exp, i) => (
              <View key={i} style={styles.prevExpItem}>
                <View style={styles.prevRow}>
                  <Text style={styles.prevBold}>{exp.role} @ {exp.company}</Text>
                  <Text style={styles.prevDate}>{exp.duration}</Text>
                </View>
                {exp.desc ? <Text style={styles.prevTextSmall}>{exp.desc}</Text> : null}
              </View>
            ))}
          </>
        )}

        {/* Edu */}
        <Text style={[styles.prevSectionTitle, {marginTop: 20}]}>EDUCATION</Text>
        {resume.education.map((edu, i) => (
          <View key={i} style={styles.prevExpItem}>
            <View style={styles.prevRow}>
              <Text style={styles.prevBold}>{edu.degree}</Text>
              <Text style={styles.prevDate}>{edu.year}</Text>
            </View>
            <Text style={styles.prevTextSmall}>{edu.school}</Text>
          </View>
        ))}

        {/* Skills */}
        <Text style={[styles.prevSectionTitle, {marginTop: 20}]}>SKILLS</Text>
        <View style={styles.prevSkillsRow}>
          {resume.skills.map((sk, i) => (
            <View key={i} style={styles.prevSkillChip}>
              <Text style={styles.prevSkillText}>{sk}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resume Builder</Text>
        <TouchableOpacity onPress={handleShare}>
          <Download color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'edit' && styles.activeTab]} 
          onPress={() => setActiveTab('edit')}
        >
          <Edit3 size={18} color={activeTab === 'edit' ? '#0d47a1' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'edit' && styles.activeTabText]}>Edit Details</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'preview' && styles.activeTab]} 
          onPress={() => setActiveTab('preview')}
        >
          <Eye size={18} color={activeTab === 'preview' ? '#0d47a1' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'preview' && styles.activeTabText]}>Preview</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'edit' ? renderEdit() : renderPreview()}

      {activeTab === 'edit' && (
         <TouchableOpacity style={styles.primaryBtn} onPress={() => setActiveTab('preview')}>
            <Text style={styles.primaryBtnText}>Preview Resume</Text>
         </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  header: { 
    backgroundColor: '#0d47a1', 
    paddingTop: 50, 
    paddingBottom: 20, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, margin: 16, padding: 4, elevation: 2 },
  tab: { flex: 1, paddingVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, borderRadius: 10 },
  activeTab: { backgroundColor: '#e3f2fd' },
  tabText: { fontSize: 14, color: '#666', fontWeight: '500' },
  activeTabText: { color: '#0d47a1', fontWeight: 'bold' },
  scroll: { paddingHorizontal: 16 },
  formSection: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, elevation: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0d47a1', marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { backgroundColor: '#f8faff', borderWidth: 1, borderColor: '#e1efff', borderRadius: 10, padding: 12, marginBottom: 10, fontSize: 15 },
  itemCard: { padding: 12, backgroundColor: '#fefefe', borderRadius: 10, borderLeftWidth: 3, borderLeftColor: '#0d47a1', marginBottom: 10 },
  primaryBtn: { 
    position: 'absolute', bottom: 30, left: 20, right: 20, 
    backgroundColor: '#0d47a1', padding: 16, borderRadius: 14, 
    alignItems: 'center', elevation: 4 
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // Preview Styles
  previewContainer: { flex: 1, padding: 16 },
  a4Page: { 
    backgroundColor: '#fff', 
    minHeight: 500, 
    padding: 24, 
    borderRadius: 8, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10 
  },
  previewHeaderBorder: { height: 6, backgroundColor: '#0d47a1', width: 60, marginBottom: 16 },
  prevName: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  prevContactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  prevContact: { fontSize: 11, color: '#666', flexDirection: 'row', alignItems: 'center', gap: 4 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 14 },
  prevSectionTitle: { fontSize: 13, fontWeight: '800', color: '#0d47a1', letterSpacing: 1.2, marginBottom: 10 },
  prevText: { fontSize: 12, color: '#444', lineHeight: 18 },
  prevTextSmall: { fontSize: 11, color: '#666', lineHeight: 16, marginTop: 4 },
  prevExpItem: { marginBottom: 12 },
  prevRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  prevBold: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  prevDate: { fontSize: 11, color: '#888' },
  prevSkillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  prevSkillChip: { backgroundColor: '#f0f4f8', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14 },
  prevSkillText: { fontSize: 11, color: '#333', fontWeight: '500' }
});
