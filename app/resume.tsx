import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ArrowLeft, Briefcase, Download, Edit3, Eye, FileText, GraduationCap, Mail, MapPin, Phone, Plus, User, Trash2, Layout } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Share, Image } from 'react-native';
import { generateResumeHtml } from '../lib/resumeGenerators';
import { useLanguage } from '../context/LanguageContext';

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

export const TEMPLATES = [
  { id: 'modern', name: 'Modern Blue', color: '#0d47a1' },
  { id: 'minimal', name: 'Minimalist', color: '#333' },
  { id: 'creative', name: 'Creative Sidebar', color: '#6a1b9a' },
  { id: 'corporate', name: 'Corporate', color: '#263238' },
  { id: 'elegant', name: 'Elegant Serif', color: '#b71c1c' },
  { id: 'sleek', name: 'Sleek Dark', color: '#1a1a1a' },
  { id: 'vibrant', name: 'Vibrant Pulse', color: '#00c853' },
  { id: 'professional', name: 'Classic Pro', color: '#1565c0' },
  { id: 'executive', name: 'Executive Gold', color: '#ff8f00' },
  { id: 'tech', name: 'Tech Startup', color: '#00bcd4' },
];

export default function ResumeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'templates'>('edit');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [resume, setResume] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: 'Highly motivated professional with experience in building efficient solutions...',
    education: [{ school: '', degree: '', year: '' }],
    experience: [{ company: '', role: '', duration: '', desc: '' }],
    skills: ['JavaScript', 'React Native']
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
          skills: parsed.interests && parsed.interests.length > 0 ? parsed.interests : prev.skills,
          education: parsed.education_level ? [{ school: 'Enter Institute', degree: parsed.education_level, year: '2024' }] : prev.education
        }));
      }
    } catch (e) {}
  };

  const handleDownload = async () => {
     try {
       const html = generateResumeHtml(resume, selectedTemplate);
       const { uri } = await Print.printToFileAsync({ html });
       await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
     } catch (e) {
       Alert.alert('Error', 'Failed to generate PDF. Please try again.');
     }
  };

  const addEducation = () => {
    setResume({ ...resume, education: [...resume.education, { school: '', degree: '', year: '' }] });
  };

  const removeEducation = (index: number) => {
    const list = [...resume.education];
    list.splice(index, 1);
    setResume({ ...resume, education: list });
  };

  const addExperience = () => {
    setResume({ ...resume, experience: [...resume.experience, { company: '', role: '', duration: '', desc: '' }] });
  };

  const removeExperience = (index: number) => {
    const list = [...resume.experience];
    list.splice(index, 1);
    setResume({ ...resume, experience: list });
  };

  const addSkill = () => {
    setResume({ ...resume, skills: [...resume.skills, ''] });
  };

  const removeSkill = (index: number) => {
    const list = [...resume.skills];
    list.splice(index, 1);
    setResume({ ...resume, skills: list });
  };

  const updateSkill = (val: string, index: number) => {
    const list = [...resume.skills];
    list[index] = val;
    setResume({ ...resume, skills: list });
  };

  const renderEdit = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      {/* Personal Info */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}><User size={18} color="#0d47a1" /> {t('personal_info')}</Text>
        <TextInput 
          style={styles.input} 
          placeholder={t('full_name_ph')}
          value={resume.name} 
          onChangeText={(val) => setResume({...resume, name: val})} 
        />
        <TextInput 
          style={styles.input} 
          placeholder={t('email_ph')}
          keyboardType="email-address"
          autoCapitalize="none"
          value={resume.email} 
          onChangeText={(val) => setResume({...resume, email: val})} 
        />
        <TextInput 
          style={styles.input} 
          placeholder={t('phone_ph')}
          keyboardType="phone-pad"
          value={resume.phone} 
          onChangeText={(val) => setResume({...resume, phone: val})} 
        />
        <TextInput 
          style={styles.input} 
          placeholder={t('location_ph')}
          value={resume.location} 
          onChangeText={(val) => setResume({...resume, location: val})} 
        />
        <TextInput 
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]} 
          placeholder={t('summary_ph')}
          multiline
          value={resume.summary} 
          onChangeText={(val) => setResume({...resume, summary: val})} 
        />
      </View>

      {/* Skills */}
      <View style={styles.formSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}><Edit3 size={18} color="#0d47a1" /> {t('skills_info')}</Text>
          <TouchableOpacity onPress={addSkill} style={styles.circleAddBtn}><Plus size={18} color="#fff" /></TouchableOpacity>
        </View>
        <View style={styles.skillsGrid}>
          {resume.skills.map((skill, index) => (
            <View key={index} style={styles.skillInputWrapper}>
              <TextInput 
                style={[styles.input, { marginBottom: 0, flex: 1, paddingVertical: 8 }]} 
                placeholder={t('skill_name_ph')}
                value={skill} 
                onChangeText={(val) => updateSkill(val, index)} 
              />
              <TouchableOpacity onPress={() => removeSkill(index)} style={styles.removeBtnInline}>
                <Trash2 size={16} color="#ff1744" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Education */}
      <View style={styles.formSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}><GraduationCap size={18} color="#0d47a1" /> {t('edu_info')}</Text>
          <TouchableOpacity onPress={addEducation} style={styles.circleAddBtn}><Plus size={18} color="#fff" /></TouchableOpacity>
        </View>
        {resume.education.map((edu, i) => (
          <View key={i} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemCount}>{t('edu_count')}#{i + 1}</Text>
              <TouchableOpacity onPress={() => removeEducation(i)}><Trash2 size={18} color="#ff1744" /></TouchableOpacity>
            </View>
            <TextInput style={styles.input} placeholder={t('school_ph')} value={edu.school} onChangeText={(v) => {
              const next = [...resume.education]; next[i].school = v; setResume({...resume, education: next});
            }} />
            <TextInput style={styles.input} placeholder={t('degree_ph')} value={edu.degree} onChangeText={(v) => {
              const next = [...resume.education]; next[i].degree = v; setResume({...resume, education: next});
            }} />
            <TextInput style={styles.input} placeholder={t('year_ph')} value={edu.year} onChangeText={(v) => {
              const next = [...resume.education]; next[i].year = v; setResume({...resume, education: next});
            }} />
          </View>
        ))}
      </View>

      {/* Experience */}
      <View style={styles.formSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}><Briefcase size={18} color="#0d47a1" /> {t('exp_info')}</Text>
          <TouchableOpacity onPress={addExperience} style={styles.circleAddBtn}><Plus size={18} color="#fff" /></TouchableOpacity>
        </View>
        {resume.experience.map((exp, i) => (
          <View key={i} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemCount}>{t('item_count')}#{i + 1}</Text>
              <TouchableOpacity onPress={() => removeExperience(i)}><Trash2 size={18} color="#ff1744" /></TouchableOpacity>
            </View>
            <TextInput style={styles.input} placeholder={t('company_ph')} value={exp.company} onChangeText={(v) => {
               const next = [...resume.experience]; next[i].company = v; setResume({...resume, experience: next});
            }} />
            <TextInput style={styles.input} placeholder={t('role_ph')} value={exp.role} onChangeText={(v) => {
               const next = [...resume.experience]; next[i].role = v; setResume({...resume, experience: next});
            }} />
            <TextInput style={styles.input} placeholder={t('duration_ph')} value={exp.duration} onChangeText={(v) => {
               const next = [...resume.experience]; next[i].duration = v; setResume({...resume, experience: next});
            }} />
            <TextInput 
              style={[styles.input, { height: 60, textAlignVertical: 'top' }]} 
              placeholder={t('desc_ph')}
              multiline
              value={exp.desc} 
              onChangeText={(v) => {
                const next = [...resume.experience]; next[i].desc = v; setResume({...resume, experience: next});
              }} 
            />
          </View>
        ))}
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );

  const renderTemplates = () => (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.templatesGrid}>
        {TEMPLATES.map((tpl) => (
          <TouchableOpacity 
            key={tpl.id} 
            style={[
              styles.templateCard, 
              selectedTemplate === tpl.id && { borderColor: tpl.color, borderWidth: 2, backgroundColor: tpl.color + '05' }
            ]}
            onPress={() => {
              setSelectedTemplate(tpl.id);
              setActiveTab('preview');
            }}
          >
            <View style={[styles.templateHeaderLine, { backgroundColor: tpl.color }]} />
            <Text style={[styles.templateName, selectedTemplate === tpl.id && { color: tpl.color }]}>{tpl.name}</Text>
            <View style={styles.templatePreviewMock}>
              <View style={[styles.mockLine, { width: '80%' }]} />
              <View style={[styles.mockLine, { width: '40%' }]} />
              <View style={[styles.mockSection, { marginTop: 10 }]}>
                <View style={[styles.mockLine, { width: '100%', height: 4 }]} />
                <View style={[styles.mockLine, { width: '100%', height: 4 }]} />
              </View>
            </View>
            {selectedTemplate === tpl.id && (
              <View style={[styles.selectedBadge, { backgroundColor: tpl.color }]}>
                <Text style={styles.badgeText}>Selected</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );

  const renderPreview = () => (
    <ScrollView style={styles.previewContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.previewControls}>
        <Text style={styles.previewInfo}>Previewing: {TEMPLATES.find(t => t.id === selectedTemplate)?.name}</Text>
      </View>
      
      <View style={styles.a4Page}>
        {/* Simplified React Native Preview - The actual PDF will have full template styling */}
        <View style={[styles.previewHeaderBorder, { backgroundColor: TEMPLATES.find(t => t.id === selectedTemplate)?.color || '#0d47a1' }]} />
        <Text style={styles.prevName}>{resume.name || 'Your Name'}</Text>
        <View style={styles.prevContactRow}>
          {resume.email ? <Text style={styles.prevContact}><Mail size={12} color="#666" /> {resume.email}</Text> : null}
          {resume.phone ? <Text style={styles.prevContact}><Phone size={12} color="#666" /> {resume.phone}</Text> : null}
          {resume.location ? <Text style={styles.prevContact}><MapPin size={12} color="#666" /> {resume.location}</Text> : null}
        </View>

        <View style={styles.divider} />

        <Text style={[styles.prevSectionTitle, { color: TEMPLATES.find(t => t.id === selectedTemplate)?.color || '#0d47a1' }]}>PROFESSIONAL SUMMARY</Text>
        <Text style={styles.prevText}>{resume.summary}</Text>

        {resume.experience.length > 0 && (
          <>
            <Text style={[styles.prevSectionTitle, {marginTop: 20, color: TEMPLATES.find(t => t.id === selectedTemplate)?.color || '#0d47a1'}]}>EXPERIENCE / PROJECTS</Text>
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

        <Text style={[styles.prevSectionTitle, {marginTop: 20, color: TEMPLATES.find(t => t.id === selectedTemplate)?.color || '#0d47a1'}]}>EDUCATION</Text>
        {resume.education.map((edu, i) => (
          <View key={i} style={styles.prevExpItem}>
            <View style={styles.prevRow}>
              <Text style={styles.prevBold}>{edu.degree}</Text>
              <Text style={styles.prevDate}>{edu.year}</Text>
            </View>
            <Text style={styles.prevTextSmall}>{edu.school}</Text>
          </View>
        ))}

        <Text style={[styles.prevSectionTitle, {marginTop: 20, color: TEMPLATES.find(t => t.id === selectedTemplate)?.color || '#0d47a1'}]}>SKILLS</Text>
        <View style={styles.prevSkillsRow}>
          {resume.skills.map((sk, i) => (
            sk ? (
              <View key={i} style={styles.prevSkillChip}>
                <Text style={styles.prevSkillText}>{sk}</Text>
              </View>
            ) : null
          ))}
        </View>
      </View>
      
      <TouchableOpacity style={styles.downloadFloatingBtn} onPress={handleDownload}>
         <Download color="#fff" size={24} />
         <Text style={styles.downloadBtnText}>{t('generate_pdf')}</Text>
      </TouchableOpacity>
      
      <View style={{ height: 120 }} />
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'edit': return renderEdit();
      case 'preview': return renderPreview();
      case 'templates': return renderTemplates();
      default: return renderEdit();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resume Builder</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'edit' && styles.activeTab]} 
          onPress={() => setActiveTab('edit')}
        >
          <Edit3 size={18} color={activeTab === 'edit' ? '#0d47a1' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'edit' && styles.activeTabText]}>{t('edit_tab')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'templates' && styles.activeTab]} 
          onPress={() => setActiveTab('templates')}
        >
          <Layout size={18} color={activeTab === 'templates' ? '#0d47a1' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'templates' && styles.activeTabText]}>{t('templates_tab')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'preview' && styles.activeTab]} 
          onPress={() => setActiveTab('preview')}
        >
          <Eye size={18} color={activeTab === 'preview' ? '#0d47a1' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'preview' && styles.activeTabText]}>{t('preview_tab')}</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}

      {activeTab === 'edit' && (
         <TouchableOpacity style={styles.primaryBtn} onPress={() => setActiveTab('templates')}>
            <Text style={styles.primaryBtnText}>{t('select_tpl_preview')}</Text>
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
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, margin: 16, marginTop: 10, padding: 4, elevation: 2 },
  tab: { flex: 1, paddingVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, borderRadius: 10 },
  activeTab: { backgroundColor: '#e3f2fd' },
  tabText: { fontSize: 13, color: '#666', fontWeight: '500' },
  activeTabText: { color: '#0d47a1', fontWeight: 'bold' },
  scroll: { paddingHorizontal: 16 },
  formSection: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, elevation: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0d47a1', flexDirection: 'row', alignItems: 'center', gap: 8 },
  circleAddBtn: { backgroundColor: '#0d47a1', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  input: { backgroundColor: '#f8faff', borderWidth: 1, borderColor: '#e1efff', borderRadius: 10, padding: 12, marginBottom: 10, fontSize: 15, color: '#333' },
  itemCard: { padding: 12, backgroundColor: '#fefefe', borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#0d47a1', marginBottom: 16, borderWidth: 1, borderColor: '#eee' },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  itemCount: { fontSize: 12, fontWeight: '600', color: '#666', textTransform: 'uppercase' },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  skillInputWrapper: { width: '47%', flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#f8faff', borderRadius: 10, borderWidth: 1, borderColor: '#e1efff', paddingRight: 8 },
  removeBtnInline: { padding: 4 },
  primaryBtn: { 
    position: 'absolute', bottom: 30, left: 20, right: 20, 
    backgroundColor: '#0d47a1', padding: 16, borderRadius: 16, 
    alignItems: 'center', elevation: 4 
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // Templates Styles
  templatesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingVertical: 10 },
  templateCard: { width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 16, elevation: 2, borderWidth: 1, borderColor: '#eee', height: 180 },
  templateHeaderLine: { height: 4, width: '40%', borderRadius: 2, marginBottom: 12 },
  templateName: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 8 },
  templatePreviewMock: { flex: 1, backgroundColor: '#f9f9f9', borderRadius: 6, padding: 8 },
  mockLine: { height: 3, backgroundColor: '#e0e0e0', marginBottom: 4, borderRadius: 2 },
  mockSection: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 6 },
  selectedBadge: { position: 'absolute', top: -5, right: -5, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, elevation: 2 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  // Preview Styles
  previewContainer: { flex: 1, padding: 16 },
  previewControls: { marginBottom: 12, paddingHorizontal: 4 },
  previewInfo: { fontSize: 14, color: '#666', fontWeight: '500' },
  a4Page: { 
    backgroundColor: '#fff', 
    minHeight: 600, 
    padding: 24, 
    borderRadius: 8, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10 
  },
  previewHeaderBorder: { height: 6, width: 60, marginBottom: 16 },
  prevName: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  prevContactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  prevContact: { fontSize: 11, color: '#666', flexDirection: 'row', alignItems: 'center', gap: 4 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 14 },
  prevSectionTitle: { fontSize: 13, fontWeight: '800', letterSpacing: 1.2, marginBottom: 10 },
  prevText: { fontSize: 12, color: '#444', lineHeight: 18 },
  prevTextSmall: { fontSize: 11, color: '#666', lineHeight: 16, marginTop: 4 },
  prevExpItem: { marginBottom: 16 },
  prevRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  prevBold: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  prevDate: { fontSize: 11, color: '#888' },
  prevSkillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  prevSkillChip: { backgroundColor: '#f0f4f8', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14 },
  prevSkillText: { fontSize: 11, color: '#333', fontWeight: '500' },
  downloadFloatingBtn: { 
    backgroundColor: '#0d47a1', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 10, 
    padding: 16, 
    borderRadius: 16, 
    marginTop: 20,
    elevation: 4
  },
  downloadBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

