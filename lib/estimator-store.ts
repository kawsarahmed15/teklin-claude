import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ProjectType,
  DesignLevel,
  ComplexityLevel,
  TimelineLevel,
  PlatformLevel,
  EstimateResult,
} from "./pricing/types";

interface EstimatorState {
  currentStep: number;
  direction: number;

  projectType: ProjectType | null;
  selectedFeatures: string[];

  designLevel: DesignLevel;
  complexity: ComplexityLevel;
  timeline: TimelineLevel;
  platform: PlatformLevel | null;

  /** Freeform project description / requirements text */
  requirementText: string;
  requirementFileName: string;

  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
    source: string;
  };
  consentFunctional: boolean;
  consentMarketing: boolean;

  estimateResult: EstimateResult | null;
  aiInsights: string[];
  aiSummary: string;

  setProjectType: (type: ProjectType) => void;
  setFeatures: (features: string[]) => void;
  toggleFeature: (featureId: string) => void;
  setMultiplier: (key: string, value: string) => void;
  setContactField: (field: string, value: string) => void;
  setConsent: (type: "functional" | "marketing", value: boolean) => void;
  setRequirementText: (text: string) => void;
  setRequirementFileName: (name: string) => void;
  setAiInsights: (insights: string[], summary: string) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setEstimateResult: (result: EstimateResult | null) => void;
  reset: () => void;
}

const DEFAULT_STATE = {
  currentStep: 1,
  direction: 1,
  projectType: null as ProjectType | null,
  selectedFeatures: [] as string[],
  designLevel: "template" as DesignLevel,
  complexity: "simple" as ComplexityLevel,
  timeline: "standard" as TimelineLevel,
  platform: null as PlatformLevel | null,
  requirementText: "",
  requirementFileName: "",
  contactInfo: { name: "", email: "", phone: "", company: "", source: "Other" },
  consentFunctional: false,
  consentMarketing: false,
  estimateResult: null as EstimateResult | null,
  aiInsights: [] as string[],
  aiSummary: "",
};

export const useEstimatorStore = create<EstimatorState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,

      setProjectType: (type) => set({ projectType: type }),
      setFeatures: (features) => set({ selectedFeatures: features }),
      toggleFeature: (featureId) =>
        set((state) => ({
          selectedFeatures: state.selectedFeatures.includes(featureId)
            ? state.selectedFeatures.filter((f) => f !== featureId)
            : [...state.selectedFeatures, featureId],
        })),
      setMultiplier: (key, value) => set({ [key]: value } as Partial<EstimatorState>),
      setContactField: (field, value) =>
        set((state) => ({ contactInfo: { ...state.contactInfo, [field]: value } })),
      setConsent: (type, value) =>
        set({ [type === "functional" ? "consentFunctional" : "consentMarketing"]: value }),
      setRequirementText: (text) => set({ requirementText: text }),
      setRequirementFileName: (name) => set({ requirementFileName: name }),
      setAiInsights: (insights, summary) => set({ aiInsights: insights, aiSummary: summary }),
      goToStep: (step) =>
        set((state) => ({
          direction: step > state.currentStep ? 1 : -1,
          currentStep: step,
        })),
      nextStep: () =>
        set((state) => ({ direction: 1, currentStep: Math.min(state.currentStep + 1, 5) })),
      prevStep: () =>
        set((state) => ({ direction: -1, currentStep: Math.max(state.currentStep - 1, 1) })),
      setEstimateResult: (result) => set({ estimateResult: result }),
      reset: () => set(DEFAULT_STATE),
    }),
    {
      name: "teklin-estimator-v2",
      partialize: (state) => ({
        currentStep: state.currentStep,
        projectType: state.projectType,
        selectedFeatures: state.selectedFeatures,
        designLevel: state.designLevel,
        complexity: state.complexity,
        timeline: state.timeline,
        platform: state.platform,
        requirementText: state.requirementText,
        contactInfo: state.contactInfo,
      }),
    }
  )
);
