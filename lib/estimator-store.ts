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
  startDate: string;
  currentStage: string;

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

  setProjectType: (type: ProjectType) => void;
  setFeatures: (features: string[]) => void;
  toggleFeature: (featureId: string) => void;
  setMultiplier: (key: string, value: string) => void;
  setContactField: (field: string, value: string) => void;
  setConsent: (type: "functional" | "marketing", value: boolean) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setEstimateResult: (result: EstimateResult | null) => void;
  reset: () => void;
}

export const useEstimatorStore = create<EstimatorState>()(
  persist(
    (set) => ({
      currentStep: 1,
      direction: 1,

      projectType: null,
      selectedFeatures: [],

      designLevel: "template",
      complexity: "simple",
      timeline: "standard",
      platform: null,
      startDate: "1-3-months",
      currentStage: "Just an idea",

      contactInfo: {
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "Other",
      },
      consentFunctional: false,
      consentMarketing: false,

      estimateResult: null,

      setProjectType: (type) => set({ projectType: type }),
      setFeatures: (features: string[]) => set({ selectedFeatures: features }),
      toggleFeature: (featureId) =>
        set((state) => ({
          selectedFeatures: state.selectedFeatures.includes(featureId)
            ? state.selectedFeatures.filter((f) => f !== featureId)
            : [...state.selectedFeatures, featureId],
        })),
      setMultiplier: (key, value) => set({ [key]: value }),
      setContactField: (field, value) =>
        set((state) => ({
          contactInfo: { ...state.contactInfo, [field]: value },
        })),
      setConsent: (type, value) =>
        set((state) => ({
          [type === "functional" ? "consentFunctional" : "consentMarketing"]: value,
        })),
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
      reset: () =>
        set({
          currentStep: 1,
          direction: 1,
          projectType: null,
          selectedFeatures: [],
          estimateResult: null,
        }),
    }),
    {
      name: "teklin-estimator-v1",
      partialize: (state) => ({
        // persisting important state
        currentStep: state.currentStep,
        projectType: state.projectType,
        selectedFeatures: state.selectedFeatures,
        designLevel: state.designLevel,
        complexity: state.complexity,
        timeline: state.timeline,
        platform: state.platform,
        contactInfo: state.contactInfo,
      }),
    }
  )
);
