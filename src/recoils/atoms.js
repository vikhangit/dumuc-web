import { recoilPersist } from 'recoil-persist'
import {atom} from 'recoil';
const { persistAtom } = recoilPersist();

//fe
export const userAtom = atom({
  key: 'user',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const bookingAtom = atom({
  key: 'booking',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

//dashboard
export const adminAtom = atom({
  key: 'admin',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const tenantAtom = atom({
  key: 'tenant',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const localeAtom = atom({
  key: 'locale',
  default: null,
  effects_UNSTABLE: [persistAtom],
});




