# Pathly: CareerPath – Discover Your Future 🚀

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/) 
[![Supabase](https://img.shields.io/badge/Supabase-1C1C1C?style=for-the-badge&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Pathly** (formerly CareerPath) is a comprehensive career guidance and roadmap application designed to bridge the gap between education and employment. It provides students and job seekers with a personalized, trilingual platform to explore scholarships, job opportunities, skill-based courses, and entrepreneurial paths.

---

## 🌟 Solving Real-World Problems

In a world full of information, students often feel lost after completing their 10th or 12th grade. Traditional guidance is often:
- **Fragmented**: Scholarship info is scattered across dozens of government portals.
- **Generic**: One-size-fits-all advice ignores individual qualifications and interests.
- **Language-Barricaded**: High-quality career guidance is predominantly in English, leaving rural students behind.

**Pathly solves this by:**
1. **Consolidating Data**: Over 25,000 lines of scholarship, job, and course data in one place.
2. **Personalized Roadmaps**: Smart matching systems that suggest paths based on *your* specific qualification (10th, 12th, Graduate, ITI, etc.).
3. **Trilingual Access**: Full support for **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)** to ensure no student is left behind.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React Native (v0.81), Expo (SDK 54) |
| **Language** | TypeScript |
| **Backend & Auth** | Supabase (PostgreSQL, Realtime, Auth) |
| **Navigation** | Expo Router (File-based routing) |
| **Localization** | i18next & react-i18next (Multi-language integration) |
| **UI/UX** | Lucide Icons, React Native Reanimated, Custom Glassmorphic Design |
| **Storage** | AsyncStorage (Offline-first experience) |

---

## 🚀 Key Features & Functionality

### 1. Multi-Path Career Guidance
- **Further Education**: Explore degree colleges, entrance exams, and specializations.
- **Start Working**: A matched directory of Government and Private sector jobs.
- **Skill Courses**: Vocational training and high-demand certifications (NSDC, Coursera, etc.).
- **Start Business**: Low-budget business ideas and entrepreneurial roadmaps.

### 2. Smart Scholarship Explorer
- Filter through hundreds of central and state scholarships (like MahaDBT, NSP).
- Smart matching based on family income, caste category, and academic performance.
- Direct links to official portals.

### 3. Freelancing Hub & Community
- A localized platform for professionals to showcase their portfolios.
- **Call-to-Action**: Direct "Call Now" and LinkedIn integration for clients to reach freelancers.
- Real-time post creation and management.

### 4. Instant Resume Builder
- Answer 5 simple questions to generate a professional, ATS-friendly PDF resume in seconds.
- Multiple templates optimized for entry-level jobs and internships.

### 5. AI Career Assistant (Trilingual)
- A rule-based intelligent chatbot that answers career queries in English, Hindi, and Marathi.
- Personalizes responses based on the user's stored profile data.

---

## 🌍 Trilingual Language Support (Language Models)

Pathly is built with a deep focus on accessibility. Our trilingual logic ensures that users can switch between:
- **English**: For global professional context.
- **Hindi (हिंदी)**: For pan-India accessibility.
- **Marathi (मराठी)**: Tailored for regional students in Maharashtra (integrated with MahaDBT data).

---

## 💼 Helping Everyone
- **Students (10th/12th)**: Find the right stream or diploma.
- **Graduates**: Discover UPSC/MPSC paths or specialized corporate roles.
- **Freelancers**: Find local projects and build a professional presence without expensive platforms.
- **Rural Youth**: Access government training schemes (PMKVY) in their native language.

---

## 📖 How it Works

1. **Onboarding**: Users select their current qualification and interest stream.
2. **Analysis**: The app filters its internal JSON engines (`scholarships.json`, `jobData.ts`, `skillData.ts`) to find the best matches.
3. **Action**: Users can save bookmarks, generate a resume, or contact a freelancer directly.
4. **Sync**: All progress is synced to Supabase for a seamless multi-device experience.

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pratik-Bavche/Pathly-Choose-Better.-Move-Smarter.git
   cd CareerPath
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file and add your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Start the app**:
   ```bash
   npx expo start
   ```

---

*Made with ❤️ for students, by developers who care.*
