const initialState = {
  reports: [],
};

export const ReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REPORT':
      return {
        ...state,
        reports: [...state.reports, action.payload],
      };
    case 'UPDATE_REPORT':
      return {
        ...state,
        reports: state.reports.map(report =>
          report.id === action.payload.id ? action.payload : report
        ),
      };
    case 'DELETE_REPORT':
      return {
        ...state,
        reports: state.reports.filter(report => report.id !== action.payload),
      };
    default:
      return state;
  }
};
