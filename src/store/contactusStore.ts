import { create } from 'zustand';
// APIs
import { sendContactUs } from '@/api';
// constants
import type { Contactus } from '@/types/constants';

/**
 * Values pushed into the contact form from elsewhere (e.g. the tuition calculator).
 * `id` changes on every request so the form re-applies it even if the text is the same.
 */
export interface ContactPrefill {
  id: number;
  semester: number; // 0 = short-term, 1 = long-term (same as the program dropdown)
  content: string;
}

interface ContactUsStore {
  pending: boolean;
  isSuccess: undefined | boolean;
  prefill: ContactPrefill | null;
  send: (formValues: Contactus) => Promise<void>;
  resetSendStatus: () => void;
  requestPrefill: (values: Omit<ContactPrefill, 'id'>) => void;
  clearPrefill: () => void;
}

const useContactUsStore = create<ContactUsStore>(set => ({
  pending: false,
  isSuccess: undefined,
  prefill: null,

  send: async (formValues: Contactus) => {
    set({ pending: true });

    try {
      await sendContactUs(formValues);
      set({ isSuccess: true });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.stack);
      }
      set({ isSuccess: false });
    }

    set({ pending: false });
  },

  resetSendStatus: () => {
    set({ isSuccess: undefined });
  },

  requestPrefill: values => {
    set({ prefill: { ...values, id: Date.now() } });
  },

  clearPrefill: () => {
    set({ prefill: null });
  },
}));

export default useContactUsStore;
