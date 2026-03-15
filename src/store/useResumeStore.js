import { create } from 'zustand';

const initialResumeState = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedinUrl: '',
        portfolioUrl: '',
        summary: '',
    },
    education: [],
    experience: [],
    skills: {
        technical: [],
        soft: [],
        tools: []
    },
    projects: [],
    certifications: [],
    achievements: [],
    selectedTemplate: 'ats-minimal'
};

const useResumeStore = create((set) => ({
    resumeData: initialResumeState,

    updatePersonalInfo: (data) => set((state) => ({
        resumeData: { ...state.resumeData, personalInfo: { ...state.resumeData.personalInfo, ...data } }
    })),

    addEducation: (educationObj) => set((state) => ({
        resumeData: { ...state.resumeData, education: [...state.resumeData.education, educationObj] }
    })),

    updateEducation: (index, educationObj) => set((state) => {
        const newEd = [...state.resumeData.education];
        newEd[index] = educationObj;
        return { resumeData: { ...state.resumeData, education: newEd } };
    }),

    removeEducation: (index) => set((state) => {
        const newEd = [...state.resumeData.education];
        newEd.splice(index, 1);
        return { resumeData: { ...state.resumeData, education: newEd } };
    }),

    addExperience: (expObj) => set((state) => ({
        resumeData: { ...state.resumeData, experience: [...state.resumeData.experience, expObj] }
    })),

    updateExperience: (index, expObj) => set((state) => {
        const newExp = [...state.resumeData.experience];
        newExp[index] = expObj;
        return { resumeData: { ...state.resumeData, experience: newExp } };
    }),

    removeExperience: (index) => set((state) => {
        const newExp = [...state.resumeData.experience];
        newExp.splice(index, 1);
        return { resumeData: { ...state.resumeData, experience: newExp } };
    }),

    updateSkills: (skillsObj) => set((state) => ({
        resumeData: { ...state.resumeData, skills: { ...state.resumeData.skills, ...skillsObj } }
    })),

    addProject: (projObj) => set((state) => ({
        resumeData: { ...state.resumeData, projects: [...state.resumeData.projects, projObj] }
    })),

    updateProject: (index, projObj) => set((state) => {
        const newProj = [...state.resumeData.projects];
        newProj[index] = projObj;
        return { resumeData: { ...state.resumeData, projects: newProj } };
    }),

    removeProject: (index) => set((state) => {
        const newProj = [...state.resumeData.projects];
        newProj.splice(index, 1);
        return { resumeData: { ...state.resumeData, projects: newProj } };
    }),

    setTemplate: (templateId) => set((state) => ({
        resumeData: { ...state.resumeData, selectedTemplate: templateId }
    })),

    resetResume: () => set(() => ({
        resumeData: initialResumeState
    }))
}));

export default useResumeStore;
