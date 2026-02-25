import { BookOpen, Briefcase, CheckCircle, Clock, PenTool } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';

const TIMELINE = [
    { id: '1', title: 'Start Web Design Course', status: 'In Progress', date: 'March 2024', icon: PenTool, color: '#f5b041' },
    { id: '2', title: 'Apply for XYZ Polytechnic', status: 'Pending', date: 'April 2024', icon: BookOpen, color: '#e74c3c' },
    { id: '3', title: 'Learn Freelancing Basics', status: 'Completed', date: 'Feb 2024', icon: Briefcase, color: '#2ecc71' },
];

export default function PlanScreen() {
    const { t } = useLanguage();

    const getStatusText = (status: string) => {
        if (status === 'Completed') return t('status_completed');
        if (status === 'In Progress') return t('status_in_progress');
        return t('status_pending');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t('plan_title')}</Text>
                <Text style={styles.headerSubtitle}>{t('plan_subtitle')}</Text>
            </View>

            <View style={styles.timelineContainer}>
                {TIMELINE.map((item, index) => {
                    const Icon = item.icon;
                    const isLast = index === TIMELINE.length - 1;

                    return (
                        <View key={item.id} style={styles.timelineItem}>
                            <View style={styles.timelineLeft}>
                                <View style={[styles.timelineIconWrapper, { backgroundColor: item.color + '20' }]}>
                                    <Icon color={item.color} size={20} />
                                </View>
                                {!isLast && <View style={styles.timelineLine} />}
                            </View>

                            <View style={styles.timelineContent}>
                                <View style={styles.timelineHeader}>
                                    <Text style={styles.timelineTitle}>{item.title}</Text>
                                    <View style={[styles.statusBadge, item.status === 'Completed' ? styles.statusSuccess : styles.statusPending]}>
                                        {item.status === 'Completed' ? <CheckCircle size={10} color="#fff" /> : <Clock size={10} color="#fff" />}
                                        <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
                                    </View>
                                </View>
                                <Text style={styles.timelineDate}>{item.date}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            <View style={styles.savedSection}>
                <Text style={styles.sectionTitle}>{t('bookmarks_title')}</Text>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>{t('no_bookmarks')}</Text>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fcfcfc' },
    header: { backgroundColor: '#0d47a1', padding: 24, paddingTop: 60, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 32 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
    headerSubtitle: { fontSize: 14, color: '#e3f2fd', marginTop: 4 },
    timelineContainer: { marginBottom: 40, paddingHorizontal: 24 },
    timelineItem: { flexDirection: 'row', gap: 16 },
    timelineLeft: { alignItems: 'center', width: 40 },
    timelineIconWrapper: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
    timelineLine: { width: 2, flex: 1, backgroundColor: '#e0e0e0', marginTop: -4, marginBottom: -4 },
    timelineContent: { flex: 1, paddingBottom: 32 },
    timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    timelineTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1, paddingRight: 8 },
    timelineDate: { fontSize: 13, color: '#888' },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
    statusSuccess: { backgroundColor: '#2ecc71' },
    statusPending: { backgroundColor: '#f39c12' },
    statusText: { fontSize: 10, color: '#ffffff', fontWeight: 'bold' },
    savedSection: { marginTop: 10, paddingHorizontal: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
    emptyState: { padding: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8faff', borderRadius: 16, borderWidth: 1, borderColor: '#e0e0e0', borderStyle: 'dashed' },
    emptyStateText: { color: '#666', textAlign: 'center' }
});
