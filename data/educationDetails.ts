export const BRANCH_DETAILS: Record<string, { id: string, title: string, desc: string, duration: string, eligibility: string, govt: string[], private: string[], higher: string[] }[]> = {
    // After 10th - Diploma
    'dip': [
        {
            id: 'ce',
            title: 'Civil Engineering',
            desc: 'Focuses on design, construction, and maintenance of the physical and naturally built environment.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass with minimum 35% marks (Math & Science required)',
            govt: ['Junior Engineer (PWD, CPWD)', 'SSC JE (Civil)', 'RRB JE', 'State Water Boards'],
            private: ['Site Engineer', 'Surveyor', 'CAD Designer', 'Construction Manager', 'Urban Planner'],
            higher: ['Lateral Entry to B.Tech Civil (2nd Year)', 'AMIE', 'B.Arch (if eligible by NATA)']
        },
        {
            id: 'me',
            title: 'Mechanical Engineering',
            desc: 'Focuses on design, manufacturing, maintenance, and operation of machines and mechanical systems.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass with minimum 35% marks (Math & Science required)',
            govt: ['SSC JE (Mechanical)', 'RRB JE', 'ISRO Technician', 'DRDO Technical Assistant', 'State Electricity Boards'],
            private: ['Maintenance Engineer', 'Production Supervisor', 'Quality Control Engineer', 'CAD Designer', 'Plant Technician'],
            higher: ['Lateral Entry to B.Tech Mechanical (2nd Year)', 'AMIE', 'Specialized courses in Robotics / Automobile']
        },
        {
            id: 'ee',
            title: 'Electrical Engineering',
            desc: 'Focuses on electrical systems, power generation, transmission, and electrical equipment.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass with minimum 35% marks (Math & Science required)',
            govt: ['SSC JE (Electrical)', 'RRB JE', 'State Electricity Board JE', 'PSU Technical Posts'],
            private: ['Electrical Supervisor', 'Maintenance Engineer', 'Power Plant Technician', 'Control Panel Technician'],
            higher: ['Lateral Entry to B.Tech Electrical', 'AMIE', 'Renewable Energy Specialization']
        },
        {
            id: 'cse',
            title: 'Computer Engineering',
            desc: 'Focuses on computer hardware, software development, networking, and programming.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass with minimum 35% marks (Math required)',
            govt: ['NIC Technical Assistant', 'SSC Technical Posts', 'Railway IT Technician'],
            private: ['Software Developer', 'Web Developer', 'Network Technician', 'IT Support Engineer'],
            higher: ['Lateral Entry to B.Tech Computer Science', 'BCA', 'Cybersecurity / AI Certifications']
        },
        {
            id: 'ece',
            title: 'Electronics & Communication Engineering',
            desc: 'Focuses on electronic devices, communication systems, and embedded systems.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass with minimum 35% marks (Math & Science required)',
            govt: ['SSC JE (Electronics)', 'DRDO Technician', 'ISRO Technical Assistant', 'Railways Signal Department'],
            private: ['Embedded Systems Technician', 'Telecom Engineer', 'PCB Designer', 'Service Engineer'],
            higher: ['Lateral Entry to B.Tech ECE', 'AMIE', 'IoT / VLSI Specialization']
        },
        {
            id: 'auto',
            title: 'Automobile Engineering',
            desc: 'Focuses on vehicle design, maintenance, and automotive systems.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass with minimum 35% marks (Math & Science required)',
            govt: ['State Transport Department', 'RRB Technical Posts', 'Defense Motor Transport Units'],
            private: ['Automobile Service Engineer', 'Workshop Supervisor', 'Vehicle Inspector', 'Automotive Designer'],
            higher: ['Lateral Entry to B.Tech Automobile / Mechanical', 'EV Technology Specialization']
        },
        {
            id: 'arch',
            title: 'Architecture Assistantship',
            desc: 'Focuses on building planning, drafting, and architectural design.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass (Math required)',
            govt: ['PWD Draftsman', 'Urban Development Departments', 'Municipal Corporations'],
            private: ['Architectural Assistant', 'Draftsman', 'Interior Design Assistant'],
            higher: ['B.Arch (via NATA)', 'B.Des Interior Design']
        },
        {
            id: 'chem',
            title: 'Chemical Engineering',
            desc: 'Focuses on chemical processes, production, and industrial plant operations.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass with Science & Math',
            govt: ['Fertilizer Corporation', 'Oil & Gas PSUs', 'Pollution Control Boards'],
            private: ['Plant Operator', 'Process Technician', 'Quality Control Assistant'],
            higher: ['Lateral Entry to B.Tech Chemical', 'Petroleum / Industrial Safety Courses']
        },
        {
            id: 'mining',
            title: 'Mining Engineering',
            desc: 'Focuses on extraction of minerals and mining operations.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass with Math & Science',
            govt: ['Coal India Limited', 'Geological Survey Departments', 'Mining Inspector'],
            private: ['Mine Supervisor', 'Safety Officer', 'Drilling Technician'],
            higher: ['B.Tech Mining (Lateral Entry)', 'Industrial Safety Certifications']
        },
        {
            id: 'fashion',
            title: 'Fashion Design',
            desc: 'Focuses on garment design, textile styling, and fashion production.',
            duration: '1–3 Years',
            eligibility: '10th Pass',
            govt: ['Textile Development Boards', 'Handloom & Handicraft Departments'],
            private: ['Fashion Designer', 'Boutique Owner', 'Stylist', 'Apparel Merchandiser'],
            higher: ['B.Des Fashion Design', 'Advanced Fashion Technology']
        },
        {
            id: 'hosp',
            title: 'Hotel Management',
            desc: 'Focuses on hospitality services, food production, and hotel operations.',
            duration: '1–3 Years',
            eligibility: '10th Pass',
            govt: ['Tourism Department', 'Railway Catering'],
            private: ['Hotel Supervisor', 'Chef', 'Front Office Executive', 'Event Coordinator'],
            higher: ['BHM', 'Culinary Arts Degree']
        },
        {
            id: 'ai',
            title: 'Artificial Intelligence (AI)',
            desc: 'Focuses on intelligent systems, machine learning models, automation, and smart applications.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass with minimum 35% marks (Math required)',
            govt: ['NIC Technical Assistant', 'DRDO Technical Posts', 'ISRO Technical Roles (after higher studies)'],
            private: ['AI Developer', 'Machine Learning Technician', 'Data Analyst', 'AI Support Engineer'],
            higher: ['Lateral Entry to B.Tech AI', 'B.Tech Computer Science', 'AI/ML Certifications']
        },
        {
            id: 'aiml',
            title: 'Artificial Intelligence & Machine Learning (AIML)',
            desc: 'Focuses on machine learning algorithms, deep learning, data modeling, and automation systems.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass (Math compulsory)',
            govt: ['Government IT Departments', 'Smart City Projects', 'Technical Assistant Roles'],
            private: ['ML Engineer', 'Data Analyst', 'AI Programmer', 'NLP Engineer'],
            higher: ['B.Tech AIML (Lateral Entry)', 'Data Science Specialization', 'Cloud + AI Certifications']
        },
        {
            id: 'ds',
            title: 'Data Science',
            desc: 'Focuses on data analysis, big data, statistics, and business intelligence.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass (Math required)',
            govt: ['Statistical Departments', 'E-Governance Projects', 'Data Entry Supervisor Roles'],
            private: ['Data Analyst', 'Business Intelligence Analyst', 'Data Technician'],
            higher: ['B.Tech Data Science', 'BCA', 'Advanced Analytics Certifications']
        },
        {
            id: 'cyber',
            title: 'Cyber Security',
            desc: 'Focuses on network security, ethical hacking, digital forensics, and data protection.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass (Math preferred)',
            govt: ['Cyber Crime Department', 'Defense Cyber Units', 'Police IT Cells'],
            private: ['Ethical Hacker', 'Security Analyst', 'Network Security Engineer', 'SOC Analyst'],
            higher: ['B.Tech Cyber Security', 'CEH Certification', 'Cloud Security Certifications']
        },
        {
            id: 'it',
            title: 'Information Technology (IT)',
            desc: 'Focuses on software systems, networking, databases, and IT infrastructure.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass (Math required)',
            govt: ['NIC', 'Railways IT Posts', 'SSC Technical Posts'],
            private: ['IT Support Engineer', 'Network Administrator', 'System Administrator', 'Web Developer'],
            higher: ['B.Tech IT', 'BCA', 'Cloud / DevOps Certifications']
        },
        {
            id: 'iot',
            title: 'Internet of Things (IoT)',
            desc: 'Focuses on smart devices, sensors, automation, and embedded systems.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass (Math & Science required)',
            govt: ['Smart City Projects', 'Electronics Departments', 'DRDO (after higher study)'],
            private: ['IoT Technician', 'Embedded Systems Engineer', 'Automation Technician'],
            higher: ['B.Tech IoT', 'Robotics / Embedded Systems']
        },
        {
            id: 'cloud',
            title: 'Cloud Computing',
            desc: 'Focuses on cloud platforms, server management, virtualization, and DevOps.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass (Math required)',
            govt: ['Government Data Centers', 'NIC Cloud Projects'],
            private: ['Cloud Support Engineer', 'DevOps Engineer', 'Cloud Administrator'],
            higher: ['B.Tech Cloud Computing', 'AWS / Azure Certifications']
        },
        {
            id: 'game',
            title: 'Game Development',
            desc: 'Focuses on game design, programming, graphics, and animation engines.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass',
            govt: ['Educational Game Projects', 'Media Departments'],
            private: ['Game Developer', 'Unity Developer', 'Game Designer'],
            higher: ['B.Sc Game Design', 'B.Tech CSE', 'Animation & Multimedia']
        },
        {
            id: 'robotics',
            title: 'Robotics Engineering',
            desc: 'Focuses on automation, robotic systems, and industrial robotics.',
            duration: '3 Years (6 Semesters)',
            eligibility: '10th Pass (Math & Science required)',
            govt: ['DRDO (after higher studies)', 'Defense Manufacturing Units'],
            private: ['Robotics Technician', 'Automation Engineer', 'Manufacturing Robot Programmer'],
            higher: ['B.Tech Robotics', 'Mechatronics']
        }
    ],
    // After 10th - ITI
    'iti': [
        {
            id: 'elec',
            title: 'Electrician',
            desc: 'Focuses on electrical wiring, installation, maintenance of electrical systems.',
            duration: '2 Years',
            eligibility: '10th Pass (Math & Science preferred)',
            govt: ['State Electricity Board', 'Railways', 'PWD Electrical Wing', 'Defense Technical Posts'],
            private: ['Electrical Technician', 'Maintenance Electrician', 'Industrial Electrician'],
            higher: ['Apprenticeship', 'Diploma (Lateral Entry)', 'Advanced Electrical Certification']
        },
        {
            id: 'fitter',
            title: 'Fitter',
            desc: 'Focuses on assembling, fitting, and maintaining machinery parts.',
            duration: '2 Years',
            eligibility: '10th Pass',
            govt: ['Railways', 'PSUs', 'Defense Factories'],
            private: ['Machine Fitter', 'Maintenance Technician', 'Production Technician'],
            higher: ['Diploma Mechanical', 'CNC Certification']
        },
        {
            id: 'welder',
            title: 'Welder',
            desc: 'Focuses on metal welding techniques and fabrication.',
            duration: '1 Year',
            eligibility: '8th / 10th Pass',
            govt: ['Railways', 'Shipyards', 'Oil & Gas PSUs'],
            private: ['Fabricator', 'MIG/TIG Welder', 'Structural Welder'],
            higher: ['Advanced Welding Certification', 'Diploma Mechanical']
        },
        {
            id: 'mmv',
            title: 'Mechanic Motor Vehicle (MMV)',
            desc: 'Focuses on repair and servicing of cars, bikes, and commercial vehicles.',
            duration: '2 Years',
            eligibility: '10th Pass',
            govt: ['State Transport Department', 'Defense Motor Units'],
            private: ['Automobile Technician', 'Service Advisor', 'Workshop Supervisor'],
            higher: ['Diploma Automobile', 'EV Technology Certification']
        },
        {
            id: 'plumber',
            title: 'Plumber',
            desc: 'Focuses on water supply systems, drainage systems, and pipe fittings.',
            duration: '1 Year',
            eligibility: '8th / 10th Pass',
            govt: ['Municipal Corporations', 'Water Supply Departments'],
            private: ['Plumbing Contractor', 'Pipe Fitting Technician'],
            higher: ['Advanced Construction Certification']
        },
        {
            id: 'rac',
            title: 'Refrigeration & AC Technician',
            desc: 'Focuses on AC installation, repair, and refrigeration systems.',
            duration: '2 Years',
            eligibility: '10th Pass',
            govt: ['Railways', 'Defense Technical Units'],
            private: ['AC Technician', 'HVAC Technician', 'Maintenance Supervisor'],
            higher: ['Diploma Mechanical', 'HVAC Advanced Course']
        },
        {
            id: 'copa',
            title: 'COPA (Computer Operator)',
            desc: 'Focuses on basic programming, office tools, networking fundamentals.',
            duration: '1 Year',
            eligibility: '10th Pass',
            govt: ['Data Entry Operator (Govt Offices)', 'IT Support Roles'],
            private: ['Computer Operator', 'Office Assistant', 'Junior Web Developer'],
            higher: ['Diploma Computer Engineering', 'BCA']
        },
        {
            id: 'cosmo',
            title: 'Cosmetology',
            desc: 'Focuses on beauty treatments, hair styling, skincare techniques.',
            duration: '1 Year',
            eligibility: '10th Pass',
            govt: ['Skill Development Centers'],
            private: ['Beautician', 'Salon Manager', 'Makeup Artist'],
            higher: ['Advanced Beauty Certification', 'Start Own Salon']
        },
        {
            id: 'tailor',
            title: 'Sewing Tech / Dress Making',
            desc: 'Focuses on garment construction and tailoring.',
            duration: '1 Year',
            eligibility: '8th / 10th Pass',
            govt: ['Textile Boards', 'Handloom Departments'],
            private: ['Tailor', 'Boutique Owner', 'Fashion Assistant'],
            higher: ['Diploma Fashion Design']
        }
    ],
    // Vocational & Certificate Courses
    'voc': [
        {
            id: 'beauty',
            title: 'Beauty & Wellness',
            desc: 'Focuses on skincare, hair styling, makeup, and salon management.',
            duration: '3-12 Months',
            eligibility: '10th Pass',
            govt: ['Skill Development Centers', 'Women Empowerment Schemes'],
            private: ['Salon Professional', 'Freelance Makeup Artist', 'Spa Executive'],
            higher: ['Advanced Cosmetology', 'Open Own Salon']
        },
        {
            id: 'mobile',
            title: 'Mobile Repairing',
            desc: 'Focuses on smartphone hardware and software repair.',
            duration: '3-6 Months',
            eligibility: '10th Pass',
            govt: ['Skill India Programs'],
            private: ['Mobile Repair Technician', 'Service Center Executive', 'Self-Employment (Shop Owner)'],
            higher: ['Advanced Electronics Course', 'Diploma Electronics']
        },
        {
            id: 'it',
            title: 'Computer & IT Basics',
            desc: 'Focuses on digital skills, MS Office, Tally, Web Design, and basic hardware/networking.',
            duration: '3-12 Months',
            eligibility: '10th Pass',
            govt: ['Data Entry Operator (Govt Offices)'],
            private: ['Computer Operator', 'Graphic Designer', 'Web Developer', 'IT Support Executive'],
            higher: ['Diploma Computer Engineering', 'BCA']
        },
        {
            id: 'elec_repair',
            title: 'Electrical & Appliance Repair',
            desc: 'Focuses on home appliance servicing and basic electrical repair (AC, Refrigerator, Solar Install).',
            duration: '3-6 Months',
            eligibility: '10th Pass',
            govt: ['Skill India Programs'],
            private: ['Service Technician', 'Maintenance Technician', 'Self-Employed Contractor'],
            higher: ['ITI Electrician', 'Diploma Electrical']
        },
        {
            id: 'auto_repair',
            title: 'Two-Wheeler/Auto Basics',
            desc: 'Focuses on servicing and repairing bikes and small vehicles.',
            duration: '3-6 Months',
            eligibility: '8th / 10th Pass',
            govt: ['Skill India Programs'],
            private: ['Mechanic', 'Garage Technician', 'Workshop Owner'],
            higher: ['ITI Motor Vehicle', 'Diploma Automobile']
        },
        {
            id: 'culinary',
            title: 'Culinary & Bakery Courses',
            desc: 'Focuses on cooking, baking, and food production.',
            duration: '3-12 Months',
            eligibility: '10th Pass',
            govt: ['Skill India Programs'],
            private: ['Chef Assistant', 'Baker', 'Catering Entrepreneur'],
            higher: ['Diploma Hotel Management', 'BHM']
        }
    ],
    // Paramedical
    'para': [
        {
            id: 'dmlt',
            title: 'DMLT (Medical Lab Tech)',
            desc: 'Focuses on laboratory testing of blood, urine, and other samples.',
            duration: '2 Years',
            eligibility: '10th / 12th (Science preferred)',
            govt: ['Government Hospitals', 'District Health Departments', 'Public Health Labs'],
            private: ['Lab Technician', 'Pathology Lab Assistant', 'Diagnostic Center Technician'],
            higher: ['B.Sc MLT', 'Advanced Pathology Certification']
        },
        {
            id: 'xray',
            title: 'X-Ray / Radiology Technician',
            desc: 'Focuses on operating imaging equipment like X-ray machines.',
            duration: '1-2 Years',
            eligibility: '10th / 12th (Science preferred)',
            govt: ['Government Hospitals', 'Railway Hospitals'],
            private: ['Radiology Technician', 'Imaging Assistant'],
            higher: ['B.Sc Radiology', 'CT/MRI Specialization']
        },
        {
            id: 'ot',
            title: 'Operation Theatre (OT) Technician',
            desc: 'Focuses on assisting surgeons during operations and managing OT equipment.',
            duration: '1-2 Years',
            eligibility: '10th / 12th (Science preferred)',
            govt: ['Government Medical Colleges', 'District Hospitals'],
            private: ['OT Assistant', 'Surgical Technician'],
            higher: ['B.Sc Operation Theatre Technology']
        },
        {
            id: 'dialysis',
            title: 'Dialysis Technician',
            desc: 'Focuses on operating dialysis machines for kidney patients.',
            duration: '1-2 Years',
            eligibility: '12th (Science preferred)',
            govt: ['Government Hospitals', 'Health Schemes'],
            private: ['Dialysis Technician', 'Renal Care Assistant'],
            higher: ['B.Sc Dialysis Technology']
        },
        {
            id: 'emt',
            title: 'Emergency Medical Technician',
            desc: 'Focuses on emergency care and ambulance services.',
            duration: '1-2 Years',
            eligibility: '12th (Science preferred)',
            govt: ['Government Ambulance Services', 'Disaster Response Units'],
            private: ['EMT', 'Emergency Care Assistant'],
            higher: ['B.Sc Emergency Medicine']
        }
    ],
    // Bridge / Open Schooling
    'bridge': [
        {
            id: 'nios12',
            title: 'Senior Secondary (Class 12 - NIOS)',
            desc: 'Secondary education completed entirely via flexible distance learning (Science/Commerce/Arts streams).',
            duration: 'Flexible (1-5 Years)',
            eligibility: '10th Pass',
            govt: ['Eligible for NDA', 'SSC Exams', 'Railways', 'Most State & Central Govt Posts'],
            private: ['Eligible for entry-level private sector jobs requiring a high school diploma'],
            higher: ['B.Tech / MBBS (If specific subject criteria met)', 'B.Com / BBA', 'B.A.']
        },
        {
            id: 'nios10',
            title: 'Secondary Course (Class 10 - NIOS)',
            desc: 'Class 10 completed via distance learning, ideal for dropouts or professional athletes.',
            duration: 'Flexible (1-5 Years)',
            eligibility: 'Minimum 14 Years Age',
            govt: ['MTS (Multi Tasking Staff)', 'Postal Department', 'Basic State Govt Jobs'],
            private: ['Retail Assistant', 'Basic Administrative Roles'],
            higher: ['Senior Secondary (Class 12)', 'ITI', 'Diploma']
        }
    ],
    // Higher Secondary (11-12)
    'hs': [
        {
            id: 'sci_pcm',
            title: 'Science Stream (PCM)',
            desc: 'Physics, Chemistry, and Mathematics. Gateway to engineering, architecture, and technology domains.',
            duration: '2 Years',
            eligibility: '10th Pass from recognized board',
            govt: ['NDA (Defense Services)', 'ISRO/DRDO (after higher tech studies)', 'Engineering Services'],
            private: ['Engineer', 'Architect', 'Data Scientist', 'Software Developer'],
            higher: ['B.Tech / B.E.', 'B.Arch', 'B.Sc (Physics/Chem/Maths)']
        },
        {
            id: 'sci_pcb',
            title: 'Science Stream (PCB)',
            desc: 'Physics, Chemistry, and Biology. Gateway to medical, pharmacy, nursing, and life sciences.',
            duration: '2 Years',
            eligibility: '10th Pass from recognized board',
            govt: ['Medical Officer (after MBBS)', 'Govt Researcher', 'Govt Nursing Staff'],
            private: ['Doctor', 'Nurse', 'Pharmacist', 'Research Scientist', 'Biotech Professional'],
            higher: ['MBBS / BDS / BAMS', 'B.Pharm', 'B.Sc Nursing', 'B.Sc Biotechnology']
        },
        {
            id: 'com',
            title: 'Commerce Stream',
            desc: 'Focuses on business, finance, trade, accounting, and management principles.',
            duration: '2 Years',
            eligibility: '10th Pass from recognized board',
            govt: ['Banking Officer', 'Income Tax Officer', 'SSC & Govt Clerical Jobs', 'RBI (after grad)'],
            private: ['Accountant', 'Financial Analyst', 'Business Manager', 'Investment Banker', 'Entrepreneur'],
            higher: ['B.Com', 'BBA', 'CA / CS / CMA', 'B.Econ']
        },
        {
            id: 'arts',
            title: 'Arts / Humanities Stream',
            desc: 'Focuses on social sciences, history, psychology, law, and public services.',
            duration: '2 Years',
            eligibility: '10th Pass from recognized board',
            govt: ['UPSC Civil Services', 'State PSC', 'Teaching', 'Police Services'],
            private: ['Journalist', 'Lawyer', 'Social Worker', 'Psychologist', 'HR Executive'],
            higher: ['B.A.', 'BA LLB (Law)', 'Journalism & Mass Comm', 'Psychology Degrees']
        }
    ],
    // After 12th - Engineering
    'eng': [
        {
            id: 'cse',
            title: 'Computer Science Engineering (CSE)',
            desc: 'Comprehensive study of computing systems, programming languages, software design, and AI.',
            duration: '4 Years (8 Semesters)',
            eligibility: '12th Pass with Physics, Chemistry, Mathematics (PCM) and valid entrance score (JEE/State CET)',
            govt: ['Scientist (ISRO, DRDO, NIC)', 'Banking Specialist Officer (IT)', 'PSU IT roles'],
            private: ['Software Developer', 'Data Scientist', 'Cloud Architect', 'Cybersecurity Analyst'],
            higher: ['M.Tech / M.E.', 'MS in Computer Science (Abroad)', 'MBA']
        },
        {
            id: 'ece',
            title: 'Electronics & Communication',
            desc: 'Designing and developing electronic equipment, communication systems, and integrated circuits.',
            duration: '4 Years',
            eligibility: '12th Pass with PCM',
            govt: ['BSNL JTO', 'AAI Electronics Officer', 'Defense Communication'],
            private: ['Telecom Engineer', 'Network Planner', 'Embedded Systems Engineer', 'VLSI Designer'],
            higher: ['M.Tech VLSI / Communications', 'MBA']
        },
        {
            id: 'me',
            title: 'Mechanical Engineering',
            desc: 'Core engineering major focusing on design, analysis, and manufacturing of machines.',
            duration: '4 Years',
            eligibility: '12th Pass with PCM',
            govt: ['IES (Indian Engineering Services)', 'PSUs (ONGC, IOCL, GAIL)', 'RRB SSE'],
            private: ['Automotive Engineer', 'Robotics Engineer', 'Manufacturing Specialist', 'Supply Chain Analyst'],
            higher: ['M.Tech Thermal/Design', 'MS in Robotics']
        }
    ],
    // After 12th - Commerce & Mgmt
    'com': [
        {
            id: 'bcom',
            title: 'B.Com (General/Honors)',
            desc: 'Foundational degree in commerce covering accounting, finance, taxation, and economics.',
            duration: '3 Years (or 4 Years under NEP)',
            eligibility: '12th Pass (Commerce preferred but any stream allowed)',
            govt: ['SSC CGL (Auditor, Inspector)', 'Bank PO/Clerk', 'Accountant in Govt Depts'],
            private: ['Corporate Accountant', 'Financial Analyst', 'Tax Consultant', 'Operations Executive'],
            higher: ['M.Com', 'MBA', 'CA / CS / CMA']
        },
        {
            id: 'bba',
            title: 'BBA (Business Admin)',
            desc: 'Focuses on management principles, marketing, HR, and business operations.',
            duration: '3 Years',
            eligibility: '12th Pass (Any stream)',
            govt: ['General administrative banking roles', 'State PSC exams'],
            private: ['Sales Executive', 'HR Coordinator', 'Business Development Rep', 'Marketing Analyst'],
            higher: ['MBA (Marketing/HR/Finance)', 'PGDM']
        },
        {
            id: 'ca',
            title: 'Chartered Accountancy (CA)',
            desc: 'Premier professional accounting credential in India, heavily focused on audit, tax, and law.',
            duration: '4.5 - 5 Years',
            eligibility: '12th Pass (Any stream) -> Clear Foundation Exam',
            govt: ['PSU Finance Officer', 'RBI Grade B (Finance)', 'SEBI Officer'],
            private: ['Statutory Auditor', 'CFO', 'Tax Consultant', 'Investment Banker', 'Forensic Auditor'],
            higher: ['CFA', 'CPA (US)', 'MBA Top tier']
        }
    ],
    // After Graduation - Postgrad
    'pg': [
        {
            id: 'mba',
            title: 'MBA (Master of Business Admin)',
            desc: 'Premier postgraduate degree for leadership, management capabilities, and business scaling.',
            duration: '2 Years',
            eligibility: 'Bachelor\'s Degree with min 50% + Entrance (CAT/XAT/MAT/GMAT)',
            govt: ['Management Trainee in PSUs', 'RBI Grade B General'],
            private: ['Product Manager', 'Management Consultant', 'Investment Banker', 'Marketing Director'],
            higher: ['Ph.D. in Management', 'Executive Leadership Programs']
        },
        {
            id: 'mtech',
            title: 'M.Tech / M.E.',
            desc: 'Deep specialization in engineering disciplines (e.g. AI, Structural, Thermal, VLSI).',
            duration: '2 Years',
            eligibility: 'B.Tech/B.E. + GATE score',
            govt: ['Scientist \'B\' roles (DRDO, ISRO, BARC)', 'Assistant Professor (via NET)'],
            private: ['R&D Engineer', 'Principal Software Engineer', 'Data Scientist', 'Specialized Consultant'],
            higher: ['Ph.D. in Engineering', 'Post-Doc Fellowships']
        }
    ]
};
