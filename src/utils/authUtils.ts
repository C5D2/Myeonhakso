import useUserStore from '@/zustand/userStore';

export function GetAuthInfo() {
  const user = useUserStore(state => state.user);
  const accessToken = user?.accessToken;
  return { user, accessToken };
}
