import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ArrowRight, Check, Globe } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

import { LanguageId, useLanguage } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');

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
            <LinearGradient
                colors={['#0d47a1', '#1976d2', '#ffffff']}
                style={styles.background}
            />
            
            <View style={styles.content}>
                <View style={styles.topSection}>
                    <Animatable.View 
                        animation="bounceIn" 
                        duration={1500} 
                        style={styles.iconContainer}
                    >
                        <Globe color="#ffffff" size={64} />
                    </Animatable.View>
                    
                    <Animatable.Text 
                        animation="fadeInDown" 
                        delay={300} 
                        style={styles.welcomeText}
                    >
                        {t('welcome')}
                    </Animatable.Text>
                    
                    <Animatable.Text 
                        animation="fadeInDown" 
                        delay={500} 
                        style={styles.title}
                    >
                        CareerPath
                    </Animatable.Text>
                    
                    <Animatable.Text 
                        animation="fadeIn" 
                        delay={800} 
                        style={styles.subtitle}
                    >
                        {t('onboarding_subtitle')}
                    </Animatable.Text>
                </View>

                <Animatable.View 
                    animation="fadeInUp" 
                    delay={1000} 
                    style={styles.bottomSection}
                >
                    <Text style={styles.label}>{t('select_lang')}</Text>
                    <TouchableOpacity
                        style={styles.languageBox}
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.langText}>{selectedLang.name}</Text>
                        <View style={styles.langIndicator} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={handleGetStarted}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#1976d2', '#0d47a1']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.btnGradient}
                        >
                            <Text style={styles.btnText}>{t('get_started')}</Text>
                            <ArrowRight color="#fff" size={22} />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
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
                    <Animatable.View 
                        animation="slideInUp" 
                        duration={400} 
                        style={styles.modalContent}
                    >
                        <View style={styles.modalHeader}>
                            <View style={styles.modalHandle} />
                            <Text style={styles.modalTitle}>{t('choose_lang')}</Text>
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={LANGUAGES}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <Animatable.View
                                    animation="fadeInLeft"
                                    delay={index * 100}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.langOption,
                                            language === item.id && styles.selectedLangOption
                                        ]}
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
                                            <Animatable.View animation="zoomIn">
                                                <Check color="#1976d2" size={24} />
                                            </Animatable.View>
                                        )}
                                    </TouchableOpacity>
                                </Animatable.View>
                            )}
                        />
                    </Animatable.View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '60%',
        borderBottomLeftRadius: 100,
    },
    content: { flex: 1, padding: 24, justifyContent: 'space-between' },
    topSection: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    welcomeText: { fontSize: 20, color: 'rgba(255, 255, 255, 0.8)', marginTop: 10 },
    title: { fontSize: 48, fontWeight: '900', color: '#ffffff', marginBottom: 12, letterSpacing: 1 },
    subtitle: { fontSize: 17, color: '#1976d2', textAlign: 'center', paddingHorizontal: 20, lineHeight: 24 },
    bottomSection: { paddingBottom: 40, gap: 20 },
    label: { fontSize: 14, color: '#666', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
    languageBox: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f5f9ff', 
        borderRadius: 15, 
        padding: 20, 
        borderWidth: 1, 
        borderColor: '#e1efff' 
    },
    langText: { fontSize: 18, color: '#333', fontWeight: '600' },
    langIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#1976d2', marginLeft: 10 },
    primaryBtn: { 
        borderRadius: 15, 
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    btnGradient: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingVertical: 18,
        gap: 12
    },
    btnText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, maxHeight: '60%' },
    modalHandle: { width: 40, height: 5, backgroundColor: '#ddd', borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
    modalHeader: { marginBottom: 20, alignItems: 'center' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    langOption: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20, 
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: '#f8f9fa'
    },
    selectedLangOption: {
        backgroundColor: '#e3f2fd',
        borderWidth: 1,
        borderColor: '#1976d2'
    },
    langOptionText: { fontSize: 18, color: '#333' },
    selectedLangText: { color: '#1976d2', fontWeight: 'bold' },
});
