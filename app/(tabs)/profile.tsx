import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { Check, ChevronRight, Edit2, Globe, GraduationCap, LogOut, Mail, MapPin, Save, X } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LanguageId, useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';

const LANGUAGES: { id: LanguageId; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'hi', name: 'Hindi' },
    { id: 'mr', name: 'Marathi' },
];

export default function ProfileScreen() {
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();
    const [langModalVisible, setLangModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    // Edit State
    const [editName, setEditName] = useState('');
    const [editLocation, setEditLocation] = useState('');
    const [editLevel, setEditLevel] = useState('');
    const [editStream, setEditStream] = useState('');
    const [editMarks, setEditMarks] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    const loadUserData = async () => {
        try {
            const data = await AsyncStorage.getItem('userData');
            if (data) {
                const parsed = JSON.parse(data);
                setUserData(parsed);
                setEditName(parsed.full_name || parsed.name || '');
                setEditLocation(parsed.location || '');
                setEditLevel(parsed.education_level || parsed.educationLevel || '');
                setEditStream(parsed.stream || '');
                setEditMarks(parsed.marks || '');
            }
        } catch (e) {
            console.error('Error loading user data', e);
        }
    };

    const handleLogout = async () => {
        Alert.alert(t('log_out'), t('logout_confirm'), [
            { text: t('cancel'), style: 'cancel' },
            {
                text: t('log_out'), onPress: async () => {
                    await AsyncStorage.removeItem('mockSession');
                    await AsyncStorage.removeItem('hasOnboarded');
                    router.replace('/(auth)');
                }
            },
        ]);
    };

    const saveProfileChanges = async () => {
        if (!userData?.id) {
            Alert.alert(t('error'), t('unable_find_session'));
            return;
        }

        setIsSaving(true);
        try {
            const { data, error } = await supabase
                .from('users')
                .update({
                    full_name: editName,
                    location: editLocation,
                    education_level: editLevel,
                    stream: editStream,
                    marks: editMarks
                })
                .eq('id', userData.id)
                .select()
                .single();

            if (error) throw error;

            setUserData(data);
            await AsyncStorage.setItem('userData', JSON.stringify(data));
            setEditModalVisible(false);
            Alert.alert(t('success'), t('profile_update_success'));
        } catch (error: any) {
            Alert.alert(t('update_failed'), error.message || t('something_went_wrong'));
        } finally {
            setIsSaving(false);
        }
    };

    const displayName = userData?.full_name || userData?.name || t('profile_name');
    const displayLevel = userData?.education_level || userData?.educationLevel || '';
    const displayStream = userData?.stream || '';
    const displaySub = (displayLevel || displayStream)
        ? `${displayLevel} ${displayStream ? `• ${displayStream}` : ''}`
        : t('profile_sub');

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
                {/* Modern Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.avatarWrapper}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
                            </View>
                            <TouchableOpacity style={styles.editAvatarBtn} activeOpacity={0.8}>
                                <Edit2 color="#fff" size={14} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.name}>{displayName}</Text>
                        <View style={styles.subRow}>
                            <GraduationCap color="#e3f2fd" size={14} style={{ marginRight: 6 }} />
                            <Text style={styles.sub}>{displaySub}</Text>
                        </View>
                    </View>
                </View>

                {/* Profile Stats Row (Modern Component) */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>{t('saved_items') || 'Saved'}</Text>
                    </View>
                    <View style={[styles.statItem, styles.statDivider]}>
                        <Text style={styles.statValue}>4</Text>
                        <Text style={styles.statLabel}>{t('active_paths') || 'Paths'}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>85%</Text>
                        <Text style={styles.statLabel}>{t('profile_strength') || 'Strength'}</Text>
                    </View>
                </View>

                {/* Info Sections */}
                <View style={styles.content}>
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{t('profile_overview')}</Text>
                            <TouchableOpacity onPress={() => setEditModalVisible(true)}>
                                <Text style={styles.editLink}>{t('edit_info')}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <View style={[styles.infoIconBox, { backgroundColor: '#E3F2FD' }]}>
                                    <Mail color="#1976D2" size={18} />
                                </View>
                                <View style={styles.infoTexts}>
                                    <Text style={styles.infoLabel}>{t('email')}</Text>
                                    <Text style={styles.infoText}>{userData?.email || t('not_set')}</Text>
                                </View>
                            </View>

                            <View style={styles.infoRow}>
                                <View style={[styles.infoIconBox, { backgroundColor: '#E8F5E9' }]}>
                                    <MapPin color="#2E7D32" size={18} />
                                </View>
                                <View style={styles.infoTexts}>
                                    <Text style={styles.infoLabel}>{t('location_label') || 'Location'}</Text>
                                    <Text style={styles.infoText}>{userData?.location || t('not_set')}</Text>
                                </View>
                            </View>

                            <View style={styles.infoRow}>
                                <View style={[styles.infoIconBox, { backgroundColor: '#FFF3E0' }]}>
                                    <Check color="#E65100" size={18} />
                                </View>
                                <View style={styles.infoTexts}>
                                    <Text style={styles.infoLabel}>{t('marks_label') || 'Score'}</Text>
                                    <Text style={styles.infoText}>{userData?.marks ? `${userData.marks}` : t('marks_not_set')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('profile_interests')}</Text>
                        <View style={styles.interestsRow}>
                            {userData?.interests?.map((interest: string) => (
                                <View key={interest} style={styles.interestTag}>
                                    <Text style={styles.interestTagText}>{interest}</Text>
                                </View>
                            )) || <Text style={styles.noDataText}>{t('no_interests')}</Text>}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('profile_settings')}</Text>
                        <View style={styles.settingsGroup}>
                            <TouchableOpacity style={styles.listItem} onPress={() => setLangModalVisible(true)}>
                                <View style={[styles.listIconBox, { backgroundColor: '#F3E5F5' }]}>
                                    <Globe color="#8E24AA" size={20} />
                                </View>
                                <View style={styles.listTextContent}>
                                    <Text style={styles.listTitle}>{t('choose_lang')}</Text>
                                    <Text style={styles.listSub}>{LANGUAGES.find(l => l.id === language)?.name}</Text>
                                </View>
                                <ChevronRight color="#ccc" size={18} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.listItem} onPress={handleLogout}>
                                <View style={[styles.listIconBox, { backgroundColor: '#FFEBEE' }]}>
                                    <LogOut color="#D32F2F" size={20} />
                                </View>
                                <View style={styles.listTextContent}>
                                    <Text style={[styles.listTitle, { color: '#D32F2F' }]}>{t('log_out')}</Text>
                                </View>
                                <ChevronRight color="#ccc" size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Language Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={langModalVisible}
                onRequestClose={() => setLangModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setLangModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>{t('choose_lang')}</Text>
                        <View style={styles.langList}>
                            {LANGUAGES.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.langOption, language === item.id && styles.langOptionSelected]}
                                    onPress={() => {
                                        setLanguage(item.id);
                                        setLangModalVisible(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.langOptionText,
                                        language === item.id && styles.selectedLangText
                                    ]}>
                                        {item.name}
                                    </Text>
                                    {language === item.id && (
                                        <View style={styles.checkCircle}>
                                            <Check color="#fff" size={12} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Pressable>
            </Modal>

            {/* Edit Profile Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalOverlayFullScreen}>
                    <View style={styles.editModalContent}>
                        <View style={styles.editHeaderRow}>
                            <Text style={styles.modalTitle}>{t('edit_profile_title')}</Text>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.closeBtn}>
                                <X color="#666" size={22} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.editForm}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.editLabel}>{t('full_name_label')}</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editName}
                                    onChangeText={setEditName}
                                    placeholder={t('full_name_label')}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.editLabel}>{t('location_label')}</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editLocation}
                                    onChangeText={setEditLocation}
                                    placeholder={t('location_label')}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.editLabel}>{t('qual_label')}</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editLevel}
                                    onChangeText={setEditLevel}
                                    placeholder={t('qual_label')}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.editLabel}>{t('stream_label')}</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editStream}
                                    onChangeText={setEditStream}
                                    placeholder={t('stream_label')}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.editLabel}>{t('marks_cgpa_label')}</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editMarks}
                                    onChangeText={setEditMarks}
                                    placeholder={t('marks_cgpa_label')}
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.saveBtn}
                                onPress={saveProfileChanges}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <Text style={styles.saveBtnText}>{t('saving')}</Text>
                                ) : (
                                    <>
                                        <Save color="#fff" size={20} style={{ marginRight: 8 }} />
                                        <Text style={styles.saveBtnText}>{t('save_changes')}</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FE' },
    scrollContainer: { flex: 1 },
    header: {
        backgroundColor: '#0D47A1',
        paddingTop: 60,
        paddingBottom: 60,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    headerContent: {
        alignItems: 'center',
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#42A5F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    avatarText: { fontSize: 42, color: '#fff', fontWeight: 'bold' },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#1E88E5',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#0D47A1',
    },
    name: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
    subRow: { flexDirection: 'row', alignItems: 'center' },
    sub: { fontSize: 14, color: '#E3F2FD', opacity: 0.9 },

    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 24,
        marginTop: -30,
        borderRadius: 20,
        padding: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 8 },
    },
    statItem: { flex: 1, alignItems: 'center' },
    statDivider: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#F0F0F0' },
    statValue: { fontSize: 18, fontWeight: 'bold', color: '#0D47A1' },
    statLabel: { fontSize: 12, color: '#888', marginTop: 2 },

    content: { padding: 24 },
    section: { marginBottom: 32 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A2E' },
    editLink: { color: '#0D47A1', fontSize: 14, fontWeight: '600' },

    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        gap: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    infoRow: { flexDirection: 'row', alignItems: 'center' },
    infoIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoTexts: { flex: 1 },
    infoLabel: { fontSize: 12, color: '#888', marginBottom: 2 },
    infoText: { fontSize: 15, color: '#222', fontWeight: '600' },

    interestsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    interestTag: {
        backgroundColor: '#EEF3FF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#D8E2FF',
    },
    interestTagText: { color: '#0D47A1', fontSize: 13, fontWeight: '600' },
    noDataText: { color: '#AAA', fontStyle: 'italic', fontSize: 14 },

    settingsGroup: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    listIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    listTextContent: { flex: 1 },
    listTitle: { fontSize: 16, color: '#222', fontWeight: 'bold' },
    listSub: { fontSize: 13, color: '#888', marginTop: 2 },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 28,
        paddingTop: 12,
        maxHeight: '60%',
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 24,
    },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 16 },
    langList: { gap: 12 },
    langOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        borderRadius: 16,
        backgroundColor: '#F8F9FE',
    },
    langOptionSelected: { backgroundColor: '#EEF3FF', borderWidth: 1, borderColor: '#0D47A1' },
    langOptionText: { fontSize: 16, color: '#444', fontWeight: '600' },
    selectedLangText: { color: '#0D47A1' },
    checkCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0D47A1',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalOverlayFullScreen: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        padding: 20,
    },
    editModalContent: {
        backgroundColor: '#fff',
        borderRadius: 32,
        padding: 24,
        maxHeight: '90%',
        elevation: 20,
    },
    editHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editForm: { flexGrow: 0 },
    inputGroup: { marginBottom: 18 },
    editLabel: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 8 },
    editInput: {
        backgroundColor: '#F8FAFF',
        borderWidth: 1,
        borderColor: '#E1EFFF',
        borderRadius: 14,
        padding: 16,
        fontSize: 15,
        color: '#222',
    },
    saveBtn: {
        backgroundColor: '#0D47A1',
        flexDirection: 'row',
        padding: 18,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        elevation: 4,
    },
    saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
