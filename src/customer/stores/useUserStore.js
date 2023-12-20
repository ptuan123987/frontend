import { create } from 'zustand';

const useUserStore = create((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
  getInitials: () => {
    const fullName = useUserStore.getState().userData?.display_name || '';
    return fullName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  },
}));

export default useUserStore;