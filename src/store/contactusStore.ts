import { create } from 'zustand';
// APIs
import { sendContactUs } from '@/api';
// constants
import type { Contactus } from '@/types/constants';

interface ContactUsStore {
  pending: boolean;
  isSuccess: undefined | boolean;
  send: (formValues: Contactus) => Promise<void>;
  resetSendStatus: () => void;
}

const useContactUsStore = create<ContactUsStore>(set => ({
  pending: false,
  isSuccess: undefined,

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
}));

export default useContactUsStore;
