import { useEffect } from 'react';
import { setAuthTokenGetter } from '@workspace/api-client-react';
import { useAdminStore } from '@/stores/adminStore';

export function ApiAuthConfig() {
  const { token } = useAdminStore();

  useEffect(() => {
    setAuthTokenGetter(() => token);
  }, [token]);

  return null;
}
