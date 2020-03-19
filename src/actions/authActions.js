export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export const setUser = (authedEmail) => ({
  type: SET_USER,
  payload: { authedEmail }
});

export const unsetUser = () => ({
  type: UNSET_USER,
});
