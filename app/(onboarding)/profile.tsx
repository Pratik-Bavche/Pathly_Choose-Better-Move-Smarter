import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LEVELS = ['10th', '12th', 'Diploma', 'Other'];
const STREAMS = ['Science', 'Commerce', 'Arts', 'Vocational'];
const INTERESTS = ['Technology', 'Sports', 'Business', 'Art', 'Healthcare', 'Engineering', 'Design', 'Marketing', 'Science', 'Law'];

export default function ProfileSetup() {
    const router = useRouter();
    const [level, setLevel] = useState('10th');
    const [stream, setStream] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    useEffect(() => {
        loadExistingData();
    }, []);

    const loadExistingData = async () => {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
            const parsed = JSON.parse(data);
            if (parsed.educationLevel) setLevel(parsed.educationLevel);
            if (parsed.stream) setStream(parsed.stream);
            if (parsed.interests) setSelectedInterests(parsed.interests);
        }
    };

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleContinue = async () => {
        // Save any changes made here back to userData
        const data = await AsyncStorage.getItem('userData');
        let userData = data ? JSON.parse(data) : {};
        userData = { ...userData, educationLevel: level, stream, interests: selectedInterests };
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        router.push('/(onboarding)/quiz');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.header}>Let's verify your profile</Text>
            <Text style={styles.subtextHeader}>We've pre-filled this from your registration. Feel free to adjust.</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Completed Education Level</Text>
                <View style={styles.row}>
                    {LEVELS.map(l => (
                        <TouchableOpacity
                            key={l}
                            style={[styles.chip, level === l && styles.chipActive]}
                            onPress={() => setLevel(l)}
                        >
                            <Text style={[styles.chipText, level === l && styles.chipTextActive]}>{l}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Which Stream?</Text>
                <View style={styles.row}>
                    {STREAMS.map(s => (
                        <TouchableOpacity
                            key={s}
                            style={[styles.chip, stream === s && styles.chipActive]}
                            onPress={() => setStream(s)}
                        >
                            <Text style={[styles.chipText, stream === s && styles.chipTextActive]}>{s}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>What are your interests?</Text>
                <Text style={styles.subtext}>Select multiple</Text>
                <View style={styles.row}>
                    {INTERESTS.map(i => {
                        const isActive = selectedInterests.includes(i);
                        return (
                            <TouchableOpacity
                                key={i}
                                style={[styles.chip, isActive && styles.chipActive]}
                                onPress={() => toggleInterest(i)}
                            >
                                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{i}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleContinue}
            >
                <Text style={styles.btnText}>Continue to Assessment</Text>
                <ChevronRight color="#fff" size={20} />
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8faff', padding: 24, paddingTop: 60 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#0d47a1', marginBottom: 8 },
    subtextHeader: { fontSize: 14, color: '#666', marginBottom: 24 },
    section: { marginBottom: 32 },
    label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 12 },
    subtext: { fontSize: 12, color: '#666', marginBottom: 12, marginTop: -8 },
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#e3f2fd', borderWidth: 1, borderColor: '#bbdefb' },
    chipActive: { backgroundColor: '#1976d2', borderColor: '#1976d2' },
    chipText: { color: '#1976d2', fontWeight: '500' },
    chipTextActive: { color: '#fff' },
    primaryBtn: { backgroundColor: '#1976d2', padding: 18, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 20 },
    btnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});
