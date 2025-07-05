import { create } from 'zustand';
import { TFunction } from 'i18next';
// APIs
import { sendContactUs } from '@/api';
// toast
import { toast } from '@lib/toast';
// constants
import type { Contactus } from '@/types/constants';

interface ContactUsStore {
  pending: boolean;
  isSuccess: undefined | boolean;
  send: (formValues: Contactus, t: TFunction) => Promise<void>;
  resetSendStatus: () => void;
}

const useContactUsStore = create<ContactUsStore>(set => ({
  pending: false,
  isSuccess: undefined,

  send: async (formValues: Contactus, t: TFunction) => {
    set({ pending: true });

    try {
      // await http.post('/contact', formValues);
      await sendContactUs(formValues);

      toast.success(t('CONTACTUS_SEND_SUCCESS'));
      set({ isSuccess: true });
      //
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
