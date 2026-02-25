import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ArrowRight, Check, Globe } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LanguageId, useLanguage } from '../../context/LanguageContext';

const LANGUAGES: { id: LanguageId; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'hi', name: 'Hindi' },
    { id: 'mr', name: 'Marathi' },
];

export default function OnboardingIndex() {
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();
    const [modalVisible, setModalVisible] = useState(false);

    const selectedLang = LANGUAGES.find(l => l.id === language) || LANGUAGES[0];

    const handleGetStarted = async () => {
        try {
            await AsyncStorage.setItem('hasOnboarded', 'true');
            router.replace('/(tabs)');
        } catch (e) {
            console.error('Error saving onboarding status:', e);
            router.replace('/(tabs)');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Globe color="#1976d2" size={48} />
                <Text style={styles.welcomeText}>{t('welcome')}</Text>
                <Text style={styles.title}>CareerGuide</Text>
                <Text style={styles.subtitle}>{t('onboarding_subtitle')}</Text>
            </View>

            <View style={styles.bottomSection}>
                <Text style={styles.label}>{t('select_lang')}</Text>
                <TouchableOpacity
                    style={styles.languageBox}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.langText}>{selectedLang.name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={handleGetStarted}
                >
                    <Text style={styles.btnText}>{t('get_started')}</Text>
                    <ArrowRight color="#fff" size={20} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
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
                                        setModalVisible(false);
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
    container: { flex: 1, backgroundColor: '#ffffff', padding: 24, justifyContent: 'space-between' },
    topSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    bottomSection: { paddingBottom: 40 },
    welcomeText: { fontSize: 20, color: '#666', marginTop: 20 },
    title: { fontSize: 36, fontWeight: 'bold', color: '#0d47a1', marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#1976d2', textAlign: 'center' },
    label: { fontSize: 14, color: '#666', marginBottom: 8, textAlign: 'center' },
    languageBox: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 16, marginBottom: 24, alignItems: 'center' },
    langText: { fontSize: 16, color: '#333' },
    primaryBtn: { backgroundColor: '#1976d2', padding: 18, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
    btnText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '60%' },
    modalHeader: { marginBottom: 20, alignItems: 'center' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    langOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
    langOptionText: { fontSize: 18, color: '#333' },
    selectedLangText: { color: '#1976d2', fontWeight: 'bold' },
});

