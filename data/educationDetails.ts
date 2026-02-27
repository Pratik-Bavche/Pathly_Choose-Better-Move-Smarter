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
            desc: 'Focuses on programming, software development, AI, data structures, and system design.',
            duration: '4 Years',
            eligibility: '12th PCM (Math compulsory)',
            govt: ['NIC', 'DRDO', 'ISRO (after exams)', 'SSC Technical Posts'],
            private: ['Software Developer', 'Full Stack Developer', 'App Developer', 'System Engineer'],
            higher: ['M.Tech CSE', 'MS Abroad', 'MBA IT', 'Data Science / AI Specialization']
        },
        {
            id: 'aiml',
            title: 'Artificial Intelligence & Machine Learning',
            desc: 'Focuses on AI systems, deep learning, automation, and predictive analytics.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['DRDO AI Projects', 'Smart City Tech Roles', 'Govt IT Departments'],
            private: ['AI Engineer', 'ML Engineer', 'Data Scientist', 'NLP Engineer'],
            higher: ['M.Tech AI', 'MS Data Science', 'Robotics Specialization']
        },
        {
            id: 'cyber',
            title: 'Cyber Security',
            desc: 'Focuses on ethical hacking, digital forensics, network security.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['Cyber Crime Department', 'Defense Cyber Units', 'Intelligence Agencies'],
            private: ['Ethical Hacker', 'Security Analyst', 'SOC Analyst', 'Cyber Consultant'],
            higher: ['M.Tech Cyber Security', 'CEH Certification', 'Cloud Security']
        },
        {
            id: 'ee',
            title: 'Electrical Engineering',
            desc: 'Focuses on power systems, electrical machines, and energy systems.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['SSC JE', 'State Electricity Boards', 'PSUs', 'Railways'],
            private: ['Electrical Engineer', 'Power Plant Engineer', 'Maintenance Engineer'],
            higher: ['M.Tech Electrical', 'Renewable Energy Specialization']
        },
        {
            id: 'me',
            title: 'Mechanical Engineering',
            desc: 'Focuses on machines, manufacturing, robotics, and thermal systems.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['DRDO', 'ISRO', 'Indian Railways', 'PSUs'],
            private: ['Production Engineer', 'Design Engineer', 'Automotive Engineer', 'Plant Manager'],
            higher: ['M.Tech Mechanical', 'Robotics', 'Automobile Specialization']
        },
        {
            id: 'ce',
            title: 'Civil Engineering',
            desc: 'Focuses on construction, infrastructure, and structural design.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['PWD', 'CPWD', 'SSC JE', 'RRB JE'],
            private: ['Site Engineer', 'Structural Engineer', 'Construction Manager', 'Urban Planner'],
            higher: ['M.Tech Civil', 'Environmental Engineering']
        },
        {
            id: 'ece',
            title: 'Electronics & Communication Engineering (ECE)',
            desc: 'Focuses on communication systems, electronics, embedded systems.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['ISRO', 'DRDO', 'Railways Signal Dept'],
            private: ['Telecom Engineer', 'Embedded Engineer', 'PCB Designer'],
            higher: ['M.Tech ECE', 'VLSI', 'IoT']
        },
        {
            id: 'auto',
            title: 'Automobile Engineering',
            desc: 'Focuses on vehicle design and automotive systems.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['State Transport', 'Defense Motor Units'],
            private: ['Automotive Engineer', 'EV Engineer', 'Design Engineer'],
            higher: ['M.Tech Automobile', 'EV Technology']
        },
        {
            id: 'cloud',
            title: 'Cloud Computing',
            desc: 'Focuses on cloud platforms, DevOps, virtualization.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['NIC', 'Govt Tech Projects'],
            private: ['Cloud Engineer', 'DevOps Engineer', 'Cloud Architect'],
            higher: ['M.Tech Cloud', 'AWS / Azure Certifications']
        },
        {
            id: 'rob',
            title: 'Robotics Engineering',
            desc: 'Focuses on automation, robotics systems, AI integration.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['DRDO', 'Govt Automation Labs'],
            private: ['Robotics Engineer', 'Automation Engineer', 'Industrial Programmer'],
            higher: ['Mechatronics', 'AI Robotics']
        },
        {
            id: 'chem',
            title: 'Chemical Engineering',
            desc: 'Focuses on industrial chemical processes and production.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['Oil & Gas PSUs', 'Fertilizer Plants'],
            private: ['Process Engineer', 'Plant Engineer'],
            higher: ['M.Tech Chemical', 'Petroleum Specialization']
        },
        {
            id: 'aero',
            title: 'Aerospace Engineering',
            desc: 'Focuses on aircraft and spacecraft systems.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['ISRO', 'DRDO', 'HAL'],
            private: ['Aerospace Engineer', 'Aircraft Maintenance Engineer'],
            higher: ['M.Tech Aerospace', 'MS Abroad']
        },
        {
            id: 'marine',
            title: 'Marine Engineering',
            desc: 'Focuses on ship machinery and marine systems.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['Indian Navy', 'Coast Guard'],
            private: ['Marine Engineer', 'Ship Engineer'],
            higher: ['Merchant Navy Certifications']
        },
        {
            id: 'arch',
            title: 'Architecture (B.Arch)',
            desc: 'Focuses on building design and planning.',
            duration: '5 Years',
            eligibility: '12th PCM + NATA',
            govt: ['PWD', 'Urban Development'],
            private: ['Architect', 'Interior Designer'],
            higher: ['M.Arch', 'Urban Planning']
        }
    ],

    // After 12th - Medical & Healthcare
    'med': [
        {
            id: 'mbbs',
            title: 'MBBS (Bachelor of Medicine & Surgery)',
            desc: 'Focuses on diagnosis, treatment, and prevention of diseases.',
            duration: '5.5 Years',
            eligibility: '12th PCB + NEET Qualification',
            govt: ['Government Hospitals', 'Armed Forces Medical Services', 'Public Health Departments'],
            private: ['Private Hospital Doctor', 'Clinic Owner', 'Specialist (after PG)'],
            higher: ['MD / MS', 'Super Specialization (DM / MCh)']
        },
        {
            id: 'bds',
            title: 'BDS (Bachelor of Dental Surgery)',
            desc: 'Focuses on dental care, oral surgery, and oral health.',
            duration: '5 Years',
            eligibility: '12th PCB + NEET',
            govt: ['Government Dental Hospitals', 'Army Dental Corps'],
            private: ['Dentist', 'Dental Clinic Owner'],
            higher: ['MDS (Master of Dental Surgery)']
        },
        {
            id: 'bpharm',
            title: 'B.Pharm (Bachelor of Pharmacy)',
            desc: 'Focuses on medicines, drug formulation, and pharmaceutical science.',
            duration: '4 Years',
            eligibility: '12th PCB or PCM',
            govt: ['Drug Inspector', 'Government Hospitals', 'Pharma PSUs'],
            private: ['Pharmacist', 'Medical Representative', 'Pharma Research Associate'],
            higher: ['M.Pharm', 'Pharm.D', 'MBA Pharma']
        },
        {
            id: 'nursing',
            title: 'B.Sc Nursing',
            desc: 'Focuses on patient care and hospital management.',
            duration: '4 Years',
            eligibility: '12th PCB',
            govt: ['Government Hospitals', 'Military Nursing Services'],
            private: ['Staff Nurse', 'ICU Nurse', 'Hospital Supervisor'],
            higher: ['M.Sc Nursing', 'Nurse Practitioner Programs']
        },
        {
            id: 'bpt',
            title: 'BPT (Bachelor of Physiotherapy)',
            desc: 'Focuses on physical rehabilitation and movement therapy.',
            duration: '4.5 Years',
            eligibility: '12th PCB',
            govt: ['Government Hospitals', 'Sports Authorities'],
            private: ['Physiotherapist', 'Sports Rehab Specialist', 'Clinic Owner'],
            higher: ['MPT (Master of Physiotherapy)']
        },
        {
            id: 'mlt',
            title: 'B.Sc Medical Lab Technology (MLT)',
            desc: 'Focuses on diagnostic lab testing and pathology.',
            duration: '3-4 Years',
            eligibility: '12th PCB',
            govt: ['Government Labs', 'Public Health Departments'],
            private: ['Lab Technologist', 'Diagnostic Center Technician'],
            higher: ['M.Sc MLT']
        },
        {
            id: 'radiology',
            title: 'B.Sc Radiology / Imaging Technology',
            desc: 'Focuses on X-ray, MRI, CT scan imaging systems.',
            duration: '3-4 Years',
            eligibility: '12th PCB',
            govt: ['Government Hospitals', 'Railway Hospitals'],
            private: ['Radiology Technologist', 'Imaging Specialist'],
            higher: ['M.Sc Radiology']
        },
        {
            id: 'bams',
            title: 'BAMS (Ayurvedic Medicine)',
            desc: 'Focuses on traditional Ayurvedic medicine.',
            duration: '5.5 Years',
            eligibility: '12th PCB + NEET',
            govt: ['Government Ayurvedic Hospitals'],
            private: ['Ayurvedic Doctor', 'Wellness Consultant'],
            higher: ['MD/MS in Ayurveda']
        },
        {
            id: 'bhms',
            title: 'BHMS (Homeopathy)',
            desc: 'Focuses on homeopathic treatment systems.',
            duration: '5.5 Years',
            eligibility: '12th PCB + NEET',
            govt: ['Government Homeopathic Clinics'],
            private: ['Homeopathic Doctor', 'Clinic Owner'],
            higher: ['MD in Homeopathy']
        },
        {
            id: 'biotech',
            title: 'B.Sc Biotechnology',
            desc: 'Focuses on genetic research and biological innovations.',
            duration: '3-4 Years',
            eligibility: '12th PCB or PCM',
            govt: ['Research Labs', 'Agricultural Departments'],
            private: ['Research Associate', 'Biotech Analyst'],
            higher: ['M.Sc Biotechnology', 'Ph.D']
        },
        {
            id: 'para_deg',
            title: 'Allied Health / Paramedical Degrees',
            desc: 'Dialysis Technology, OT Technology, Emergency Medicine, Optometry.',
            duration: '3-4 Years',
            eligibility: '12th PCB',
            govt: ['Government Hospitals', 'Medical Colleges'],
            private: ['Paramedical Staff', 'OT Technician', 'Optometrist'],
            higher: ['M.Sc in Allied Health']
        }
    ],

    // After 12th - Pure Science
    'sci': [
        {
            id: 'physics',
            title: 'B.Sc Physics',
            desc: 'Focuses on mechanics, thermodynamics, quantum physics, electronics, and research.',
            duration: '3 Years',
            eligibility: '12th PCM',
            govt: ['ISRO/DRDO (after M.Sc)', 'Research Labs', 'Teaching (after B.Ed)'],
            private: ['Lab Analyst', 'Research Assistant', 'Technical Consultant'],
            higher: ['M.Sc Physics', 'M.Tech', 'Data Science', 'Ph.D']
        },
        {
            id: 'chemistry',
            title: 'B.Sc Chemistry',
            desc: 'Focuses on chemical reactions, organic/inorganic chemistry, industrial chemistry.',
            duration: '3 Years',
            eligibility: '12th PCM or PCB',
            govt: ['Pollution Control Board', 'Public Health Labs'],
            private: ['Chemical Analyst', 'Quality Control Officer', 'Pharma Research Assistant'],
            higher: ['M.Sc Chemistry', 'Chemical Engineering']
        },
        {
            id: 'biology',
            title: 'B.Sc Biology / Life Sciences',
            desc: 'Focuses on plant & animal sciences, genetics, microbiology.',
            duration: '3 Years',
            eligibility: '12th PCB',
            govt: ['Forest Department', 'Agricultural Department', 'Research Labs'],
            private: ['Lab Technician', 'Biotech Assistant', 'Environmental Analyst'],
            higher: ['M.Sc Microbiology', 'M.Sc Biotechnology', 'Ph.D']
        },
        {
            id: 'math',
            title: 'B.Sc Mathematics',
            desc: 'Focuses on advanced mathematics, statistics, and analytical methods.',
            duration: '3 Years',
            eligibility: '12th PCM',
            govt: ['Statistical Departments', 'Banking Exams', 'Teaching'],
            private: ['Data Analyst', 'Actuarial Assistant', 'Financial Analyst'],
            higher: ['M.Sc Mathematics', 'Data Science', 'Actuarial Science']
        },
        {
            id: 'env',
            title: 'B.Sc Environmental Science',
            desc: 'Focuses on climate change, pollution control, sustainability.',
            duration: '3 Years',
            eligibility: '12th Science',
            govt: ['Pollution Control Board', 'Environmental Departments'],
            private: ['Environmental Consultant', 'Sustainability Officer'],
            higher: ['M.Sc Environmental Science', 'Disaster Management']
        },
        {
            id: 'agri',
            title: 'B.Sc Agriculture',
            desc: 'Focuses on farming technology, crop production, agribusiness.',
            duration: '4 Years',
            eligibility: '12th PCB or Agriculture Stream',
            govt: ['Agriculture Officer', 'FCI', 'NABARD'],
            private: ['Agri Business Manager', 'Farm Consultant'],
            higher: ['M.Sc Agriculture', 'Agricultural Research']
        },
        {
            id: 'stats',
            title: 'B.Sc Statistics',
            desc: 'Focuses on data analysis, probability, and analytics.',
            duration: '3 Years',
            eligibility: '12th PCM',
            govt: ['Statistical Departments', 'Census Departments'],
            private: ['Data Analyst', 'Risk Analyst'],
            higher: ['M.Sc Statistics', 'Data Science', 'Actuarial Science']
        }
    ],

    // After 12th - Commerce & Mgmt
    'com': [
        {
            id: 'bcom',
            title: 'B.Com / B.Com (Hons)',
            desc: 'Focuses on accounting, taxation, finance, auditing, and business laws.',
            duration: '3 Years',
            eligibility: '12th Pass (Commerce preferred)',
            govt: ['Banking Exams', 'SSC CGL', 'Income Tax Department', 'RBI'],
            private: ['Accountant', 'Tax Consultant', 'Financial Analyst', 'Auditor'],
            higher: ['M.Com', 'MBA', 'CA / CS / CMA']
        },
        {
            id: 'bba',
            title: 'BBA (Bachelor of Business Administration)',
            desc: 'Focuses on business management, marketing, HR, entrepreneurship.',
            duration: '3 Years',
            eligibility: '12th Pass (Any Stream)',
            govt: ['Banking', 'SSC', 'Government Administrative Roles'],
            private: ['HR Executive', 'Marketing Executive', 'Business Development Manager'],
            higher: ['MBA', 'PGDM', 'International Business Studies']
        },
        {
            id: 'becon',
            title: 'B.Econ (Bachelor of Economics)',
            desc: 'Focuses on economic theory, statistics, financial systems.',
            duration: '3 Years',
            eligibility: '12th Pass (Math preferred)',
            govt: ['RBI', 'Economic Advisory Departments', 'Statistical Services'],
            private: ['Economist', 'Financial Analyst', 'Investment Banker'],
            higher: ['M.A. Economics', 'MBA Finance', 'Actuarial Science']
        },
        {
            id: 'ca',
            title: 'Chartered Accountant (CA)',
            desc: 'Focuses on auditing, taxation, corporate finance.',
            duration: '4-5 Years',
            eligibility: '12th Pass (Commerce preferred)',
            govt: ['Government Audit Departments', 'CAG', 'PSU Finance Roles'],
            private: ['Chartered Accountant', 'Tax Advisor', 'Corporate Finance Manager'],
            higher: ['International Accounting Certifications']
        },
        {
            id: 'cs',
            title: 'Company Secretary (CS)',
            desc: 'Focuses on corporate laws, company compliance, legal governance.',
            duration: '3-5 Years',
            eligibility: '12th Pass',
            govt: ['Corporate Affairs Departments', 'PSU Legal Divisions'],
            private: ['Company Secretary', 'Compliance Officer', 'Legal Advisor'],
            higher: ['LLB', 'MBA']
        },
        {
            id: 'cma',
            title: 'CMA (Cost & Management Accountant)',
            desc: 'Focuses on cost accounting and financial management.',
            duration: '3-4 Years',
            eligibility: '12th Pass',
            govt: ['Cost Auditor in PSUs', 'Government Financial Services'],
            private: ['Cost Accountant', 'Finance Controller', 'Budget Analyst'],
            higher: ['CFA', 'MBA Finance']
        },
        {
            id: 'baf',
            title: 'Bachelor of Accounting & Finance',
            desc: 'Focuses on banking, financial markets, and investment analysis.',
            duration: '3 Years',
            eligibility: '12th Commerce',
            govt: ['Banking Exams', 'Govt Finance Sectors'],
            private: ['Banking Executive', 'Financial Planner', 'Investment Analyst'],
            higher: ['MBA Finance', 'CFA']
        }
    ],

    // After 12th - Arts & Humanities
    'arts': [
        {
            id: 'ba',
            title: 'B.A. (Bachelor of Arts)',
            desc: 'Focuses on history, political science, sociology, psychology, languages.',
            duration: '3 Years',
            eligibility: '12th Pass (Any Stream)',
            govt: ['UPSC Civil Services', 'State PSC', 'SSC CGL', 'Teaching (after B.Ed)'],
            private: ['Content Writer', 'HR Executive', 'NGO Officer', 'Social Worker'],
            higher: ['M.A.', 'LLB', 'MBA', 'UPSC Preparation']
        },
        {
            id: 'ballb',
            title: 'BA LLB (Integrated Law)',
            desc: 'Focuses on law, legal systems, constitutional law, corporate law.',
            duration: '5 Years',
            eligibility: '12th Pass (CLAT / Entrance Exam)',
            govt: ['Judicial Services', 'Public Prosecutor', 'Legal Advisor (Govt)'],
            private: ['Advocate', 'Corporate Lawyer', 'Legal Consultant'],
            higher: ['LLM', 'Judicial Services Exam']
        },
        {
            id: 'bjmc',
            title: 'BJMC (Journalism & Mass Communication)',
            desc: 'Focuses on media, news reporting, public relations, digital media.',
            duration: '3 Years',
            eligibility: '12th Pass',
            govt: ['Press Information Bureau', 'Government Media Departments'],
            private: ['Journalist', 'News Reporter', 'Content Creator', 'PR Executive'],
            higher: ['M.A. Journalism', 'Digital Media Specialization']
        },
        {
            id: 'psych',
            title: 'B.A. Psychology',
            desc: 'Focuses on human behavior, mental health, counseling.',
            duration: '3 Years',
            eligibility: '12th Pass',
            govt: ['Government Hospitals', 'Rehabilitation Centers'],
            private: ['Counselor', 'HR Specialist', 'Clinical Psychologist (after PG)'],
            higher: ['M.A. Psychology', 'Clinical Psychology', 'Ph.D']
        },
        {
            id: 'geo',
            title: 'B.A. Geography',
            desc: 'Focuses on environmental systems, mapping, urban planning.',
            duration: '3 Years',
            eligibility: '12th Pass',
            govt: ['Survey of India', 'Urban Development Departments'],
            private: ['GIS Analyst', 'Urban Planner'],
            higher: ['M.A./M.Sc Geography', 'Disaster Management']
        },
        {
            id: 'bed',
            title: 'B.A. + B.Ed (Teaching Path)',
            desc: 'Focuses on becoming a school teacher.',
            duration: '4 Years',
            eligibility: '12th Pass',
            govt: ['Government School Teacher (after TET/CTET)'],
            private: ['School Teacher', 'Education Coordinator'],
            higher: ['M.Ed', 'Educational Administration']
        },
        {
            id: 'bsw',
            title: 'BSW (Bachelor of Social Work)',
            desc: 'Focuses on community development and social welfare.',
            duration: '3 Years',
            eligibility: '12th Pass',
            govt: ['Social Welfare Departments', 'NGOs'],
            private: ['Social Worker', 'Community Coordinator'],
            higher: ['MSW']
        }
    ],

    // Computer & IT
    'it': [
        {
            id: 'bca',
            title: 'BCA (Bachelor of Computer Applications)',
            desc: 'Focuses on programming, software development, databases, and web technologies.',
            duration: '3 Years',
            eligibility: '12th Pass (Math or CS preferred)',
            govt: ['Government IT Departments', 'SSC IT Posts', 'NIC Technical Assistant'],
            private: ['Software Developer', 'Web Developer', 'App Developer', 'IT Support'],
            higher: ['MCA', 'M.Sc Computer Science', 'MBA IT']
        },
        {
            id: 'bsc_cs',
            title: 'B.Sc Computer Science',
            desc: 'Focuses on algorithms, data structures, operating systems, and programming.',
            duration: '3 Years',
            eligibility: '12th PCM',
            govt: ['SSC Technical Posts', 'Banking IT Officer'],
            private: ['System Analyst', 'Backend Developer', 'Software Engineer'],
            higher: ['M.Sc CS', 'MCA', 'MS Abroad']
        },
        {
            id: 'bsc_it',
            title: 'B.Sc Information Technology (IT)',
            desc: 'Focuses on networking, cybersecurity basics, cloud systems, databases.',
            duration: '3 Years',
            eligibility: '12th Pass (Math preferred)',
            govt: ['Govt Tech Support', 'NIC Networks'],
            private: ['Network Administrator', 'IT Support Specialist', 'System Administrator', 'Cloud Support Executive'],
            higher: ['M.Sc IT', 'Cyber Security Specialization']
        },
        {
            id: 'btech_cse',
            title: 'B.Tech CSE',
            desc: 'Focuses on advanced computing, AI, machine learning, software engineering.',
            duration: '4 Years',
            eligibility: '12th PCM + Entrance Exam',
            govt: ['ISRO', 'DRDO', 'Defense IT Units'],
            private: ['Software Engineer', 'Data Scientist', 'Cloud Architect'],
            higher: ['M.Tech', 'MS Abroad', 'MBA']
        },
        {
            id: 'btech_aiml',
            title: 'B.Tech AI / Machine Learning',
            desc: 'Focuses on machine learning models, robotics, automation systems.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['Govt AI/Tech hubs'],
            private: ['AI Developer', 'ML Engineer', 'Data Scientist'],
            higher: ['M.Tech AI']
        },
        {
            id: 'btech_cyber',
            title: 'B.Tech Cyber Security',
            desc: 'Focuses on ethical hacking, digital forensics, network security.',
            duration: '4 Years',
            eligibility: '12th PCM',
            govt: ['CERT-In', 'Cyber Police', 'Defense Cyber Probes'],
            private: ['Cyber Security Analyst', 'Ethical Hacker', 'SOC Engineer'],
            higher: ['M.Tech Cyber Security']
        }
    ],

    // Design & Creative
    'des': [
        {
            id: 'bdes',
            title: 'B.Des (Product, UI/UX, Interaction)',
            desc: 'Focuses on creativity, product innovation, user experience, and visual communication.',
            duration: '4 Years',
            eligibility: '12th Pass (Entrance exam for top institutes)',
            govt: ['Design Departments in PSUs', 'Government Innovation Projects'],
            private: ['Product Designer', 'UI/UX Designer', 'Creative Director'],
            higher: ['M.Des', 'International Design Programs']
        },
        {
            id: 'bdes_fas',
            title: 'B.Des Fashion Design',
            desc: 'Focuses on garment design, textile innovation, fashion styling.',
            duration: '4 Years',
            eligibility: '12th Pass (NIFT/NID entrance)',
            govt: ['Textile Boards', 'Handloom & Handicraft Departments'],
            private: ['Fashion Designer', 'Stylist', 'Apparel Merchandiser'],
            higher: ['M.Des Fashion']
        },
        {
            id: 'bdes_int',
            title: 'B.Des Interior Design',
            desc: 'Focuses on space planning, architecture interiors, and aesthetics.',
            duration: '4 Years',
            eligibility: '12th Pass',
            govt: ['PWD Architecture Wings'],
            private: ['Interior Designer', 'Space Planner', '3D Visualizer'],
            higher: ['Advanced Interior Architecture']
        },
        {
            id: 'barch',
            title: 'B.Arch (Architecture)',
            desc: 'Focuses on building planning, construction design, structural concepts.',
            duration: '5 Years',
            eligibility: '12th PCM + NATA',
            govt: ['PWD', 'Urban Development Departments', 'Municipal Corporations'],
            private: ['Architect', 'Urban Planner', 'Project Designer'],
            higher: ['M.Arch', 'Urban Planning']
        },
        {
            id: 'anim',
            title: 'B.Sc Animation & Multimedia',
            desc: 'Focuses on 2D/3D animation, VFX, film production, digital media.',
            duration: '3 Years',
            eligibility: '12th Pass',
            govt: ['Doordarshan', 'Film Division of India'],
            private: ['Animator', 'VFX Artist', 'Video Editor', 'Motion Graphics Designer'],
            higher: ['Advanced VFX', 'Film Direction']
        },
        {
            id: 'game',
            title: 'Game Design & Development',
            desc: 'Focuses on game engines, storytelling, and digital graphics.',
            duration: '3-4 Years',
            eligibility: '12th Pass',
            govt: ['Educational Game Projects'],
            private: ['Game Designer', 'Unity Developer', 'Level Designer'],
            higher: ['MS in Game Design']
        },
        {
            id: 'bfa',
            title: 'Bachelor of Fine Arts (BFA)',
            desc: 'Focuses on painting, sculpture, applied arts, photography.',
            duration: '3-4 Years',
            eligibility: '12th Pass',
            govt: ['Museum Curators', 'Art Teachers'],
            private: ['Professional Artist', 'Illustrator', 'Art Director'],
            higher: ['MFA']
        }
    ],

    // Hospitality
    'hosp': [
        {
            id: 'bhm',
            title: 'Bachelor of Hotel Management (BHM)',
            desc: 'Focuses on hotel operations, food production, hospitality management.',
            duration: '3-4 Years',
            eligibility: '12th Pass',
            govt: ['Tourism Department', 'Railway Catering Services', 'Government Hotels'],
            private: ['Hotel Manager', 'Food & Beverage Manager', 'Cruise Line Staff'],
            higher: ['MBA Hospitality', 'International Hotel Management']
        },
        {
            id: 'avn',
            title: 'BBA / Diploma in Aviation',
            desc: 'Focuses on airport operations, airline services, ground handling.',
            duration: '1-3 Years',
            eligibility: '12th Pass',
            govt: ['AAI (Airports Authority of India) Jobs'],
            private: ['Airport Ground Staff', 'Airline Executive', 'Cabin Crew'],
            higher: ['MBA Aviation']
        },
        {
            id: 'tour',
            title: 'B.A / BBA Travel & Tourism',
            desc: 'Focuses on tourism planning, travel management, tour operations.',
            duration: '3 Years',
            eligibility: '12th Pass',
            govt: ['Ministry of Tourism', 'State Tourism Boards'],
            private: ['Tour Manager', 'Travel Consultant', 'Airline Ticketing'],
            higher: ['MBA Tourism']
        },
        {
            id: 'cul',
            title: 'Culinary Arts / Bakery',
            desc: 'Focuses on cooking, food production, bakery & confectionery.',
            duration: '1-3 Years',
            eligibility: '12th Pass',
            govt: ['Railway Catering'],
            private: ['Chef', 'Pastry Chef', 'Catering Entrepreneur'],
            higher: ['Advanced Culinary Studies']
        }
    ],

    // Govt & Exams
    'gov': [
        {
            id: 'nda',
            title: 'NDA (National Defence Academy)',
            desc: 'Army, Navy, Air Force Officer Training.',
            duration: '3 Years Training + Service',
            eligibility: '12th PCM (Navy/AF), 12th Any (Army)',
            govt: ['Army Officer', 'Naval Officer', 'Air Force Officer'],
            private: ['N/A (Strictly Govt/Defense)'],
            higher: ['Defense Studies, Specialized Military Courses']
        },
        {
            id: 'ssc',
            title: 'SSC Exams (CHSL / MTS)',
            desc: 'Entry-level clerical, data-entry, and support roles in Govt.',
            duration: 'Exam Based',
            eligibility: '12th Pass',
            govt: ['Clerk', 'Data Entry Operator', 'MTS'],
            private: ['N/A'],
            higher: ['Graduation for SSC CGL']
        },
        {
            id: 'rail',
            title: 'Railway Jobs (RRB 12th Level)',
            desc: 'Clerical, typing, and ticketing lines for 12th pass.',
            duration: 'Exam Based',
            eligibility: '12th Pass',
            govt: ['Ticket Clerk', 'Junior Clerk', 'Typist'],
            private: ['N/A'],
            higher: ['Graduation for NTPC Higher Levels']
        },
        {
            id: 'police',
            title: 'State Police Services',
            desc: 'Constable and state police recruitment drives.',
            duration: 'Exam Based',
            eligibility: '12th Pass + Physical Tests',
            govt: ['Constable', 'Armed Forces Reserves'],
            private: ['Security Contract Firms'],
            higher: ['Graduation for Sub-Inspector']
        },
        {
            id: 'tes',
            title: 'Defense Technical Entry (TES)',
            desc: 'Direct Officer entry for Technical roles based on PCM & SSB interview.',
            duration: '4-5 Years Training',
            eligibility: '12th PCM',
            govt: ['Technical Officer (Indian Army)'],
            private: ['N/A'],
            higher: ['Military Technical Programs']
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
