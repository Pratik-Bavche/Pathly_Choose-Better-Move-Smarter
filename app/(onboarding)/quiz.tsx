import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const QUESTIONS = [
    {
        question: "Do you enjoy solving math problems?",
        options: ["Yes, very much", "Sometimes", "Not really"]
    },
    {
        question: "Do you prefer outdoor or indoor work?",
        options: ["Indoor", "Outdoor", "Both"]
    },
    {
        question: "Which of these sounds exciting to you?",
        options: ["Teaching", "Managing a store", "Coding", "Working with machines"]
    }
];

export default function QuickAssessment() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAnswer = async () => {
        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Finished quiz
            await AsyncStorage.setItem('hasOnboarded', 'true');
            router.replace('/(tabs)');
        }
    };

    const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
    const currentQuestion = QUESTIONS[currentIndex];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Quick Assessment</Text>
                <Text style={styles.stepText}>{currentIndex + 1} of {QUESTIONS.length}</Text>
            </View>

            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            <View style={styles.content}>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>

                {currentQuestion.options.map((opt, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={styles.optionBtn}
                        onPress={handleAnswer}
                    >
                        <Text style={styles.optionText}>{opt}</Text>
                        <CheckCircle color="#1976d2" size={20} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff', padding: 24, paddingTop: 60 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0d47a1' },
    stepText: { fontSize: 14, color: '#666' },
    progressBar: { height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, marginBottom: 40 },
    progressFill: { height: '100%', backgroundColor: '#1976d2', borderRadius: 4 },
    content: { flex: 1 },
    questionText: { fontSize: 24, fontWeight: '600', color: '#333', marginBottom: 32, lineHeight: 32 },
    optionBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: '#fafafa'
    },
    optionText: { fontSize: 16, color: '#333', fontWeight: '500' }
});
