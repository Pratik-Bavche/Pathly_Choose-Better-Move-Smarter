import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Lightbulb,
  PlaySquare,
  Rocket,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users
} from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { BUSINESS_CATEGORIES, BUSINESS_IDEAS, BusinessIdea } from '../data/businessIdeas';

// ── Budget Badge Badge ───────────────────────────────────────────────
const BUDGET_COLORS: Record<string, { bg: string; text: string }> = {
  'Very Low': { bg: '#E8F5E9', text: '#2E7D32' },
  'Low': { bg: '#FFF3E0', text: '#E65100' },
  'Medium': { bg: '#E3F2FD', text: '#1565C0' },
  'High': { bg: '#FCE4EC', text: '#880E4F' },
};

function BudgetBadge({ type }: { type: string }) {
  const colors = BUDGET_COLORS[type] ?? { bg: '#F5F5F5', text: '#616161' };
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{type} Budget</Text>
    </View>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function StartBusinessTab() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);

  const { search: searchParam } = useLocalSearchParams();

  React.useEffect(() => {
    if (searchParam) {
      const searchStr = String(searchParam).toLowerCase();
      const found = BUSINESS_IDEAS.find(i => i.name.toLowerCase() === searchStr);
      if (found) {
        setSelectedCategoryId(found.categoryId);
        setSelectedIdea(found);
      }
    }
  }, [searchParam]);

  // Self-reset when explore tab loses focus and comes back
  useFocusEffect(
    useCallback(() => {
      setSelectedCategoryId(null);
      setSelectedIdea(null);
    }, [])
  );

  const selectedCategory = BUSINESS_CATEGORIES.find(c => c.id === selectedCategoryId) || null;
  const categoryIdeas = BUSINESS_IDEAS.filter(idea => idea.categoryId === selectedCategoryId);

  // ── Step 1: Category Grid ─────────────────────────────────────
  const renderCategoryGrid = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.catScrollContent}>
      <Text style={styles.stepTitle}>Explore Business Categories</Text>
      <Text style={styles.stepSubtitle}>Find the perfect business idea for your skills & budget</Text>

      <View style={styles.catGrid}>
        {BUSINESS_CATEGORIES.map((cat, index) => {
           // We will use alternating colors for visual appeal
           const colors = [
             { bg: '#e8f5e9', iconColor: '#43a047' },  // green  – Local
             { bg: '#e3f2fd', iconColor: '#1e88e5' },  // blue   – Digital
             { bg: '#f3e5f5', iconColor: '#8e24aa' },  // purple – Creative
             { bg: '#fff3e0', iconColor: '#fb8c00' },  // orange – Retail
             { bg: '#fbe9e7', iconColor: '#d84315' },  // red    – Agri
             { bg: '#e0f7fa', iconColor: '#0097a7' },  // teal   – Franchise
             { bg: '#fff8e1', iconColor: '#f9a825' },  // amber  – Food & Bev
             { bg: '#fce4ec', iconColor: '#c2185b' },  // pink   – Health
             { bg: '#ede7f6', iconColor: '#5e35b1' },  // indigo – Education
           ];
           const colorObj = colors[index % colors.length];

           return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: '#fff', borderColor: colorObj.bg, borderWidth: 2 }]}
              activeOpacity={0.8}
              onPress={() => setSelectedCategoryId(cat.id)}
            >
              <View style={[styles.catIconCircle, { backgroundColor: colorObj.bg }]}>
                <Text style={styles.catEmoji}>{cat.title.split(' ')[0]}</Text>
              </View>
              <Text style={styles.catTitle}>{cat.title.replace(/.*? /, '')}</Text>
              <Text style={styles.catDesc} numberOfLines={2}>{cat.desc}</Text>
              <View style={styles.catFooter}>
                <Text style={[styles.catCount, { color: colorObj.iconColor }]}>
                  {BUSINESS_IDEAS.filter(i => i.categoryId === cat.id).length} Ideas
                </Text>
                <ChevronRight color={colorObj.iconColor} size={16} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Lightbulb color="#F57F17" size={20} style={{ marginRight: 12, marginTop: 2 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.infoCardTitle}>Why start a business?</Text>
          <Text style={styles.infoCardDesc}>
            Starting a small business offers financial independence, flexibility, and unlimited growth potential. Find ideas that require minimal initial investment.
          </Text>
        </View>
      </View>
      <View style={{ height: 60 }} />
    </ScrollView>
  );

  // ── Step 2: Ideas List ──────────────────────────────────────────
  const renderIdeasList = () => {
    if (!selectedCategory) return null;
    return (
      <View style={styles.flex1}>
        <View style={styles.backRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedCategoryId(null)}
          >
            <ArrowLeft color="#1565C0" size={20} />
          </TouchableOpacity>
          <Text style={styles.backTitle} numberOfLines={1}>{selectedCategory.title}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {categoryIdeas.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No ideas found for this category yet.</Text>
            </View>
          ) : (
            categoryIdeas.map(idea => (
              <TouchableOpacity
                key={idea.id}
                style={styles.ideaCard}
                activeOpacity={0.85}
                onPress={() => setSelectedIdea(idea)}
              >
                <View style={styles.ideaCardTop}>
                  <View style={styles.ideaTitleBlock}>
                    <Text style={styles.ideaTitle}>{idea.name}</Text>
                  </View>
                </View>

                <Text style={styles.ideaShortDesc} numberOfLines={2}>{idea.description}</Text>

                <View style={styles.ideaTagsRow}>
                  <BudgetBadge type={idea.setupBudgetCategory} />
                  <View style={[styles.badge, { backgroundColor: '#F3E5F5' }]}>
                      <Text style={[styles.badgeText, { color: '#8E24AA' }]}>{idea.mode}</Text>
                  </View>
                </View>

                <View style={styles.ideaCardBottom}>
                  <Text style={styles.profitLabel}>Avg. Profit: <Text style={{ color: '#2E7D32', fontWeight: 'bold' }}>{idea.expectedProfit}</Text></Text>
                  <TouchableOpacity
                    style={styles.viewDetailsBtn}
                    onPress={() => setSelectedIdea(idea)}
                  >
                    <Text style={styles.viewDetailsBtnText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
          <View style={{ height: 60 }} />
        </ScrollView>
      </View>
    );
  };

  // ── Step 3: Idea Detail ────────────────────────────────────────
  const renderIdeaDetail = () => {
    if (!selectedIdea) return null;
    return (
      <View style={styles.flex1}>
        <View style={styles.backRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedIdea(null)}>
            <ArrowLeft color="#1565C0" size={20} />
          </TouchableOpacity>
          <Text style={styles.backTitle} numberOfLines={1}>{selectedIdea.name}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailScrollContent}>
          {/* Hero Card */}
          <View style={styles.detailHeroCard}>
            <View style={styles.detailTitleBlock}>
              <Text style={styles.detailTitle}>{selectedIdea.name}</Text>
              <View style={styles.detailBadgesRow}>
                <BudgetBadge type={selectedIdea.setupBudgetCategory} />
                <View style={[styles.badge, { backgroundColor: '#F3E5F5' }]}>
                    <Text style={[styles.badgeText, { color: '#8E24AA' }]}>{selectedIdea.mode}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.detailDesc}>{selectedIdea.description}</Text>
            
            <View style={styles.financeBox}>
                <View style={styles.financeItem}>
                    <Text style={styles.financeLabel}>Expected Profit</Text>
                    <Text style={styles.financeValueGreen}>{selectedIdea.expectedProfit}</Text>
                </View>
                <View style={styles.financeDivider} />
                <View style={styles.financeItem}>
                    <Text style={styles.financeLabel}>Time to Break Even</Text>
                    <Text style={styles.financeValue}>{selectedIdea.breakEvenTime}</Text>
                </View>
            </View>
          </View>

          {/* Investment & Costs */}
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}><Banknote color="#1565C0" size={18} style={{marginRight: 8}}/> Financial Breakdown</Text>
            
            <Text style={styles.subHeading}>Initial Setup Budget: {selectedIdea.setupBudget}</Text>
            {selectedIdea.setupBreakdown.map((item, idx) => (
                <View key={idx} style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.detailValue}>{item}</Text>
                </View>
            ))}

            <Text style={[styles.subHeading, { marginTop: 12 }]}>Monthly Operating Cost:</Text>
            <View style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.detailValue}>{selectedIdea.monthlyCost}</Text>
            </View>
          </View>

          {/* Requirements & Eligibility */}
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}><ShieldCheck color="#2E7D32" size={18} style={{marginRight: 8}}/> Requirements & Eligibility</Text>
            
            <View style={styles.detailRow}>
              <Settings color="#666" size={16} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.reqLabel}>Required Skills:</Text>
                  <Text style={styles.detailValue}>{selectedIdea.skillsRequired}</Text>
              </View>
            </View>

            <View style={[styles.detailRow, { marginTop: 12 }]}>
              <CheckCircle color="#666" size={16} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.reqLabel}>Eligibility / Licensing:</Text>
                  <Text style={styles.detailValue}>{selectedIdea.eligibility}</Text>
              </View>
            </View>
            
            <View style={[styles.detailRow, { marginTop: 12 }]}>
              <Users color="#666" size={16} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.reqLabel}>Manpower Needs:</Text>
                  <Text style={styles.detailValue}>{selectedIdea.manpower}</Text>
              </View>
            </View>
          </View>
          
          {/* Marketing & Growth */}
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}><TrendingUp color="#E65100" size={18} style={{marginRight: 8}}/> Marketing & Scalability</Text>
            
            <Text style={styles.subHeading}>Marketing Tips:</Text>
            <Text style={styles.detailValue}>{selectedIdea.marketingTips}</Text>
            
            <Text style={[styles.subHeading, { marginTop: 12 }]}>Scalability Potential:</Text>
            <Text style={styles.detailValue}>{selectedIdea.scalability}</Text>
          </View>

          {/* Optional Addons */}
          {selectedIdea.addons && (
              <View style={[styles.detailSection, { backgroundColor: '#F8F9FA' }]}>
                 <Text style={styles.detailSectionTitle}><Rocket color="#8E24AA" size={18} style={{marginRight: 8}}/> Bonus Tips & Resources</Text>
                 
                 {selectedIdea.addons.example && (
                     <View style={styles.addonBlock}>
                         <Text style={styles.addonLabel}>💡 Example / Success Tip:</Text>
                         <Text style={styles.detailValue}>{selectedIdea.addons.example}</Text>
                     </View>
                 )}
                 {selectedIdea.addons.starterKit && (
                     <View style={styles.addonBlock}>
                         <Text style={styles.addonLabel}>🛠️ Starter Kit Recommendation:</Text>
                         <Text style={styles.detailValue}>{selectedIdea.addons.starterKit}</Text>
                     </View>
                 )}
                 {selectedIdea.addons.youtubeLink && (
                     <TouchableOpacity style={styles.youtubeBtn} onPress={() => Linking.openURL('https://youtube.com')}>
                         <PlaySquare color="#FF0000" size={20} style={{marginRight: 8}} />
                         <Text style={styles.youtubeText}>{selectedIdea.addons.youtubeLink}</Text>
                     </TouchableOpacity>
                 )}
              </View>
          )}

          <View style={{ height: 60 }} />
        </ScrollView>
      </View>
    );
  };

  // ── Render ────────────────────────────────────────────────────
  if (selectedIdea) return renderIdeaDetail();
  if (selectedCategoryId) return renderIdeasList();
  return renderCategoryGrid();
}

// ── Styles ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  flex1: { flex: 1 },

  // Category Grid
  catScrollContent: { padding: 16, paddingTop: 8 },
  stepTitle: { fontSize: 20, fontWeight: 'bold', color: '#0d47a1', marginBottom: 4 },
  stepSubtitle: { fontSize: 13, color: '#666', marginBottom: 18 },

  catGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  categoryCard: {
    width: '47.5%', borderRadius: 18, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2,
    marginBottom: 4,
  },
  catIconCircle: { width: 46, height: 46, borderRadius: 23, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  catEmoji: { fontSize: 22 },
  catTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 4, lineHeight: 18, color: '#222' },
  catDesc: { fontSize: 11, color: '#777', marginBottom: 10 },
  catFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  catCount: { fontSize: 12, fontWeight: 'bold' },

  infoCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: '#FFFDE7', borderRadius: 14, padding: 14, marginTop: 16,
    borderWidth: 1, borderColor: '#FFF59D',
  },
  infoCardTitle: { fontSize: 14, fontWeight: 'bold', color: '#E65100', marginBottom: 4 },
  infoCardDesc: { fontSize: 13, color: '#795548', lineHeight: 18 },

  // Back Row
  backRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0', backgroundColor: '#fff'
  },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E1EFFF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  backTitle: { fontSize: 16, fontWeight: 'bold', color: '#0d47a1', flex: 1 },

  // Idea List
  listContent: { padding: 16 },
  emptyState: { alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 15, color: '#888' },

  ideaCard: {
    backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: '#E8EFFF',
    shadowColor: '#1565C0', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  ideaCardTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  ideaTitleBlock: { flex: 1 },
  ideaTitle: { fontSize: 17, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 4 },
  ideaShortDesc: { fontSize: 13, color: '#555', lineHeight: 19, marginBottom: 12 },
  
  ideaTagsRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },

  ideaCardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 12 },
  profitLabel: { fontSize: 13, color: '#555', flex: 1, marginRight: 8 },
  viewDetailsBtn: { backgroundColor: '#1565C0', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 8 },
  viewDetailsBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  // Detail View
  detailScrollContent: { padding: 16 },
  detailHeroCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 18, marginBottom: 16,
    borderWidth: 1, borderColor: '#E8EFFF',
    shadowColor: '#1565C0', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4,
  },
  detailTitleBlock: { marginBottom: 12 },
  detailTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 10 },
  detailBadgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  detailDesc: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 18 },
  
  financeBox: { flexDirection: 'row', backgroundColor: '#F8F9FA', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#E9ECEF' },
  financeItem: { flex: 1, alignItems: 'center' },
  financeDivider: { width: 1, backgroundColor: '#DEE2E6', marginHorizontal: 10 },
  financeLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
  financeValue: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  financeValueGreen: { fontSize: 15, fontWeight: 'bold', color: '#2E7D32' },

  detailSection: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: '#E8EFFF',
  },
  detailSectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 14, flexDirection: 'row', alignItems: 'center' },
  
  subHeading: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 8 },
  detailValue: { fontSize: 14, color: '#555', lineHeight: 20 },
  
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6, paddingLeft: 6 },
  bulletDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#1565C0', marginTop: 8, marginRight: 8 },
  
  detailRow: { flexDirection: 'row', alignItems: 'flex-start' },
  reqLabel: { fontSize: 13, fontWeight: 'bold', color: '#333', marginBottom: 2 },
  
  addonBlock: { marginBottom: 12 },
  addonLabel: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  youtubeBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#FFCDD2', marginTop: 8 },
  youtubeText: { fontSize: 13, color: '#D32F2F', fontWeight: 'bold', flex: 1 }
});
