import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import {
    ArrowLeft,
    BookOpen,
    CheckCircle,
    ChevronRight,
    ExternalLink,
    Filter,
    MapPin,
    Star,
    Zap
} from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    JOB_CATEGORIES,
    JOB_FILTERS,
    JobCard,
    JobCategory,
} from '../data/jobData';

// ── Match Score Engine ──────────────────────────────────────────
function computeMatchScore(job: JobCard, userQual: string, userInterests: string[]): number {
    let score = 50; // base

    // Qualification match
    const qualMap: Record<string, number> = { '10th': 1, '12th': 2, 'Diploma': 3, 'Other': 4 };
    const eligLower = job.eligibility.toLowerCase();
    const userLevel = qualMap[userQual] ?? 2;

    if (eligLower.includes('10th')) score += userLevel >= 1 ? 15 : -10;
    if (eligLower.includes('12th')) score += userLevel >= 2 ? 15 : -5;
    if (eligLower.includes('diploma')) score += userLevel >= 3 ? 15 : -5;

    // Interest match
    const interestKeywords: Record<string, string[]> = {
        Technology: ['computer', 'data', 'digital', 'ai', 'drone', 'inventory', 'editor'],
        Business: ['dispatch', 'inventory', 'logistics', 'assistant', 'virtual'],
        Art: ['thumbnail', 'editor', 'design', 'photo', 'creative', 'reels'],
        Healthcare: ['nhm', 'health', 'groomer'],
        Engineering: ['forklift', 'irrigation', 'greenhouse', 'drone', 'technician'],
        Marketing: ['social media', 'content', 'creator', 'rater'],
        Science: ['agriculture', 'kisan', 'agri'],
        Sports: ['gym', 'army', 'police', 'physical'],
    };

    userInterests.forEach(interest => {
        const keywords = interestKeywords[interest] || [];
        const jobTitleLower = job.title.toLowerCase();
        const jobDescLower = job.shortDesc.toLowerCase();
        if (keywords.some(kw => jobTitleLower.includes(kw) || jobDescLower.includes(kw))) {
            score += 10;
        }
    });

    // Bonus for no exam
    if (!job.isExamBased) score += 5;

    return Math.min(Math.max(score, 20), 99);
}

function getMatchColor(score: number): string {
    if (score >= 75) return '#2E7D32';
    if (score >= 50) return '#F57F17';
    return '#B71C1C';
}

// ── Job Type Badge ───────────────────────────────────────────────
const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
    Government: { bg: '#1565C0', text: '#fff' },
    Private: { bg: '#E65100', text: '#fff' },
    Remote: { bg: '#5E35B1', text: '#fff' },
    Apprenticeship: { bg: '#00838F', text: '#fff' },
    Freelance: { bg: '#2E7D32', text: '#fff' },
    Field: { bg: '#6D4C41', text: '#fff' },
};

function JobTypeBadge({ type }: { type: string }) {
    const colors = BADGE_COLORS[type] ?? { bg: '#757575', text: '#fff' };
    return (
        <View style={[styles.badge, { backgroundColor: colors.bg }]}>
            <Text style={[styles.badgeText, { color: colors.text }]}>{type}</Text>
        </View>
    );
}

// ── Next Step Button ─────────────────────────────────────────────
const NEXT_COLORS: Record<string, string> = {
    'Apply Now': '#1565C0',
    'Prepare': '#E65100',
    'Skill Required': '#5E35B1',
};

// ── Main Component ───────────────────────────────────────────────
export default function StartWorkingTab() {
    const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(null);
    const [selectedJob, setSelectedJob] = useState<JobCard | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [userQual, setUserQual] = useState('12th');
    const [userInterests, setUserInterests] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            const data = await AsyncStorage.getItem('userData');
            if (data) {
                const parsed = JSON.parse(data);
                if (parsed.educationLevel) setUserQual(parsed.educationLevel);
                if (parsed.interests) setUserInterests(parsed.interests);
            }
        } catch (_) { }
    };

    // Self-reset when explore tab loses focus and comes back
    useFocusEffect(
        useCallback(() => {
            setSelectedCategory(null);
            setSelectedJob(null);
            setActiveFilter('all');
            setShowFilters(false);
        }, [])
    );

    // ── Filtered Jobs ──────────────────────────────────────────────
    const filteredJobs = selectedCategory
        ? selectedCategory.jobs.filter(job => {
            if (activeFilter === 'all') return true;
            if (activeFilter === 'high_salary') return job.salaryMax >= 25000;
            if (activeFilter === 'no_exam') return !job.isExamBased;
            return job.tags.includes(activeFilter);
        })
        : [];

    // ── Step 1: Category Grid ─────────────────────────────────────
    const renderCategoryGrid = () => (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.catScrollContent}
        >
            <Text style={styles.stepTitle}>Choose a Category</Text>
            <Text style={styles.stepSubtitle}>
                Find jobs matching your qualification & interests
            </Text>

            <View style={styles.catGrid}>
                {JOB_CATEGORIES.map(cat => (
                    <TouchableOpacity
                        key={cat.id}
                        style={[styles.categoryCard, { backgroundColor: cat.color }]}
                        activeOpacity={0.8}
                        onPress={() => {
                            setSelectedCategory(cat);
                            setActiveFilter('all');
                        }}
                    >
                        <View style={[styles.catIconCircle, { backgroundColor: cat.iconBg }]}>
                            <Text style={styles.catEmoji}>{cat.icon}</Text>
                        </View>
                        <Text style={[styles.catTitle, { color: cat.accentColor }]}>{cat.title}</Text>
                        <Text style={styles.catDesc} numberOfLines={1}>{cat.description}</Text>
                        <View style={styles.catFooter}>
                            <Text style={[styles.catCount, { color: cat.accentColor }]}>
                                {cat.jobs.length} Jobs
                            </Text>
                            <ChevronRight color={cat.accentColor} size={16} />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Match Score Info Card */}
            <View style={styles.matchInfoCard}>
                <Zap color="#F57F17" size={18} style={{ marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.matchInfoTitle}>Smart Match Score Active</Text>
                    <Text style={styles.matchInfoDesc}>
                        Jobs are ranked based on your qualification ({userQual}) & {userInterests.length > 0 ? `interests: ${userInterests.slice(0, 2).join(', ')}` : 'your profile'}.
                    </Text>
                </View>
            </View>

            <View style={{ height: 60 }} />
        </ScrollView>
    );

    // ── Step 2: Job List ──────────────────────────────────────────
    const renderJobList = () => {
        if (!selectedCategory) return null;
        return (
            <View style={styles.flex1}>
                {/* Back row */}
                <View style={styles.backRow}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => { setSelectedCategory(null); setActiveFilter('all'); }}
                    >
                        <ArrowLeft color="#1565C0" size={20} />
                    </TouchableOpacity>
                    <View style={[styles.catIconSmall, { backgroundColor: selectedCategory.iconBg }]}>
                        <Text style={{ fontSize: 14 }}>{selectedCategory.icon}</Text>
                    </View>
                    <Text style={styles.backTitle} numberOfLines={1}>{selectedCategory.title}</Text>
                    <TouchableOpacity
                        style={styles.filterToggle}
                        onPress={() => setShowFilters(p => !p)}
                    >
                        <Filter color="#1565C0" size={18} />
                    </TouchableOpacity>
                </View>

                {/* Filter bar */}
                {showFilters && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filterRow}
                    >
                        {JOB_FILTERS.map(f => (
                            <TouchableOpacity
                                key={f.id}
                                style={[styles.filterChip, activeFilter === f.id && styles.filterChipActive]}
                                onPress={() => setActiveFilter(f.id)}
                            >
                                <Text style={[styles.filterChipText, activeFilter === f.id && styles.filterChipTextActive]}>
                                    {f.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}

                {/* Job cards */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.jobListContent}
                >
                    {filteredJobs.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyEmoji}>🔍</Text>
                            <Text style={styles.emptyText}>No jobs match this filter.</Text>
                        </View>
                    ) : (
                        filteredJobs.map(job => {
                            const score = computeMatchScore(job, userQual, userInterests);
                            const matchColor = getMatchColor(score);
                            const btnColor = NEXT_COLORS[job.nextStep] ?? '#1565C0';

                            return (
                                <TouchableOpacity
                                    key={job.id}
                                    style={styles.jobCard}
                                    activeOpacity={0.85}
                                    onPress={() => setSelectedJob(job)}
                                >
                                    {/* Top Row: Title + Match Score */}
                                    <View style={styles.jobCardTop}>
                                        <View style={styles.jobTitleBlock}>
                                            <Text style={styles.jobTitle}>{job.title}</Text>
                                            {job.isExamBased && (
                                                <View style={styles.examBadge}>
                                                    <Text style={styles.examBadgeText}>Exam-Based</Text>
                                                </View>
                                            )}
                                        </View>
                                        <View style={[styles.matchBadge, { borderColor: matchColor }]}>
                                            <Star color={matchColor} size={11} />
                                            <Text style={[styles.matchScore, { color: matchColor }]}>{score}%</Text>
                                        </View>
                                    </View>

                                    {/* Short Desc */}
                                    <Text style={styles.jobShortDesc} numberOfLines={2}>{job.shortDesc}</Text>

                                    {/* Details Row */}
                                    <View style={styles.jobDetailsRow}>
                                        <View style={styles.jobDetailItem}>
                                            <BookOpen color="#888" size={13} />
                                            <Text style={styles.jobDetailText}>{job.eligibility}</Text>
                                        </View>
                                        <View style={styles.jobDetailItem}>
                                            <MapPin color="#888" size={13} />
                                            <Text style={styles.jobDetailText} numberOfLines={1}>{job.applySource.split('/')[0].trim()}</Text>
                                        </View>
                                    </View>

                                    {/* Salary + Badge + CTA */}
                                    <View style={styles.jobCardBottom}>
                                        <Text style={styles.salaryLabel}>{job.salaryLabel}/mo</Text>
                                        <JobTypeBadge type={job.jobType} />
                                        <TouchableOpacity
                                            style={[styles.nextStepBtn, { backgroundColor: btnColor }]}
                                            onPress={() => setSelectedJob(job)}
                                        >
                                            <Text style={styles.nextStepBtnText}>{job.nextStep}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    )}
                    <View style={{ height: 60 }} />
                </ScrollView>
            </View>
        );
    };

    // ── Step 3: Job Detail ────────────────────────────────────────
    const renderJobDetail = () => {
        if (!selectedJob) return null;
        const score = computeMatchScore(selectedJob, userQual, userInterests);
        const matchColor = getMatchColor(score);
        const btnColor = NEXT_COLORS[selectedJob.nextStep] ?? '#1565C0';

        return (
            <View style={styles.flex1}>
                {/* Back row */}
                <View style={styles.backRow}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setSelectedJob(null)}
                    >
                        <ArrowLeft color="#1565C0" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.backTitle} numberOfLines={1}>{selectedJob.title}</Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.detailScrollContent}
                >
                    {/* Hero Card */}
                    <View style={styles.detailHeroCard}>
                        <View style={styles.detailHeroTop}>
                            <View style={styles.detailTitleBlock}>
                                <Text style={styles.detailTitle}>{selectedJob.title}</Text>
                                <View style={styles.detailBadgesRow}>
                                    <JobTypeBadge type={selectedJob.jobType} />
                                    {selectedJob.isExamBased && (
                                        <View style={[styles.badge, { backgroundColor: '#F57F17', marginLeft: 6 }]}>
                                            <Text style={[styles.badgeText, { color: '#fff' }]}>Exam-Based</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                            <View style={[styles.matchCircle, { borderColor: matchColor }]}>
                                <Text style={[styles.matchCircleNum, { color: matchColor }]}>{score}%</Text>
                                <Text style={[styles.matchCircleLabel, { color: matchColor }]}>Match</Text>
                            </View>
                        </View>

                        <Text style={styles.detailDesc}>{selectedJob.shortDesc}</Text>

                        {/* Salary Highlight */}
                        <View style={[styles.salaryHeroBox, { borderColor: '#e8f5e9' }]}>
                            <Text style={styles.salaryHeroLabel}>Monthly Salary</Text>
                            <Text style={styles.salaryHeroValue}>{selectedJob.salaryLabel}</Text>
                        </View>
                    </View>

                    {/* Detail Sections */}
                    <View style={styles.detailSection}>
                        <Text style={styles.detailSectionTitle}>📋 Eligibility</Text>
                        <View style={styles.detailRow}>
                            <CheckCircle color="#2E7D32" size={15} style={{ marginRight: 8, marginTop: 2 }} />
                            <Text style={styles.detailValue}>{selectedJob.eligibility}</Text>
                        </View>
                    </View>

                    <View style={styles.detailSection}>
                        <Text style={styles.detailSectionTitle}>🛠 Required Skills</Text>
                        <View style={styles.skillsWrap}>
                            {selectedJob.skills.map(sk => (
                                <View key={sk} style={styles.skillChip}>
                                    <Text style={styles.skillChipText}>{sk}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.detailSection}>
                        <Text style={styles.detailSectionTitle}>📍 Where to Apply</Text>
                        <View style={styles.applyRow}>
                            <ExternalLink color="#1565C0" size={15} style={{ marginRight: 8 }} />
                            <Text style={styles.applySource}>{selectedJob.applySource}</Text>
                        </View>
                    </View>

                    {/* CTA Button */}
                    <TouchableOpacity style={[styles.ctaButton, { backgroundColor: btnColor }]}>
                        <Text style={styles.ctaButtonText}>{selectedJob.nextStep} →</Text>
                    </TouchableOpacity>

                    <View style={{ height: 60 }} />
                </ScrollView>
            </View>
        );
    };

    // ── Render ────────────────────────────────────────────────────
    if (selectedJob) return renderJobDetail();
    if (selectedCategory) return renderJobList();
    return renderCategoryGrid();
}

// ── Styles ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
    flex1: { flex: 1 },

    // Category Grid
    catScrollContent: { padding: 16, paddingTop: 8 },
    stepTitle: { fontSize: 20, fontWeight: 'bold', color: '#0d47a1', marginBottom: 4 },
    stepSubtitle: { fontSize: 13, color: '#666', marginBottom: 18 },

    catGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    categoryCard: {
        width: '47.5%',
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.06)',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    catIconCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    catEmoji: { fontSize: 22 },
    catTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4, lineHeight: 18 },
    catDesc: { fontSize: 11, color: '#888', marginBottom: 10 },
    catFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    catCount: { fontSize: 12, fontWeight: '700' },

    matchInfoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFDE7',
        borderRadius: 14,
        padding: 14,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#FFF59D',
    },
    matchInfoTitle: { fontSize: 13, fontWeight: 'bold', color: '#E65100', marginBottom: 2 },
    matchInfoDesc: { fontSize: 12, color: '#795548', lineHeight: 17 },

    // Back Row
    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E1EFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    catIconSmall: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    backTitle: { fontSize: 16, fontWeight: 'bold', color: '#0d47a1', flex: 1 },
    filterToggle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E1EFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Filter Bar
    filterRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
    filterChip: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D0E3FF',
        marginRight: 8,
    },
    filterChipActive: { backgroundColor: '#1565C0', borderColor: '#1565C0' },
    filterChipText: { fontSize: 12, color: '#1565C0', fontWeight: '600' },
    filterChipTextActive: { color: '#fff' },

    // Job List
    jobListContent: { padding: 16 },
    emptyState: { alignItems: 'center', padding: 40 },
    emptyEmoji: { fontSize: 40, marginBottom: 12 },
    emptyText: { fontSize: 15, color: '#888' },

    // Job Card
    jobCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#E8EFFF',
        shadowColor: '#1565C0',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    jobCardTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
    jobTitleBlock: { flex: 1 },
    jobTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 4 },

    examBadge: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#FFE0B2',
    },
    examBadgeText: { fontSize: 10, color: '#E65100', fontWeight: '700' },

    matchBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1.5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 3,
        marginLeft: 8,
    },
    matchScore: { fontSize: 12, fontWeight: 'bold' },

    jobShortDesc: { fontSize: 13, color: '#555', lineHeight: 18, marginBottom: 10 },

    jobDetailsRow: { flexDirection: 'row', gap: 16, marginBottom: 12 },
    jobDetailItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    jobDetailText: { fontSize: 12, color: '#666', flex: 1 },

    jobCardBottom: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    salaryLabel: { fontSize: 14, fontWeight: 'bold', color: '#2E7D32', flex: 1 },

    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: { fontSize: 11, fontWeight: 'bold' },

    nextStepBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    nextStepBtnText: { fontSize: 12, fontWeight: 'bold', color: '#fff' },

    // Job Detail
    detailScrollContent: { padding: 16 },

    detailHeroCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#E8EFFF',
        shadowColor: '#1565C0',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    detailHeroTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
    detailTitleBlock: { flex: 1, marginRight: 12 },
    detailTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 8 },
    detailBadgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },

    matchCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    matchCircleNum: { fontSize: 14, fontWeight: 'bold', lineHeight: 16 },
    matchCircleLabel: { fontSize: 9, fontWeight: '600', lineHeight: 12 },

    detailDesc: { fontSize: 14, color: '#555', lineHeight: 20, marginBottom: 14 },

    salaryHeroBox: {
        backgroundColor: '#F1FFF4',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        alignItems: 'center',
    },
    salaryHeroLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
    salaryHeroValue: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32' },

    detailSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eef3ff',
    },
    detailSectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    detailRow: { flexDirection: 'row', alignItems: 'flex-start' },
    detailValue: { fontSize: 14, color: '#333', flex: 1, lineHeight: 20 },

    skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    skillChip: {
        backgroundColor: '#EDE7F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D1C4E9',
    },
    skillChipText: { fontSize: 12, color: '#5E35B1', fontWeight: '600' },

    applyRow: { flexDirection: 'row', alignItems: 'flex-start' },
    applySource: { fontSize: 14, color: '#1565C0', flex: 1, lineHeight: 20 },

    ctaButton: {
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    ctaButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});
