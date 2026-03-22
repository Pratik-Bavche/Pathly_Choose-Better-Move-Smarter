import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Filter,
  Search,
  X,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import scholarshipsData from '../data/scholarships.json';
import { useLanguage } from '../context/LanguageContext';

// ── Types ────────────────────────────────────────────────────────────
interface Scholarship {
  id: number;
  name: string;
  category: string;
  type: string;
  applicableLevels: string[];
  eligibility: {
    qualification: string;
    minPercentage: string;
    familyIncomeLimit: string;
    category: string;
    gender: string;
    stateConditions: string;
  };
  amount: string;
  documents: string[];
  applicationProcess: string[];
  portal: string;
  applyLink: string;
  timeline: string;
  renewalConditions: string;
  stateApplicability: string;
  forGirls: boolean;
  forDisabled: boolean;
  forMinority: boolean;
  incomeLimit: string;
  tags: string[];
}

const ALL_SCHOLARSHIPS: Scholarship[] = scholarshipsData as Scholarship[];

const TYPE_COLOR: Record<string, { bg: string; text: string }> = {
  'Central Government': { bg: '#e3f2fd', text: '#1565C0' },
  'Maharashtra State Government': { bg: '#e8f5e9', text: '#2E7D32' },
  'Private / Corporate': { bg: '#f3e5f5', text: '#6A1B9A' },
  'Private / NGO': { bg: '#fff3e0', text: '#E65100' },
  'Public Sector': { bg: '#fce4ec', text: '#880E4F' },
  'Central Government Platform': { bg: '#e0f7fa', text: '#00695C' },
  'PSU / Corporate Platform': { bg: '#f1f8e9', text: '#558B2F' },
  'Private Platform / NGO': { bg: '#fff8e1', text: '#F57F17' },
  'International': { bg: '#ede7f6', text: '#4527A0' },
};

function getTypeColor(type: string) {
  for (const key of Object.keys(TYPE_COLOR)) {
    if (type.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
      return TYPE_COLOR[key];
    }
  }
  return { bg: '#f5f5f5', text: '#333' };
}

// ── Scholarship Detail Modal ─────────────────────────────────────────
function ScholarshipDetailModal({
  scholarship,
  onClose,
}: {
  scholarship: Scholarship;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const typeColor = getTypeColor(scholarship.type);

  return (
    <Modal animationType="slide" transparent={false} visible onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <ArrowLeft color="#fff" size={22} />
          </TouchableOpacity>
          <Text style={styles.modalHeaderTitle} numberOfLines={2}>
            {scholarship.name}
          </Text>
        </View>

        <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
          {/* Type badge + amount */}
          <View style={styles.detailTop}>
            <View style={[styles.typeBadge, { backgroundColor: typeColor.bg }]}>
              <Text style={[styles.typeBadgeText, { color: typeColor.text }]}>{scholarship.type}</Text>
            </View>
            <View style={styles.amountBox}>
              <Text style={styles.amountLabel}>💰 {t('benefit_label')}</Text>
              <Text style={styles.amountValue}>{scholarship.amount}</Text>
            </View>
          </View>

          {/* Levels + Timeline + State */}
          <View style={styles.infoRow}>
            <InfoChip emoji="🎓" label={scholarship.applicableLevels.join(', ')} />
            <InfoChip emoji="📅" label={scholarship.timeline} />
          </View>
          <View style={[styles.infoRow, { marginTop: 0 }]}>
            <InfoChip emoji="📍" label={scholarship.stateApplicability} />
            <InfoChip emoji="🔗" label={scholarship.portal} />
          </View>

          {/* Eligibility */}
          <SectionBox title={`✅ ${t('eligibility_criteria')}`}>
            <DetailRow label={t('qual_label_small')} value={scholarship.eligibility.qualification} />
            <DetailRow label={t('min_percentage_label')} value={scholarship.eligibility.minPercentage} />
            <DetailRow label={t('family_income_label')} value={scholarship.eligibility.familyIncomeLimit} />
            <DetailRow label={t('category_label_small')} value={scholarship.eligibility.category} />
            <DetailRow label={t('gender_label_small')} value={scholarship.eligibility.gender} />
            <DetailRow label={t('state_conditions_label')} value={scholarship.eligibility.stateConditions} />
          </SectionBox>

          {/* Documents */}
          <SectionBox title={`📁 ${t('req_docs')}`}>
            {scholarship.documents.map((doc, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{doc}</Text>
              </View>
            ))}
          </SectionBox>

          {/* Application Process */}
          <SectionBox title={`📋 ${t('how_to_apply')}`}>
            {scholarship.applicationProcess.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepNum}>
                  <Text style={styles.stepNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </SectionBox>

          {/* Renewal */}
          <SectionBox title={`🔄 ${t('renewal_cond')}`}>
            <Text style={styles.plainText}>{scholarship.renewalConditions}</Text>
          </SectionBox>

          {/* Tags */}
          <View style={styles.tagsWrap}>
            {scholarship.tags.map((tag, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>

          {/* Apply Button */}
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => Linking.openURL(scholarship.applyLink)}
          >
            <ExternalLink color="#fff" size={18} />
            <Text style={styles.applyBtnText}>{t('apply_portal_btn')}</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

function SectionBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.sectionBox}>
      <Text style={styles.sectionBoxTitle}>{title}</Text>
      {children}
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function InfoChip({ emoji, label }: { emoji: string; label: string }) {
  return (
    <View style={styles.infoChip}>
      <Text style={styles.infoChipText}>
        {emoji} {label}
      </Text>
    </View>
  );
}

// ── Scholarship Card ─────────────────────────────────────────────────
function ScholarshipCard({
  item,
  onPress,
}: {
  item: Scholarship;
  onPress: () => void;
}) {
  const { t } = useLanguage();
  const typeColor = getTypeColor(item.type);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardHeader}>
        <View style={[styles.typePill, { backgroundColor: typeColor.bg }]}>
          <Text style={[styles.typePillText, { color: typeColor.text }]} numberOfLines={1}>
            {item.type.split('(')[0].trim()}
          </Text>
        </View>
        {item.forGirls && (
          <View style={styles.specialBadge}>
            <Text style={styles.specialBadgeText}>👩 Girls</Text>
          </View>
        )}
        {item.forMinority && (
          <View style={[styles.specialBadge, { backgroundColor: '#e8f5e9' }]}>
            <Text style={[styles.specialBadgeText, { color: '#2e7d32' }]}>🕌 Minority</Text>
          </View>
        )}
        {item.forDisabled && (
          <View style={[styles.specialBadge, { backgroundColor: '#e3f2fd' }]}>
            <Text style={[styles.specialBadgeText, { color: '#1565c0' }]}>♿ PWD</Text>
          </View>
        )}
      </View>

      <Text style={styles.cardName}>{item.name}</Text>

      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>💰 {item.amount}</Text>
      </View>

      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>🎓 {item.applicableLevels.join(' | ')}</Text>
      </View>

      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>📅 {item.timeline}</Text>
      </View>

      {item.incomeLimit !== 'None' && item.incomeLimit !== 'Varies' && (
        <View style={styles.cardMeta}>
          <Text style={styles.cardMetaText}>💼 Income ≤ {item.incomeLimit}</Text>
        </View>
      )}

      <View style={styles.cardFooter}>
        <Text style={styles.cardPortal}>🔗 {item.portal.split('/')[0].trim()}</Text>
        <View style={styles.cardViewBtn}>
          <Text style={styles.cardViewBtnText}>{t('view_details')}</Text>
          <ChevronRight color="#1565c0" size={14} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ── Filter Sheet ─────────────────────────────────────────────────────
function FilterSheet({
  visible,
  onClose,
  filters,
  setFilters,
  LEVEL_FILTERS,
  TYPE_FILTERS,
  SPECIAL_FILTERS
}: {
  visible: boolean;
  onClose: () => void;
  filters: { level: string; type: string; special: string };
  setFilters: (f: { level: string; type: string; special: string }) => void;
  LEVEL_FILTERS: string[];
  TYPE_FILTERS: string[];
  SPECIAL_FILTERS: string[];
}) {
  const { t } = useLanguage();
  const [local, setLocal] = useState(filters);

  function Pill({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) {
    return (
      <TouchableOpacity
        style={[styles.filterPill, selected && styles.filterPillActive]}
        onPress={onPress}
      >
        <Text style={[styles.filterPillText, selected && styles.filterPillTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.filterOverlay}>
        <View style={styles.filterSheet}>
          <View style={styles.filterSheetHeader}>
            <Text style={styles.filterSheetTitle}>{t('filter_title')}</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#333" size={22} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.filterGroupLabel}>{t('edu_level_label')}</Text>
            <View style={styles.pillRow}>
              {LEVEL_FILTERS.map((l) => (
                <Pill
                  key={l}
                  label={l}
                  selected={local.level === l}
                  onPress={() => setLocal({ ...local, level: l })}
                />
              ))}
            </View>

            <Text style={styles.filterGroupLabel}>{t('scholarship_type_label')}</Text>
            <View style={styles.pillRow}>
              {TYPE_FILTERS.map((t) => (
                <Pill
                  key={t}
                  label={t}
                  selected={local.type === t}
                  onPress={() => setLocal({ ...local, type: t })}
                />
              ))}
            </View>

            <Text style={styles.filterGroupLabel}>{t('special_cat_label')}</Text>
            <View style={styles.pillRow}>
              {SPECIAL_FILTERS.map((s) => (
                <Pill
                  key={s}
                  label={s}
                  selected={local.special === s}
                  onPress={() => setLocal({ ...local, special: s })}
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.filterActions}>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => setLocal({ level: 'All', type: 'All', special: 'All' })}
            >
              <Text style={styles.resetBtnText}>{t('reset_btn')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyFilterBtn}
              onPress={() => {
                setFilters(local);
                onClose();
              }}
            >
              <Text style={styles.applyFilterBtnText}>{t('apply_filters_btn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────
export default function ScholarshipsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { search: searchParam } = useLocalSearchParams();
  const [search, setSearch] = useState(searchParam ? String(searchParam) : '');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({ level: 'All', type: 'All', special: 'All' });
  const [selected, setSelected] = useState<Scholarship | null>(null);
  const [visibleCount, setVisibleCount] = useState(30);

  const LEVEL_FILTERS = [t('filter_all'), '9th', '10th', '11th', '12th', 'ITI', 'Diploma', 'UG', 'PG', 'PhD'];
  const TYPE_FILTERS = [t('filter_all'), 'Central Govt', 'State Govt', 'Private/Corporate', 'PSU', 'International'];
  const SPECIAL_FILTERS = [t('filter_all'), 'Girls Only', 'Minority', 'Disabled (PWD)', 'SC/ST', 'OBC', 'EBC/General'];

  const activeFilterCount = [filters.level, filters.type, filters.special].filter(
    (f) => f !== 'All' && f !== t('filter_all')
  ).length;

  const filtered = useMemo(() => {
    return ALL_SCHOLARSHIPS.filter((s) => {
      // Search
      if (
        search.trim() &&
        !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) &&
        !s.type.toLowerCase().includes(search.toLowerCase())
      )
        return false;

      // Level filter
      if (filters.level !== 'All') {
        const match = s.applicableLevels.some(
          (l) => l.toLowerCase() === filters.level.toLowerCase() ||
                 l.toLowerCase().includes(filters.level.toLowerCase())
        );
        if (!match) return false;
      }

      // Type filter
      if (filters.type !== 'All' && filters.type !== t('filter_all')) {
        const typeMap: Record<string, string> = {
          'Central Govt': 'central government',
          'State Govt': 'state government',
          'Private/Corporate': 'private',
          'PSU': 'public sector',
          'International': 'international',
        };
        const keyword = typeMap[filters.type] || filters.type.toLowerCase();
        if (!s.type.toLowerCase().includes(keyword)) return false;
      }

      // Special filter
      if (filters.special === 'Girls Only' && !s.forGirls) return false;
      if (filters.special === 'Minority' && !s.forMinority) return false;
      if (filters.special === 'Disabled (PWD)' && !s.forDisabled) return false;
      if (filters.special === 'SC/ST' && !s.tags.some((t) => ['SC', 'ST'].includes(t))) return false;
      if (filters.special === 'OBC' && !s.tags.includes('OBC')) return false;
      if (filters.special === 'EBC/General' && !s.tags.some((t) => ['EBC', 'general', 'open'].includes(t.toLowerCase())))
        return false;

      return true;
    });
  }, [search, filters]);

  const visibleScholarships = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 50);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color="#fff" size={22} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>🎓 {t('scholarships_header')}</Text>
          <Text style={styles.headerSub}>{ALL_SCHOLARSHIPS.length}{t('available_count')}</Text>
        </View>
      </View>

      {/* Search + Filter Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Search color="#999" size={18} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('search_scholarships_ph')}
            placeholderTextColor="#bbb"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <X color="#999" size={16} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
          <Filter color={activeFilterCount > 0 ? '#fff' : '#1565c0'} size={18} />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Result Count */}
      <View style={styles.resultRow}>
        <BookOpen color="#777" size={14} />
        <Text style={styles.resultCount}>{filtered.length}{t('found_count')}</Text>
        {activeFilterCount > 0 && (
          <TouchableOpacity
            onPress={() => setFilters({ level: 'All', type: 'All', special: 'All' })}
          >
            <Text style={styles.clearFilters}>{t('clear_filters')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Scholarship List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>{t('no_scholarships_found')}</Text>
            <Text style={styles.emptySubtitle}>{t('try_adjust_filters')}</Text>
          </View>
        ) : (
          visibleScholarships.map((item) => (
            <ScholarshipCard key={item.id} item={item} onPress={() => setSelected(item)} />
          ))
        )}

        {visibleCount < filtered.length && (
          <TouchableOpacity style={styles.loadMoreBtn} onPress={loadMore}>
            <Text style={styles.loadMoreText}>{t('load_more')} (+50)</Text>
          </TouchableOpacity>
        )}

        {filtered.length > 0 && visibleCount >= filtered.length && (
          <Text style={styles.endMessage}>✨ {t('end_list')}</Text>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Detail Modal */}
      {selected && (
        <ScholarshipDetailModal scholarship={selected} onClose={() => setSelected(null)} />
      )}

      {/* Filter Sheet */}
      <FilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        filters={filters}
        setFilters={setFilters}
        LEVEL_FILTERS={LEVEL_FILTERS}
        TYPE_FILTERS={TYPE_FILTERS}
        SPECIAL_FILTERS={SPECIAL_FILTERS}
      />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },

  // Header
  header: {
    backgroundColor: '#0d47a1',
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 13, color: '#bbdefb', marginTop: 2 },

  // Search
  searchRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingVertical: 12 },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    height: 46,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#333' },
  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1565c0',
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e53935',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: { fontSize: 10, color: '#fff', fontWeight: 'bold' },

  // Result row
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  resultCount: { fontSize: 13, color: '#777', flex: 1 },
  clearFilters: { fontSize: 13, color: '#e53935', fontWeight: '600' },

  // List
  list: { flex: 1, paddingHorizontal: 16 },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e8ecf4',
    shadowColor: '#1a237e',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  typePill: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    maxWidth: '65%',
  },
  typePillText: { fontSize: 11, fontWeight: '700' },
  specialBadge: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#fce4ec',
  },
  specialBadgeText: { fontSize: 11, fontWeight: '600', color: '#880e4f' },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#1a237e', marginBottom: 8, lineHeight: 22 },
  cardMeta: { marginBottom: 4 },
  cardMetaText: { fontSize: 13, color: '#555' },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cardPortal: { fontSize: 12, color: '#777', flex: 1 },
  cardViewBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  cardViewBtnText: { fontSize: 13, color: '#1565c0', fontWeight: '700' },

  // Empty
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyEmoji: { fontSize: 50, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#888' },

  // Modal
  modalContainer: { flex: 1, backgroundColor: '#f4f6fb' },
  modalHeader: {
    backgroundColor: '#0d47a1',
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalHeaderTitle: { flex: 1, fontSize: 17, fontWeight: 'bold', color: '#fff', lineHeight: 24 },
  modalScroll: { flex: 1, paddingHorizontal: 16, paddingTop: 14 },

  detailTop: { marginBottom: 14, gap: 10 },
  typeBadge: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5, alignSelf: 'flex-start' },
  typeBadgeText: { fontSize: 12, fontWeight: '700' },
  amountBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 14,
    padding: 14,
  },
  amountLabel: { fontSize: 12, color: '#2e7d32', fontWeight: '600', marginBottom: 4 },
  amountValue: { fontSize: 16, fontWeight: 'bold', color: '#1b5e20' },

  infoRow: { flexDirection: 'row', gap: 8, marginBottom: 8, flexWrap: 'wrap' },
  infoChip: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flex: 1,
  },
  infoChipText: { fontSize: 12, color: '#444' },

  sectionBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionBoxTitle: { fontSize: 15, fontWeight: 'bold', color: '#1a237e', marginBottom: 10 },

  detailRow: { marginBottom: 8 },
  detailLabel: { fontSize: 11, color: '#888', fontWeight: '600', marginBottom: 2, textTransform: 'uppercase' },
  detailValue: { fontSize: 14, color: '#333', lineHeight: 20 },

  bulletRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  bullet: { fontSize: 16, color: '#1565c0', marginTop: 1 },
  bulletText: { flex: 1, fontSize: 14, color: '#333', lineHeight: 20 },

  stepRow: { flexDirection: 'row', gap: 10, marginBottom: 10, alignItems: 'flex-start' },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1565c0',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  stepText: { flex: 1, fontSize: 14, color: '#333', lineHeight: 20 },

  plainText: { fontSize: 14, color: '#333', lineHeight: 20 },

  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  tag: { backgroundColor: '#e3f2fd', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12, color: '#1565c0', fontWeight: '600' },

  applyBtn: {
    backgroundColor: '#0d47a1',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  applyBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // Filter Sheet
  filterOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  filterSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '75%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  filterSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  filterSheetTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a237e' },
  filterGroupLabel: { fontSize: 14, fontWeight: '700', color: '#555', marginBottom: 10, marginTop: 14 },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterPill: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#f0f4ff',
    borderWidth: 1,
    borderColor: '#c5cae9',
  },
  filterPillActive: {
    backgroundColor: '#0d47a1',
    borderColor: '#0d47a1',
  },
  filterPillText: { fontSize: 13, color: '#3949ab', fontWeight: '600' },
  filterPillTextActive: { color: '#fff' },
  filterActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
  },
  resetBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loadMoreBtn: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1565c0',
    borderStyle: 'dashed',
  },
  loadMoreText: {
    color: '#1565c0',
    fontSize: 15,
    fontWeight: 'bold',
  },
  endMessage: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginTop: 10,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  resetBtnText: { fontSize: 15, fontWeight: '700', color: '#555' },
  applyFilterBtn: {
    flex: 2,
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: '#0d47a1',
    alignItems: 'center',
  },
  applyFilterBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
