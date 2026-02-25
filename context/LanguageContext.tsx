import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type LanguageId = 'en' | 'hi' | 'mr';

interface LanguageContextType {
    language: LanguageId;
    setLanguage: (lang: LanguageId) => Promise<void>;
    t: (key: string) => string;
}

const LANGUAGES = {
    en: {
        // Auth
        welcome_roadmap: 'Your Career Roadmap',
        auth_subtitle: 'Discover paths that match your passion.',
        sign_in: 'Sign In',
        sign_up: 'Sign Up',
        guest: 'Continue as Guest',
        email: 'Email address',
        password: 'Password',

        // Onboarding
        welcome: 'Welcome to',
        onboarding_subtitle: "Let's find the best path for your future",
        select_lang: 'Select your language',
        get_started: 'Get Started',
        choose_lang: 'Choose Language',

        // Tabs Layout
        tab_home: 'Home',
        tab_explore: 'Explore',
        tab_plan: 'My Plan',
        tab_assist: 'Assistant',
        tab_profile: 'Profile',

        // Home Screen
        hello_student: 'Hello, Student! 👋',
        home_subtitle: "Let's chart your career roadmap",
        explore_section: 'What would you like to explore?',
        further_edu: 'Further Education',
        further_edu_desc: 'Streams, degrees, colleges',
        start_working: 'Start Working',
        start_working_desc: 'Govt & private jobs',
        skill_courses: 'Skill Courses',
        skill_courses_desc: 'Certifications, vocations',
        start_business: 'Start a Business',
        start_business_desc: 'Ideas & freelance',
        recommended: 'Recommended for You',

        // Explore Screen
        explore_title: 'College Explorer',
        explore_subtitle: 'Find the best institution for your degree',
        search_placeholder: 'Search colleges, degrees...',
        filter_all: 'All',
        filter_govt: 'Govt',
        filter_private: 'Private',
        tuition_fees: 'Tuition Fees',
        college_type: 'Type',
        placement: 'Placement',
        save: 'Save',
        view_details: 'View Details',

        // Plan Screen
        plan_title: 'My Career Plan',
        plan_subtitle: 'Track your goals and saved action items',
        status_in_progress: 'In Progress',
        status_pending: 'Pending',
        status_completed: 'Completed',
        bookmarks_title: 'Saved Bookmarks',
        no_bookmarks: 'No bookmarks yet. Explore and save colleges or courses.',

        // Assist Screen
        assist_title: 'Career Assistant',
        ask_anything: 'Ask me anything...',
        bot_initial_msg: 'Hi! I am your Career Assistant. How can I help you today?',
        bot_feedback_msg: 'That sounds like a great path! Would you like me to find some relevant courses and colleges for that area?',

        // Profile Screen
        profile_name: 'Student User',
        profile_sub: '12th Pass • Science Stream',
        retake_assessment: 'Retake Assessment',
        edit_info: 'Edit Personal Info',
        app_settings: 'App Settings',
        privacy_terms: 'Privacy & Terms',
        contact_support: 'Contact Support',
        log_out: 'Log Out',
        logout_confirm: 'Are you sure you want to log out?',
        retake_confirm: 'This will restart your career assessment. Continue?',
        cancel: 'Cancel',
        continue: 'Continue',
    },
    hi: {
        // Auth
        welcome_roadmap: 'आपका करियर रोडमैप',
        auth_subtitle: 'उन रास्तों की खोज करें जो आपके जुनून से मेल खाते हों।',
        sign_in: 'साइन इन करें',
        sign_up: 'साइन अप करें',
        guest: 'अतिथि के रूप में जारी रखें',
        email: 'ईमेल पता',
        password: 'पासवर्ड',

        // Onboarding
        welcome: 'स्वागत है',
        onboarding_subtitle: 'आइए आपके भविष्य के लिए सबसे अच्छा रास्ता खोजें',
        select_lang: 'अपनी भाषा चुनें',
        get_started: 'शुरू करें',
        choose_lang: 'भाषा चुनें',

        // Tabs Layout
        tab_home: 'होम',
        tab_explore: 'एक्सप्लोर',
        tab_plan: 'मेरा प्लान',
        tab_assist: 'सहायक',
        tab_profile: 'प्रोफाइल',

        // Home Screen
        hello_student: 'नमस्ते, छात्र! 👋',
        home_subtitle: 'आइए आपका करियर रोडमैप तैयार करें',
        explore_section: 'आप क्या एक्सप्लोर करना चाहेंगे?',
        further_edu: 'आगे की शिक्षा',
        further_edu_desc: 'स्ट्रीम, डिग्री, कॉलेज',
        start_working: 'काम करना शुरू करें',
        start_working_desc: 'सरकारी और निजी नौकरियां',
        skill_courses: 'कौशल पाठ्यक्रम',
        skill_courses_desc: 'प्रमाणन, व्यवसाय',
        start_business: 'व्यवसाय शुरू करें',
        start_business_desc: 'विचार और फ्रीलांस',
        recommended: 'आपके लिए अनुशंसित',

        // Explore Screen
        explore_title: 'कॉलेज एक्सप्लोरर',
        explore_subtitle: 'अपनी डिग्री के लिए सबसे अच्छा संस्थान खोजें',
        search_placeholder: 'कॉलेज, डिग्री खोजें...',
        filter_all: 'सभी',
        filter_govt: 'सरकारी',
        filter_private: 'प्राइवेट',
        tuition_fees: 'शिक्षण शुल्क',
        college_type: 'प्रकार',
        placement: 'प्लेसमेंट',
        save: 'सेव',
        view_details: 'विवरण देखें',

        // Plan Screen
        plan_title: 'मेरा करियर प्लान',
        plan_subtitle: 'अपने लक्ष्यों और सेव की गई वस्तुओं को ट्रैक करें',
        status_in_progress: 'प्रगति में',
        status_pending: 'लंबित',
        status_completed: 'पूरा हुआ',
        bookmarks_title: 'सेव किए गए बुकमार्क',
        no_bookmarks: 'अभी तक कोई बुकमार्क नहीं है। कॉलेज या कोर्स एक्सप्लोर करें और सेव करें।',

        // Assist Screen
        assist_title: 'करियल सहायक',
        ask_anything: 'मुझसे कुछ भी पूछें...',
        bot_initial_msg: 'नमस्ते! मैं आपका करियर सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?',
        bot_feedback_msg: 'यह एक बेहतरीन रास्ता लगता है! क्या आप चाहेंगे कि मैं उस क्षेत्र के लिए कुछ प्रासंगिक कोर्स और कॉलेज ढूंढूं?',

        // Profile Screen
        profile_name: 'छात्र यूजर',
        profile_sub: '12वीं पास • विज्ञान स्ट्रीम',
        retake_assessment: 'मूल्यांकन दोबारा करें',
        edit_info: 'व्यक्तिगत जानकारी संपादित करें',
        app_settings: 'ऐप सेटिंग्स',
        privacy_terms: 'गोपनीयता और शर्तें',
        contact_support: 'सहायता से संपर्क करें',
        log_out: 'लॉग आउट',
        logout_confirm: 'क्या आप वाकई लॉग आउट करना चाहते हैं?',
        retake_confirm: 'इससे आपका करियर मूल्यांकन दोबारा शुरू हो जाएगा। जारी रखें?',
        cancel: 'रद्द करें',
        continue: 'जारी रखें',
    },
    mr: {
        // Auth
        welcome_roadmap: 'तुमचा करिअर रोडमॅप',
        auth_subtitle: 'तुमच्या आवडीनुसार मार्ग शोधा.',
        sign_in: 'साइन इन करा',
        sign_up: 'साइन अप करा',
        guest: 'पाहुणे म्हणून पुढे जा',
        email: 'ईमेल पत्ता',
        password: 'पासवर्ड',

        // Onboarding
        welcome: 'स्वागत आहे',
        onboarding_subtitle: 'तुमच्या भविष्यासाठी सर्वोत्तम मार्ग शोधूया',
        select_lang: 'तुमची भाषा निवडा',
        get_started: 'सुरू करा',
        choose_lang: 'भाषा निवडा',

        // Tabs Layout
        tab_home: 'होम',
        tab_explore: 'एक्सप्लोर',
        tab_plan: 'माझा प्लॅन',
        tab_assist: 'सहाय्यक',
        tab_profile: 'प्रोफाईल',

        // Home Screen
        hello_student: 'नमस्कार, विद्यार्थी! 👋',
        home_subtitle: 'चला तुमचा करिअर रोडमॅप तयार करूया',
        explore_section: 'तुम्हाला काय पाहायला आवडेल?',
        further_edu: 'पुढील शिक्षण',
        further_edu_desc: 'शाखा, पदवी, महाविद्यालये',
        start_working: 'काम सुरू करा',
        start_working_desc: 'शासकीय आणि खाजगी नोकऱ्या',
        skill_courses: 'कौशल्य अभ्यासक्रम',
        skill_courses_desc: 'प्रमाणपत्रे, व्यवसाय',
        start_business: 'व्यवसाय सुरू करा',
        start_business_desc: 'कल्पना आणि फ्रीलांस',
        recommended: 'तुमच्यासाठी शिफारस केलेले',

        // Explore Screen
        explore_title: 'कॉलेज एक्सप्लोरर',
        explore_subtitle: 'तुमच्या पदवीसाठी सर्वोत्तम संस्था शोधा',
        search_placeholder: 'कॉलेज, पदव्या शोधा...',
        filter_all: 'सर्व',
        filter_govt: 'शासकीय',
        filter_private: 'खाजगी',
        tuition_fees: 'शिक्षण शुल्क',
        college_type: 'प्रकार',
        placement: 'प्लेसमेंट',
        save: 'सेव्ह',
        view_details: 'तपशील पहा',

        // Plan Screen
        plan_title: 'माझा करिअर प्लॅन',
        plan_subtitle: 'तुमची उद्दिष्टे आणि सेव्ह केलेल्या बाबींचा मागोवा घ्या',
        status_in_progress: 'प्रगतीपथावर',
        status_pending: 'प्रलंबित',
        status_completed: 'पूर्ण झाले',
        bookmarks_title: 'सेव्ह केलेले बुकमार्क',
        no_bookmarks: 'अद्याप कोणतेही बुकमार्क नाहीत. कॉलेज किंवा कोर्सेस शोधा आणि सेव्ह करा.',

        // Assist Screen
        assist_title: 'करिअर सहाय्यक',
        ask_anything: 'मला काहीही विचारा...',
        bot_initial_msg: 'नमस्कार! मी तुमचा करिअर सहाय्यक आहे. मी तुम्हाला आज कशी मदत करू शकतो?',
        bot_feedback_msg: 'हा एक उत्तम मार्ग वाटतो! तुम्हाला त्या क्षेत्रासाठी काही संबंधित कोर्सेस आणि कॉलेज शोधायला आवडेल का?',

        // Profile Screen
        profile_name: 'विद्यार्थी वापरकर्ता',
        profile_sub: '12 वी उत्तीर्ण • विज्ञान शाखा',
        retake_assessment: 'पुन्हा मूल्यांकन करा',
        edit_info: 'वैयक्तिक माहिती संपादित करा',
        app_settings: 'अ‍ॅप सेटिंग्ज',
        privacy_terms: 'गोपनीयता आणि अटी',
        contact_support: 'सपोर्टशी संपर्क साधा',
        log_out: 'लॉग आउट',
        logout_confirm: 'तुम्हाला नक्की लॉग आउट करायचे आहे का?',
        retake_confirm: 'यामुळे तुमचे करिअर मूल्यांकन पुन्हा सुरू होईल. पुढे जावे?',
        cancel: 'रद्द करा',
        continue: 'पुढे जा',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<LanguageId>('en');

    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        const savedLang = await AsyncStorage.getItem('userLanguage');
        if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'mr')) {
            setLanguageState(savedLang as LanguageId);
        }
    };

    const setLanguage = async (lang: LanguageId) => {
        setLanguageState(lang);
        await AsyncStorage.setItem('userLanguage', lang);
    };

    const t = (key: string) => {
        return (LANGUAGES[language] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
