import AsyncStorage from '@react-native-async-storage/async-storage';
import { SKILL_CATEGORIES } from '../data/skillData';
import scholarshipsData from '../data/scholarships.json';

type Message = {
    id: string;
    text: string;
    sender: 'bot' | 'user';
};

export const getBotResponse = async (userInput: string, language: 'en' | 'hi' | 'mr'): Promise<string> => {
    const input = userInput.toLowerCase();
    
    // Load user data for personalization
    let userData = null;
    try {
        const stored = await AsyncStorage.getItem('userData');
        if (stored) userData = JSON.parse(stored);
    } catch (e) {}

    const stream = userData?.stream || userData?.education_level || '';
    const name = userData?.full_name?.split(' ')[0] || userData?.name || '';

    // Response collections in different languages
    const responses: any = {
        en: {
            greeting: `Hi ${name}! How can I help you today?`,
            scholarship: "I found several scholarships for you. You should check out the 'Scholarships' section. Some popular ones include the National Merit Scholarship and State Research Grants.",
            job: "There are many job opportunities in your field. Based on your profile, you might be interested in Backend Development or Data Analytics roles. Check the 'Start Working' tab!",
            skill: "If you want to upskill, the 'Digital & IT' or 'Creative Arts' courses are trending right now. Would you like me to show you some top-rated courses?",
            science: "Since you are from a Science background, you have great prospects in Engineering, Medical Research, and Pure Sciences. Would you like to see top science colleges?",
            commerce: "Being in Commerce, you can explore CA, CS, Investment Banking, or BBA. I can help you find the best entrance exams for these.",
            arts: "The Arts stream offers diverse careers in Design, Content Writing, Law, and Psychology. What is your specific area of interest?",
            resume: "I can help you build an ATS-friendly resume! Try our 'Resume Builder' tool to generate a PDF in minutes.",
            default: "That's an interesting question! I am here to guide you with jobs, courses, and scholarships. Could you be more specific so I can provide better details?"
        },
        hi: {
            greeting: `नमस्ते ${name}! मैं आपकी आज क्या मदद कर सकता हूँ?`,
            scholarship: "मुझे आपके लिए कुछ छात्रवृत्तियाँ मिली हैं। आप 'Scholarships' सेक्शन देख सकते हैं। कुछ लोकप्रिय छात्रवृत्तियों में नेशनल मेरिट और स्टेट ग्रान्ट्स शामिल हैं।",
            job: "आपके क्षेत्र में कई नौकरियों के अवसर हैं। आपकी प्रोफाइल के आधार पर, आप बैकएंड डेवलपमेंट या डेटा एनालिटिक्स में रुचि ले सकते हैं। 'काम शुरू करें' टैब देखें!",
            skill: "यदि आप नया कौशल सीखना चाहते हैं, तो 'डिजिटल और आईटी' कोर्स अभी ट्रेंड में हैं। क्या आप कुछ बेहतरीन कोर्स देखना चाहेंगे?",
            science: "विज्ञान पृष्ठभूमि से होने के नाते, आपके पास इंजीनियरिंग और मेडिकल रिसर्च में अच्छे अवसर हैं। क्या आप शीर्ष विज्ञान कॉलेज देखना चाहेंगे?",
            resume: "मैं आपको एक पेशेवर रिज्यूमे बनाने में मदद कर सकता हूँ! बस हमारे 'रिज्यूमे बिल्डर' का उपयोग करें।",
            default: "यह एक दिलचस्प सवाल है! मैं यहाँ आपको नौकरियों, पाठ्यक्रमों और छात्रवृत्तियों के बारे में मार्गदर्शन करने के लिए हूँ। कृपया थोड़ा और विस्तार से बताएं।"
        },
        mr: {
            greeting: `नमस्कार ${name}! मी तुम्हाला आज कशी मदत करू शकतो?`,
            scholarship: "तुमच्यासाठी काही शिष्यवृत्ती उपलब्ध आहेत. तुम्ही 'Scholarships' विभाग पाहू शकता. काही लोकप्रिय शिष्यवृत्तींमध्ये नॅशनल मेरिट आणि स्टेट ग्रँट्स यांचा समावेश आहे.",
            job: "तुमच्या क्षेत्रात नोकरीच्या अनेक संधी आहेत. तुमच्या प्रोफाईलनुसार, तुम्हाला बॅकएंड डेव्हलपमेंट किंवा डेटा ॲनालिटिक्समध्ये रस असू शकतो. 'काम सुरू करा' टॅब पहा!",
            resume: "मी तुम्हाला एक उत्तम रिझ्युमे बनवण्यास मदत करू शकतो! आमचा 'रिझ्युमे बिल्डर' वापरून पहा.",
            default: "हा एक चांगला प्रश्न आहे! मी तुम्हाला नोकरी, कोर्सेस आणि शिष्यवृत्तीबद्दल माहिती देऊ शकतो. अधिक चांगल्या मार्गदर्शनासाठी कृपया तुमचे क्षेत्र सांगा."
        }
    };

    const t = responses[language] || responses.en;

    // Simple Intent Matching
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
        return t.greeting;
    }
    if (input.includes('scholarship') || input.includes('paisa') || input.includes('grant') || input.includes('scholar')) {
        return t.scholarship;
    }
    if (input.includes('job') || input.includes('work') || input.includes('earn') || input.includes('career') || input.includes('intern')) {
        return t.job;
    }
    if (input.includes('skill') || input.includes('course') || input.includes('learn') || input.includes('study')) {
        return t.skill;
    }
    if (input.includes('resume') || input.includes('cv') || input.includes('biodata')) {
        return t.resume;
    }
    if (input.includes('science')) {
        return t.science || t.default;
    }
    if (input.includes('commerce') || input.includes('account') || input.includes('business')) {
        return t.commerce || t.default;
    }
    if (input.includes('arts') || input.includes('design') || input.includes('lit')) {
        return t.arts || t.default;
    }

    return t.default;
};
