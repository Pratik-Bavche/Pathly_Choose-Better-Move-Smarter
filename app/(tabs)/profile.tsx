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
            Alert.alert('Error', 'Unable to find user session.');
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
            Alert.alert('Success', 'Profile updated successfully.');
        } catch (error: any) {
            Alert.alert('Update Failed', error.message || 'Something went wrong while updating.');
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
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.container}>
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
                            <Mail color="#666" size={20} />
                            <Text style={styles.infoText}>{userData?.email || 'Not set'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MapPin color="#666" size={20} />
                            <Text style={styles.infoText}>{userData?.location || 'Not set'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <GraduationCap color="#666" size={20} />
                            <Text style={styles.infoText}>{userData?.marks ? `Marks: ${userData.marks}` : 'Marks not specified'}</Text>
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

                    <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Settings</Text>

                    <TouchableOpacity style={styles.listItem} onPress={() => setEditModalVisible(true)}>
                        <Edit2 color="#1976d2" size={22} style={styles.listIcon} />
                        <Text style={styles.listTitle}>{t('edit_info')}</Text>
                        <ChevronRight color="#ccc" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listItem} onPress={() => setLangModalVisible(true)}>
                        <Globe color="#1976d2" size={22} style={styles.listIcon} />
                        <Text style={styles.listTitle}>{t('choose_lang')}</Text>
                        <Text style={styles.listValue}>{LANGUAGES.find(l => l.id === language)?.name}</Text>
                        <ChevronRight color="#ccc" size={20} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <LogOut color="#e74c3c" size={20} />
                    <Text style={styles.logoutText}>{t('log_out')}</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Language Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={langModalVisible}
                onRequestClose={() => setLangModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setLangModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t('choose_lang')}</Text>
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
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
                            <Text style={styles.modalTitle}>Edit Profile</Text>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                                <X color="#666" size={24} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.editForm}>
                            <Text style={styles.editLabel}>Full Name</Text>
                            <TextInput
                                style={styles.editInput}
                                value={editName}
                                onChangeText={setEditName}
                                placeholder="Full Name"
                            />

                            <Text style={styles.editLabel}>Location</Text>
                            <TextInput
                                style={styles.editInput}
                                value={editLocation}
                                onChangeText={setEditLocation}
                                placeholder="City, State"
                            />

                            <Text style={styles.editLabel}>Qualification</Text>
                            <TextInput
                                style={styles.editInput}
                                value={editLevel}
                                onChangeText={setEditLevel}
                                placeholder="e.g. 12th, Diploma"
                            />

                            <Text style={styles.editLabel}>Stream</Text>
                            <TextInput
                                style={styles.editInput}
                                value={editStream}
                                onChangeText={setEditStream}
                                placeholder="e.g. Science"
                            />

                            <Text style={styles.editLabel}>Marks / CGPA</Text>
                            <TextInput
                                style={styles.editInput}
                                value={editMarks}
                                onChangeText={setEditMarks}
                                placeholder="e.g. 85%"
                            />

                            <TouchableOpacity
                                style={styles.saveBtn}
                                onPress={saveProfileChanges}
                                disabled={isSaving}
                            >
                                <Save color="#fff" size={20} style={{ marginRight: 8 }} />
                                <Text style={styles.saveBtnText}>{isSaving ? 'Saving...' : 'Save Changes'}</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
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
    infoCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, gap: 14, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    infoText: { fontSize: 15, color: '#444', fontWeight: '500' },
    interestsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    interestTag: { backgroundColor: '#e1efff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#bbdefb' },
    interestTagText: { color: '#1976d2', fontSize: 13, fontWeight: '600' },
    noDataText: { color: '#888', fontStyle: 'italic' },
    listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', padding: 16, borderRadius: 16, marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
    listIcon: { marginRight: 16 },
    listTitle: { fontSize: 16, color: '#333', fontWeight: '600', flex: 1 },
    listValue: { fontSize: 14, color: '#888', marginRight: 8 },
    logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 18, marginHorizontal: 24, marginBottom: 40, marginTop: 10, backgroundColor: '#fff0f0', borderRadius: 16, gap: 8, borderWidth: 1, borderColor: '#ffdada' },
    logoutText: { color: '#e74c3c', fontSize: 16, fontWeight: 'bold' },

    // Modal Styles
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '60%' },
    modalHeader: { marginBottom: 20, alignItems: 'center' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    langOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
    langOptionText: { fontSize: 18, color: '#333' },
    selectedLangText: { color: '#1976d2', fontWeight: 'bold' },

    // Edit Modal Styles
    modalOverlayFullScreen: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
    editModalContent: { backgroundColor: '#fff', borderRadius: 24, padding: 24, maxHeight: '80%', elevation: 10 },
    editHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    editForm: { flexGrow: 0 },
    editLabel: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 12 },
    editInput: { backgroundColor: '#f5f9ff', borderWidth: 1, borderColor: '#e1efff', borderRadius: 12, padding: 14, fontSize: 15, color: '#333' },
    saveBtn: { backgroundColor: '#1976d2', flexDirection: 'row', padding: 16, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 24, marginBottom: 10 },
    saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
