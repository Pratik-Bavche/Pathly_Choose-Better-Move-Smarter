import { Bot, Send } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hi! I am your Career Assistant. How can I help you today?', sender: 'bot' },
        { id: '2', text: 'Which is better: BSc or BBA?', sender: 'user' },
        { id: '3', text: 'It depends on your interests! If you like coding and science, B.Sc Computer Science is great. If you enjoy business, management, and marketing, BBA is a better fit. What subjects do you enjoy more?', sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (!inputText.trim()) return;

        setMessages(prev => [...prev, { id: Date.now().toString(), text: inputText, sender: 'user' }]);
        setInputText('');

        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: 'That sounds like a great path! Would you like me to find some relevant courses and colleges for that area?',
                sender: 'bot'
            }]);
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Career Assistant ✨</Text>
            </View>

            <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 20 }}>
                {messages.map((msg) => (
                    <View key={msg.id} style={[styles.messageRow, msg.sender === 'user' ? styles.messageUserRow : styles.messageBotRow]}>
                        {msg.sender === 'bot' && (
                            <View style={styles.botAvatar}>
                                <Bot color="#fff" size={20} />
                            </View>
                        )}
                        <View style={[styles.bubble, msg.sender === 'user' ? styles.bubbleUser : styles.bubbleBot]}>
                            <Text style={[styles.messageText, msg.sender === 'user' ? styles.textUser : styles.textBot]}>
                                {msg.text}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Ask me anything..."
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Send color="#fff" size={20} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fcfcfc', paddingTop: 60 },
    header: { paddingHorizontal: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#0d47a1' },
    chatArea: { flex: 1, padding: 24 },
    messageRow: { flexDirection: 'row', marginBottom: 16, maxWidth: '85%' },
    messageUserRow: { alignSelf: 'flex-end', justifyContent: 'flex-end' },
    messageBotRow: { alignSelf: 'flex-start' },
    botAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1976d2', justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 4 },
    bubble: { padding: 16, borderRadius: 16 },
    bubbleUser: { backgroundColor: '#1976d2', borderBottomRightRadius: 4 },
    bubbleBot: { backgroundColor: '#e3f2fd', borderBottomLeftRadius: 4 },
    messageText: { fontSize: 16, lineHeight: 24 },
    textUser: { color: '#ffffff' },
    textBot: { color: '#0d47a1' },
    inputArea: { flexDirection: 'row', padding: 16, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#f0f0f0', alignItems: 'center' },
    textInput: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 24, paddingHorizontal: 20, paddingVertical: 12, fontSize: 16, maxHeight: 100, marginRight: 12 },
    sendButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#1976d2', justifyContent: 'center', alignItems: 'center' },
});
