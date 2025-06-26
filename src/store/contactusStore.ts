import { create } from 'zustand';
import axios from 'axios';
import { TFunction } from 'i18next';
// toast
import { toast } from '@lib/toast';
// constants
import type { Contactus } from '@/types/constants';

interface ContactUsStore {
  pending: boolean;
  isSuccess: boolean;
  send: (formValues: Contactus, t: TFunction) => Promise<void>;
  resetSendStatus: () => void;
}

const useContactUsStore = create<ContactUsStore>(set => ({
  pending: false,
  isSuccess: false,

  send: async (formValues: Contactus, t: TFunction) => {
    set({ pending: true });

    try {
      // console.log('Form Values:', formValues);
      const response = await axios.post('http://localhost:8080/contact', formValues);

      toast.success(t('CONTACTUS_SEND_SUCCESS'));
      //
    } catch (error: any) {
      console.error(error.stack);
    }

    set({ pending: false });
  },

  resetSendStatus: () => {
    set({ isSuccess: false });
  },
}));

export default useContactUsStore;
