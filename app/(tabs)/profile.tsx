import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { Check, Globe, GraduationCap, HelpCircle, Landmark, LogOut, MapPin, Settings, Shield, User } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LanguageId, useLanguage } from '../../context/LanguageContext';

const LANGUAGES: { id: LanguageId; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'hi', name: 'Hindi' },
    { id: 'mr', name: 'Marathi' },
];

export default function ProfileScreen() {
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();
    const [langModalVisible, setLangModalVisible] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    const loadUserData = async () => {
        try {
            const data = await AsyncStorage.getItem('userData');
            if (data) {
                setUserData(JSON.parse(data));
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

    const displayName = userData?.name || t('profile_name');
    const displaySub = userData ? `${userData.educationLevel} • ${userData.stream} Stream` : t('profile_sub');

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
                    </View>
                    <Text style={styles.name}>{displayName}</Text>
                    <Text style={styles.sub}>{displaySub}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Overview</Text>

                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <MapPin color="#666" size={20} />
                            <Text style={styles.infoText}>{userData?.location || 'Not set'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <GraduationCap color="#666" size={20} />
                            <Text style={styles.infoText}>{userData?.marks ? `Marks: ${userData.marks}` : 'Grades not specified'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Landmark color="#666" size={20} />
                            <Text style={styles.infoText}>{userData?.financialPreference || 'Budget'} Preference</Text>
                        </View>
                    </View>

                    <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Interests</Text>
                    <View style={styles.interestsRow}>
                        {userData?.interests?.map((interest: string) => (
                            <View key={interest} style={styles.interestTag}>
                                <Text style={styles.interestTagText}>{interest}</Text>
                            </View>
                        )) || <Text style={styles.noDataText}>No interests selected</Text>}
                    </View>

                    <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Account Settings</Text>

                    <TouchableOpacity style={styles.listItem} onPress={() => setLangModalVisible(true)}>
                        <Globe color="#1976d2" size={24} style={styles.listIcon} />
                        <Text style={styles.listTitle}>{t('choose_lang')}</Text>
                        <Text style={styles.listValue}>{LANGUAGES.find(l => l.id === language)?.name}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listItem}>
                        <User color="#1976d2" size={24} style={styles.listIcon} />
                        <Text style={styles.listTitle}>{t('edit_info')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listItem}>
                        <Settings color="#1976d2" size={24} style={styles.listIcon} />
                        <Text style={styles.listTitle}>{t('app_settings')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listItem}>
                        <Shield color="#1976d2" size={24} style={styles.listIcon} />
                        <Text style={styles.listTitle}>{t('privacy_terms')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listItem}>
                        <HelpCircle color="#1976d2" size={24} style={styles.listIcon} />
                        <Text style={styles.listTitle}>{t('contact_support')}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <LogOut color="#e74c3c" size={20} />
                    <Text style={styles.logoutText}>{t('log_out')}</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={langModalVisible}
                onRequestClose={() => setLangModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setLangModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t('choose_lang')}</Text>
                        </View>
                        <FlatList
                            data={LANGUAGES}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.langOption}
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
                                        <Check color="#1976d2" size={20} />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8faff' },
    header: { alignItems: 'center', padding: 24, backgroundColor: '#0d47a1', borderBottomLeftRadius: 32, borderBottomRightRadius: 32, paddingTop: 60, paddingBottom: 40 },
    avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#42a5f5', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 4, borderColor: 'rgba(255,255,255,0.2)' },
    avatarText: { fontSize: 40, color: '#ffffff', fontWeight: 'bold' },
    name: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
    sub: { fontSize: 16, color: '#e3f2fd', opacity: 0.9 },
    section: { padding: 24, paddingTop: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
    infoCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, gap: 12, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    infoText: { fontSize: 15, color: '#555' },
    interestsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    interestTag: { backgroundColor: '#e3f2fd', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#bbdefb' },
    interestTagText: { color: '#1976d2', fontSize: 13, fontWeight: '600' },
    noDataText: { color: '#888', fontStyle: 'italic' },
    listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
    listIcon: { marginRight: 16 },
    listTitle: { fontSize: 16, color: '#333', fontWeight: '500', flex: 1 },
    listValue: { fontSize: 14, color: '#888', marginRight: 8 },
    logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 18, marginHorizontal: 24, marginBottom: 40, marginTop: 20, backgroundColor: '#fff0f0', borderRadius: 12, gap: 8, borderWidth: 1, borderColor: '#ffdada' },
    logoutText: { color: '#e74c3c', fontSize: 16, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '60%' },
    modalHeader: { marginBottom: 20, alignItems: 'center' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    langOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
    langOptionText: { fontSize: 18, color: '#333' },
    selectedLangText: { color: '#1976d2', fontWeight: 'bold' },
});

