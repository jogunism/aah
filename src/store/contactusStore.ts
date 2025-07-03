import { create } from 'zustand';
import { TFunction } from 'i18next';

import http from '@lib/http';
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
      const response = await http.post('/contact', formValues);

      toast.success(t('CONTACTUS_SEND_SUCCESS'));
      set({ isSuccess: true });
      //
    } catch (error: any) {
      console.log(error.stack);
      set({ isSuccess: false });
    }

    set({ pending: false });
  },

  resetSendStatus: () => {
    set({ isSuccess: undefined });
  },
}));

export default useContactUsStore;
