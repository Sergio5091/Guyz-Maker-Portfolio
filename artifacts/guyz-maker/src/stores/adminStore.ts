import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Admin {
  email: string;
}

interface AdminStore {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, token: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set: any) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      login: (email: string, token: string) =>
        set({
          admin: { email },
          token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          admin: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'admin-storage',
    }
  )
);
