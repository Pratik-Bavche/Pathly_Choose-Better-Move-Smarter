import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { HelpCircle, LogOut, RefreshCw, Settings, Shield, User } from 'lucide-react-native';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout', onPress: async () => {
                    // await supabase.auth.signOut();
                    await AsyncStorage.removeItem('mockSession');
                    await AsyncStorage.removeItem('hasOnboarded');
                    router.replace('/(auth)');
                }
            },
        ]);
    };

    const handleRetakeQuiz = async () => {
        Alert.alert('Retake Assessment', 'This will restart your career assessment. Continue?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Continue', onPress: async () => {
                    await AsyncStorage.removeItem('hasOnboarded');
                    router.replace('/(onboarding)/profile');
                }
            },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>S</Text>
                </View>
                <Text style={styles.name}>Student User</Text>
                <Text style={styles.sub}>12th Pass • Science Stream</Text>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.listItem} onPress={handleRetakeQuiz}>
                    <RefreshCw color="#1976d2" size={24} style={styles.listIcon} />
                    <Text style={styles.listTitle}>Retake Assessment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem}>
                    <User color="#1976d2" size={24} style={styles.listIcon} />
                    <Text style={styles.listTitle}>Edit Personal Info</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem}>
                    <Settings color="#1976d2" size={24} style={styles.listIcon} />
                    <Text style={styles.listTitle}>App Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem}>
                    <Shield color="#1976d2" size={24} style={styles.listIcon} />
                    <Text style={styles.listTitle}>Privacy & Terms</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listItem}>
                    <HelpCircle color="#1976d2" size={24} style={styles.listIcon} />
                    <Text style={styles.listTitle}>Contact Support</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <LogOut color="#e74c3c" size={20} />
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8faff' },
    header: { alignItems: 'center', padding: 40, backgroundColor: '#0d47a1', borderBottomLeftRadius: 32, borderBottomRightRadius: 32, paddingTop: 80 },
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
});
