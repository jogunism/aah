import { create } from 'zustand';
// axios
import axios from 'axios';
// constants
import type { Contactus } from '@/types/constants';

interface ContactUsStore {
  pending: boolean;
  send: (formValues: Contactus) => void;
}

const useContactUsStore = create<ContactUsStore>(set => ({
  pending: false,

  send: async (formValues: Contactus) => {
    set({ pending: true });

    try {
      console.log('Form Values:', formValues);

      const response = await axios.post('http://localhost:8080/contact', formValues);

      console.log(`success!!`);
      console.log(response);
      //
    } catch (error: any) {
      console.error(error.stack);
    }

    set({ pending: false });
  },
}));

export default useContactUsStore;
