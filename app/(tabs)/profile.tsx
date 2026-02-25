import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Check, Globe, HelpCircle, LogOut, Settings, Shield, User } from 'lucide-react-native';
import React, { useState } from 'react';
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

    const handleLogout = async () => {
        Alert.alert(t('log_out'), t('logout_confirm'), [
            { text: t('cancel'), style: 'cancel' },
            {
                text: t('log_out'), onPress: async () => {
                    // await supabase.auth.signOut();
                    await AsyncStorage.removeItem('mockSession');
                    await AsyncStorage.removeItem('hasOnboarded');
                    router.replace('/(auth)');
                }
            },
        ]);
    };


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>S</Text>
                    </View>
                    <Text style={styles.name}>{t('profile_name')}</Text>
                    <Text style={styles.sub}>{t('profile_sub')}</Text>
                </View>

                <View style={styles.section}>

                    <TouchableOpacity style={styles.listItem} onPress={() => setLangModalVisible(true)}>
                        <Globe color="#1976d2" size={24} style={styles.listIcon} />
                        <Text style={styles.listTitle}>{t('choose_lang')}</Text>
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
    header: { alignItems: 'center', padding: 24, backgroundColor: '#0d47a1', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, paddingTop: 80 },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#42a5f5', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    avatarText: { fontSize: 32, color: '#ffffff', fontWeight: 'bold' },
    name: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 4 },
    sub: { fontSize: 14, color: '#e3f2fd' },
    section: { padding: 24, paddingTop: 32 },
    listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', padding: 16, borderRadius: 12, marginBottom: 16, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
    listIcon: { marginRight: 16 },
    listTitle: { fontSize: 16, color: '#333', fontWeight: '500' },
    logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, marginHorizontal: 24, marginBottom: 40, backgroundColor: '#fdecea', borderRadius: 12, gap: 8 },
    logoutText: { color: '#e74c3c', fontSize: 16, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '60%' },
    modalHeader: { marginBottom: 20, alignItems: 'center' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    langOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
    langOptionText: { fontSize: 18, color: '#333' },
    selectedLangText: { color: '#1976d2', fontWeight: 'bold' },
});

