
export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});


export const logoutUser = () => ({
  type: 'LOGOUT_USER',
});


export const addReport = (report) => ({
  type: 'ADD_REPORT',
  payload: report,
});


export const deleteReport = (reportId) => ({
  type: 'DELETE_REPORT',
  payload: reportId,
});


export const updateReport = (report) => ({
  type: 'UPDATE_REPORT',
  payload: report,
});
