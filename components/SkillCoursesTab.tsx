import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import {
    ArrowLeft,
    Award,
    BookOpen,
    CheckCircle,
    ChevronRight,
    Clock,
    Filter,
    Globe,
    IndianRupee,
    MapPin,
    Zap,
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
    QUAL_COURSE_MAP,
    SKILL_CATEGORIES,
    SKILL_FILTERS,
    SkillCategory,
    SkillCourse,
} from '../data/skillData';

// ── Badge Config ─────────────────────────────────────────────
const BADGE_STYLE: Record<string, { bg: string; text: string }> = {
    'High Salary': { bg: '#1B5E20', text: '#fff' },
    'Remote Friendly': { bg: '#4527A0', text: '#fff' },
    'Future Skill': { bg: '#0D47A1', text: '#fff' },
    'Global Certification': { bg: '#B71C1C', text: '#fff' },
    'Govt Sponsored': { bg: '#1565C0', text: '#fff' },
    'Free Course': { bg: '#2E7D32', text: '#fff' },
    'Self-Employment': { bg: '#E65100', text: '#fff' },
    'Industry Skill': { bg: '#4E342E', text: '#fff' },
    'Field Job': { bg: '#37474F', text: '#fff' },
    'Freelancing': { bg: '#6A1B9A', text: '#fff' },
    'Stable Career': { bg: '#00695C', text: '#fff' },
    'Corporate Jobs': { bg: '#1A237E', text: '#fff' },
    'Rural Support': { bg: '#558B2F', text: '#fff' },
    'Work From Home': { bg: '#00838F', text: '#fff' },
    'No Degree Required': { bg: '#F57F17', text: '#fff' },
};

function CourseBadge({ label }: { label: string }) {
    const style = BADGE_STYLE[label] ?? { bg: '#757575', text: '#fff' };
    return (
        <View style={[styles.badge, { backgroundColor: style.bg }]}>
            <Text style={[styles.badgeText, { color: style.text }]}>{label}</Text>
        </View>
    );
}

// ── Mode Chip ─────────────────────────────────────────────────
const MODE_COLORS: Record<string, { bg: string; text: string }> = {
    'Online': { bg: '#E1F5FE', text: '#0277BD' },
    'Offline': { bg: '#FFF3E0', text: '#E65100' },
    'Blended': { bg: '#EDE7F6', text: '#5E35B1' },
};
function ModeChip({ mode }: { mode: string }) {
    const c = MODE_COLORS[mode] ?? { bg: '#eee', text: '#333' };
    return (
        <View style={[styles.modeChip, { backgroundColor: c.bg }]}>
            <Text style={[styles.modeText, { color: c.text }]}>{mode}</Text>
        </View>
    );
}

// ── Qual to label mapping ─────────────────────────────────────
const QUAL_LABELS: Record<string, string> = {
    '10th': '10th Pass',
    '12th_sci': '12th – Science',
    '12th_com': '12th – Commerce',
    'iti': 'ITI / Vocational',
    'diploma': 'Diploma',
    'graduation': 'Graduate',
};

// ── Main Component ────────────────────────────────────────────
export default function SkillCoursesTab() {
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<SkillCourse | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [userQual, setUserQual] = useState('');
    const [recommendedCatIds, setRecommendedCatIds] = useState<string[]>([]);

    useEffect(() => { loadUserProfile(); }, []);

    const loadUserProfile = async () => {
        try {
            const raw = await AsyncStorage.getItem('userData');
            if (raw) {
                const p = JSON.parse(raw);
                const lvl = p.educationLevel ?? '';
                const stream = (p.stream ?? '').toLowerCase();
                let qualKey = '';
                if (lvl === '10th') qualKey = '10th';
                else if (lvl === '12th') qualKey = stream === 'commerce' ? '12th_com' : '12th_sci';
                else if (lvl === 'Diploma') qualKey = 'diploma';
                else if (lvl === 'ITI') qualKey = 'iti';
                else qualKey = 'graduation';
                setUserQual(qualKey);
                setRecommendedCatIds(QUAL_COURSE_MAP[qualKey] ?? []);
            }
        } catch (_) { }
    };

    useFocusEffect(
        useCallback(() => {
            setSelectedCategory(null);
            setSelectedCourse(null);
            setActiveFilter('all');
            setShowFilters(false);
        }, [])
    );

    // ── Filter Courses ───────────────────────────────────────────
    const filteredCourses: SkillCourse[] = (selectedCategory?.courses ?? []).filter(c => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'high_salary') return c.salaryMin >= 20000;
        if (activeFilter === 'short_duration') return c.duration.toLowerCase().includes('month')
            ? parseInt(c.duration) <= 3
            : true;
        if (activeFilter === 'free') return c.isFree === true;
        if (activeFilter === 'remote') return c.tags.includes('remote');
        if (activeFilter === 'self_employment') return c.tags.includes('self_employment');
        if (activeFilter === 'future_skill') return c.tags.includes('future_skill');
        return true;
    });

    // ── Step 1: Category Grid ─────────────────────────────────────
    const renderCategoryGrid = () => (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.catScrollContent}
        >
            <Text style={styles.stepTitle}>Choose a Skill Area</Text>
            <Text style={styles.stepSubtitle}>
                Short-term courses • Certifications • Job-ready skills
            </Text>

            {/* Personalised suggestion */}
            {userQual !== '' && recommendedCatIds.length > 0 && (
                <View style={styles.suggestCard}>
                    <Zap color="#F57F17" size={16} style={{ marginRight: 8 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.suggestTitle}>Recommended for {QUAL_LABELS[userQual]}</Text>
                        <Text style={styles.suggestDesc} numberOfLines={2}>
                            {SKILL_CATEGORIES
                                .filter(c => recommendedCatIds.includes(c.id))
                                .map(c => c.icon + ' ' + c.title)
                                .slice(0, 3)
                                .join(' · ')}
                        </Text>
                    </View>
                </View>
            )}

            {/* Grid */}
            <View style={styles.catGrid}>
                {SKILL_CATEGORIES.map(cat => {
                    const isRecommended = recommendedCatIds.includes(cat.id);
                    return (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.categoryCard,
                                { backgroundColor: cat.color },
                                isRecommended && styles.recommendedCard,
                            ]}
                            activeOpacity={0.8}
                            onPress={() => { setSelectedCategory(cat); setActiveFilter('all'); }}
                        >
                            {isRecommended && (
                                <View style={styles.recommendedBanner}>
                                    <Text style={styles.recommendedBannerText}>✦ For You</Text>
                                </View>
                            )}
                            <View style={[styles.catIconCircle, { backgroundColor: cat.iconBg }]}>
                                <Text style={styles.catEmoji}>{cat.icon}</Text>
                            </View>
                            <Text style={[styles.catTitle, { color: cat.accentColor }]} numberOfLines={2}>
                                {cat.title}
                            </Text>
                            <Text style={styles.catDesc} numberOfLines={1}>{cat.description}</Text>
                            <View style={styles.catFooter}>
                                <Text style={[styles.catCount, { color: cat.accentColor }]}>
                                    {cat.courses.length} Courses
                                </Text>
                                <ChevronRight color={cat.accentColor} size={16} />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Govt vs Paid note */}
            <View style={styles.comparisonCard}>
                <View style={styles.comparisonCol}>
                    <Text style={styles.compFree}>🆓 Free Govt Training</Text>
                    <Text style={styles.compPoint}>• NSDC / PMKVY / DDU-GKY</Text>
                    <Text style={styles.compPoint}>• Placement Support</Text>
                    <Text style={styles.compPoint}>• Certificate on Completion</Text>
                    <Text style={styles.compPoint}>• Rural-Friendly Centres</Text>
                </View>
                <View style={styles.compDivider} />
                <View style={styles.comparisonCol}>
                    <Text style={styles.compPaid}>💳 Paid Private Training</Text>
                    <Text style={styles.compPoint}>• Industry-recognized certs</Text>
                    <Text style={styles.compPoint}>• Live projects & mentors</Text>
                    <Text style={styles.compPoint}>• Higher job ROI</Text>
                    <Text style={styles.compPoint}>• Global platforms</Text>
                </View>
            </View>

            <View style={{ height: 60 }} />
        </ScrollView>
    );

    // ── Step 2: Course List ───────────────────────────────────────
    const renderCourseList = () => {
        if (!selectedCategory) return null;
        return (
            <View style={styles.flex1}>
                {/* Header Row */}
                <View style={styles.backRow}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => { setSelectedCategory(null); setActiveFilter('all'); }}
                    >
                        <ArrowLeft color={selectedCategory.accentColor} size={20} />
                    </TouchableOpacity>
                    <View style={[styles.catIconSmall, { backgroundColor: selectedCategory.iconBg }]}>
                        <Text style={{ fontSize: 14 }}>{selectedCategory.icon}</Text>
                    </View>
                    <Text style={[styles.backTitle, { color: selectedCategory.accentColor }]} numberOfLines={1}>
                        {selectedCategory.title}
                    </Text>
                    <TouchableOpacity
                        style={[styles.filterToggle, { backgroundColor: showFilters ? selectedCategory.accentColor : '#EEE' }]}
                        onPress={() => setShowFilters(p => !p)}
                    >
                        <Filter color={showFilters ? '#fff' : selectedCategory.accentColor} size={16} />
                    </TouchableOpacity>
                </View>

                {/* Filter chips */}
                {showFilters && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filterRow}
                    >
                        {SKILL_FILTERS.map(f => (
                            <TouchableOpacity
                                key={f.id}
                                style={[styles.filterChip, activeFilter === f.id && { backgroundColor: selectedCategory.accentColor, borderColor: selectedCategory.accentColor }]}
                                onPress={() => setActiveFilter(f.id)}
                            >
                                <Text style={[styles.filterChipText, activeFilter === f.id && { color: '#fff' }]}>
                                    {f.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}

                {/* Course Cards */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.courseListContent}
                >
                    {filteredCourses.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyEmoji}>🔍</Text>
                            <Text style={styles.emptyText}>No courses match this filter.</Text>
                        </View>
                    ) : (
                        filteredCourses.map(course => (
                            <TouchableOpacity
                                key={course.id}
                                style={styles.courseCard}
                                activeOpacity={0.85}
                                onPress={() => setSelectedCourse(course)}
                            >
                                {/* Title + Free tag */}
                                <View style={styles.courseTitleRow}>
                                    <Text style={styles.courseTitle}>{course.name}</Text>
                                    {course.isFree && (
                                        <View style={styles.freeTag}>
                                            <Text style={styles.freeTagText}>FREE</Text>
                                        </View>
                                    )}
                                </View>

                                {/* Meta row */}
                                <View style={styles.metaRow}>
                                    <View style={styles.metaItem}>
                                        <Clock color="#888" size={12} />
                                        <Text style={styles.metaText}>{course.duration}</Text>
                                    </View>
                                    <View style={styles.metaItem}>
                                        <BookOpen color="#888" size={12} />
                                        <Text style={styles.metaText} numberOfLines={1}>{course.eligibility}</Text>
                                    </View>
                                    <ModeChip mode={course.mode} />
                                </View>

                                {/* Salary */}
                                <Text style={styles.courseSalary}>{course.salaryLabel}</Text>

                                {/* Badges */}
                                <View style={styles.badgesRow}>
                                    {course.badges.slice(0, 3).map(b => (
                                        <CourseBadge key={b} label={b} />
                                    ))}
                                </View>

                                {/* Bottom row */}
                                <View style={styles.courseCardBottom}>
                                    <Text style={styles.certText} numberOfLines={1}>
                                        🏅 {course.certAuthority}
                                    </Text>
                                    <View style={[styles.viewBtn, { backgroundColor: selectedCategory.accentColor }]}>
                                        <Text style={styles.viewBtnText}>View</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                    <View style={{ height: 60 }} />
                </ScrollView>
            </View>
        );
    };

    // ── Step 3: Course Detail ─────────────────────────────────────
    const renderCourseDetail = () => {
        if (!selectedCourse || !selectedCategory) return null;
        const accent = selectedCategory.accentColor;

        return (
            <View style={styles.flex1}>
                {/* Back row */}
                <View style={styles.backRow}>
                    <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCourse(null)}>
                        <ArrowLeft color={accent} size={20} />
                    </TouchableOpacity>
                    <Text style={[styles.backTitle, { color: accent }]} numberOfLines={1}>
                        {selectedCourse.name}
                    </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailScrollContent}>

                    {/* Hero */}
                    <View style={[styles.detailHeroCard, { borderColor: selectedCategory.color }]}>
                        <View style={styles.detailHeroTop}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.detailTitle, { color: '#1A1A2E' }]}>{selectedCourse.name}</Text>
                                <View style={styles.detailBadgesRow}>
                                    {selectedCourse.badges.map(b => <CourseBadge key={b} label={b} />)}
                                </View>
                            </View>
                            {selectedCourse.isFree && (
                                <View style={[styles.freeTag, { alignSelf: 'flex-start', marginLeft: 10 }]}>
                                    <Text style={styles.freeTagText}>FREE</Text>
                                </View>
                            )}
                        </View>

                        {/* Salary */}
                        <View style={[styles.salaryBox, { borderColor: selectedCategory.color }]}>
                            <IndianRupee color={accent} size={18} />
                            <Text style={[styles.salaryBoxValue, { color: accent }]}>{selectedCourse.salaryLabel}</Text>
                        </View>
                    </View>

                    {/* Details */}
                    <View style={styles.detailSection}>
                        <Text style={styles.detailSectionTitle}>📋 Course Info</Text>
                        <Row icon={<Clock color={accent} size={14} />} label="Duration" value={selectedCourse.duration} />
                        <Row icon={<BookOpen color={accent} size={14} />} label="Eligibility" value={selectedCourse.eligibility} />
                        <Row icon={<Award color={accent} size={14} />} label="Authority" value={selectedCourse.certAuthority} />
                        <Row icon={<Globe color={accent} size={14} />} label="Mode" value={selectedCourse.mode} />
                    </View>

                    <View style={styles.detailSection}>
                        <Text style={styles.detailSectionTitle}>🖥 Top Platforms / Institutes</Text>
                        {selectedCourse.platforms.map(p => (
                            <View key={p} style={styles.listRow}>
                                <CheckCircle color={accent} size={13} style={{ marginRight: 8, marginTop: 1 }} />
                                <Text style={styles.listText}>{p}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.detailSection}>
                        <Text style={styles.detailSectionTitle}>💼 Job Roles</Text>
                        {selectedCourse.jobRoles.map(r => (
                            <View key={r} style={styles.listRow}>
                                <MapPin color={accent} size={13} style={{ marginRight: 8, marginTop: 1 }} />
                                <Text style={styles.listText}>{r}</Text>
                            </View>
                        ))}
                    </View>

                    {/* CTA */}
                    <TouchableOpacity style={[styles.ctaButton, { backgroundColor: accent }]}>
                        <Text style={styles.ctaButtonText}>
                            {selectedCourse.isFree ? '🆓 Enroll for Free →' : '🚀 Start Learning →'}
                        </Text>
                    </TouchableOpacity>

                    <View style={{ height: 60 }} />
                </ScrollView>
            </View>
        );
    };

    if (selectedCourse) return renderCourseDetail();
    if (selectedCategory) return renderCourseList();
    return renderCategoryGrid();
}

// ── Helper Row ────────────────────────────────────────────────
function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoIcon}>{icon}</View>
            <Text style={styles.infoLabel}>{label}:</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

// ── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
    flex1: { flex: 1 },

    // Category Grid
    catScrollContent: { padding: 16, paddingTop: 8 },
    stepTitle: { fontSize: 20, fontWeight: 'bold', color: '#0d47a1', marginBottom: 4 },
    stepSubtitle: { fontSize: 13, color: '#666', marginBottom: 14 },

    suggestCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFDE7',
        borderRadius: 14,
        padding: 12,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#FFF59D',
    },
    suggestTitle: { fontSize: 12, fontWeight: 'bold', color: '#E65100', marginBottom: 2 },
    suggestDesc: { fontSize: 11, color: '#795548' },

    catGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    categoryCard: {
        width: '47.5%',
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.06)',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    recommendedCard: { borderWidth: 2, borderColor: '#F57F17' },
    recommendedBanner: {
        backgroundColor: '#F57F17',
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        marginBottom: 6,
    },
    recommendedBannerText: { fontSize: 9, fontWeight: 'bold', color: '#fff' },
    catIconCircle: {
        width: 42, height: 42, borderRadius: 21,
        justifyContent: 'center', alignItems: 'center', marginBottom: 8,
    },
    catEmoji: { fontSize: 20 },
    catTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 3, lineHeight: 17 },
    catDesc: { fontSize: 10, color: '#888', marginBottom: 8 },
    catFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    catCount: { fontSize: 11, fontWeight: '700' },

    // Comparison Card
    comparisonCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#E8EFFF',
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    comparisonCol: { flex: 1 },
    compDivider: { width: 1, backgroundColor: '#eee', marginHorizontal: 10 },
    compFree: { fontSize: 12, fontWeight: 'bold', color: '#2E7D32', marginBottom: 6 },
    compPaid: { fontSize: 12, fontWeight: 'bold', color: '#1565C0', marginBottom: 6 },
    compPoint: { fontSize: 11, color: '#555', marginBottom: 3 },

    // Back Row
    backRow: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 16, paddingVertical: 12,
        borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
    },
    backButton: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: '#E1EFFF',
        justifyContent: 'center', alignItems: 'center', marginRight: 10,
    },
    catIconSmall: {
        width: 28, height: 28, borderRadius: 14,
        justifyContent: 'center', alignItems: 'center', marginRight: 8,
    },
    backTitle: { fontSize: 16, fontWeight: 'bold', flex: 1 },
    filterToggle: {
        width: 36, height: 36, borderRadius: 18,
        justifyContent: 'center', alignItems: 'center',
    },

    // Filter
    filterRow: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
    filterChip: {
        paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20,
        backgroundColor: '#fff', borderWidth: 1, borderColor: '#D0E3FF', marginRight: 8,
    },
    filterChipText: { fontSize: 12, color: '#1565C0', fontWeight: '600' },

    // Course List
    courseListContent: { padding: 16 },
    emptyState: { alignItems: 'center', padding: 40 },
    emptyEmoji: { fontSize: 40, marginBottom: 12 },
    emptyText: { fontSize: 15, color: '#888' },

    // Course Card
    courseCard: {
        backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 14,
        borderWidth: 1, borderColor: '#E8EFFF',
        shadowColor: '#1565C0', shadowOpacity: 0.06, shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 }, elevation: 3,
    },
    courseTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    courseTitle: { fontSize: 15, fontWeight: 'bold', color: '#1A1A2E', flex: 1 },
    freeTag: {
        backgroundColor: '#2E7D32', paddingHorizontal: 8, paddingVertical: 3,
        borderRadius: 8, marginLeft: 6,
    },
    freeTagText: { fontSize: 10, fontWeight: 'bold', color: '#fff' },

    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metaText: { fontSize: 11, color: '#666' },
    modeChip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
    modeText: { fontSize: 10, fontWeight: '700' },

    courseSalary: { fontSize: 14, fontWeight: 'bold', color: '#1B5E20', marginBottom: 8 },

    badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    badgeText: { fontSize: 10, fontWeight: 'bold' },

    courseCardBottom: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    certText: { fontSize: 12, color: '#555', flex: 1 },
    viewBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10 },
    viewBtnText: { fontSize: 12, fontWeight: 'bold', color: '#fff' },

    // Detail
    detailScrollContent: { padding: 16 },
    detailHeroCard: {
        backgroundColor: '#fff', borderRadius: 20, padding: 18, marginBottom: 14,
        borderWidth: 1, shadowColor: '#1565C0', shadowOpacity: 0.08,
        shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4,
    },
    detailHeroTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
    detailTitle: { fontSize: 19, fontWeight: 'bold', marginBottom: 10, lineHeight: 24 },
    detailBadgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    salaryBox: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        backgroundColor: '#F1FFF4', borderRadius: 12, padding: 12, borderWidth: 1,
    },
    salaryBoxValue: { fontSize: 18, fontWeight: 'bold' },

    detailSection: {
        backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12,
        borderWidth: 1, borderColor: '#eef3ff',
    },
    detailSectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 10 },

    infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
    infoIcon: { marginRight: 8, marginTop: 1 },
    infoLabel: { fontSize: 13, fontWeight: 'bold', color: '#444', width: 75 },
    infoValue: { fontSize: 13, color: '#333', flex: 1, lineHeight: 18 },

    listRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
    listText: { fontSize: 13, color: '#333', flex: 1, lineHeight: 18 },

    ctaButton: {
        borderRadius: 16, padding: 16, alignItems: 'center', marginTop: 8,
        shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 }, elevation: 3,
    },
    ctaButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});
