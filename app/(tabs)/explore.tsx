import { BookCheck, Building2, MapPin, Search, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';

const COLLEGES = [
  { id: 1, name: 'Delhi University', location: 'New Delhi', fees: '₹15k/yr', rating: 4.8, type: 'Govt' },
  { id: 2, name: 'Mumbai University', location: 'Mumbai', fees: '₹20k/yr', rating: 4.5, type: 'Govt' },
  { id: 3, name: 'Amity University', location: 'Noida', fees: '₹1.5L/yr', rating: 4.2, type: 'Private' },
  { id: 4, name: 'IIT Madras', location: 'Chennai', fees: '₹2L/yr', rating: 4.9, type: 'Govt' },
];

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const { t } = useLanguage();

  const filteredColleges = COLLEGES.filter(c =>
    (filter === 'All' || c.type === filter) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const filters = [
    { label: t('filter_all'), value: 'All' },
    { label: t('filter_govt'), value: 'Govt' },
    { label: t('filter_private'), value: 'Private' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('explore_title')}</Text>
        <Text style={styles.headerSubtitle}>{t('explore_subtitle')}</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#888" size={20} />
          <TextInput
            placeholder={t('search_placeholder')}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <View style={styles.filterRow}>
        {filters.map(f => (
          <TouchableOpacity
            key={f.value}
            style={[styles.filterChip, filter === f.value && styles.filterChipActive]}
            onPress={() => setFilter(f.value)}
          >
            <Text style={[styles.filterText, filter === f.value && styles.filterTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.listContainer} contentContainerStyle={{ paddingBottom: 40 }}>
        {filteredColleges.map((college) => (
          <View key={college.id} style={styles.collegeCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Building2 color="#1976d2" size={24} />
              </View>
              <View style={styles.cardHeaderDetails}>
                <Text style={styles.collegeName}>{college.name}</Text>
                <View style={styles.row}>
                  <MapPin color="#666" size={14} />
                  <Text style={styles.locationText}>{college.location}</Text>
                </View>
              </View>
              <View style={styles.ratingBadge}>
                <Star color="#f5b041" size={12} fill="#f5b041" />
                <Text style={styles.ratingText}>{college.rating}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>{t('tuition_fees')}</Text>
                <Text style={styles.infoValue}>{college.fees}</Text>
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>{t('college_type')}</Text>
                <Text style={styles.infoValue}>{college.type === 'Govt' ? t('filter_govt') : t('filter_private')}</Text>
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>{t('placement')}</Text>
                <Text style={styles.infoValue}>90%</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.saveBtn}>
                <BookCheck color="#1976d2" size={18} />
                <Text style={styles.saveBtnText}>{t('save')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn}>
                <Text style={styles.applyBtnText}>{t('view_details')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  header: { backgroundColor: '#0d47a1', padding: 24, paddingTop: 60, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  headerSubtitle: { fontSize: 14, color: '#e3f2fd', marginTop: 4 },
  searchContainer: { paddingHorizontal: 24, marginBottom: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#e0e0e0', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8 },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16, color: '#333' },
  filterRow: { flexDirection: 'row', paddingHorizontal: 24, marginBottom: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 12, borderWidth: 1, borderColor: '#e0e0e0' },
  filterChipActive: { backgroundColor: '#e3f2fd', borderColor: '#1976d2' },
  filterText: { color: '#666', fontWeight: '500' },
  filterTextActive: { color: '#1976d2', fontWeight: 'bold' },
  listContainer: { paddingHorizontal: 24 },
  collegeCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#eee', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  iconContainer: { width: 48, height: 48, backgroundColor: '#e3f2fd', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardHeaderDetails: { flex: 1 },
  collegeName: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 12, color: '#666' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff8e1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#f5b041' },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0', borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginBottom: 16 },
  infoCol: { alignItems: 'center', flex: 1 },
  infoLabel: { fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 4 },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  cardFooter: { flexDirection: 'row', gap: 12 },
  saveBtn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 12, backgroundColor: '#e3f2fd', borderRadius: 8 },
  saveBtnText: { color: '#1976d2', fontWeight: 'bold' },
  applyBtn: { flex: 2, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, backgroundColor: '#1976d2', borderRadius: 8 },
  applyBtnText: { color: '#fff', fontWeight: 'bold' },
});
