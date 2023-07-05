// let initialState = {
//   dogs: []
// };

// export default function rootReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'Obt_Dog':
//       return {
//         ...state,
//         dogs: action.payload 
//       };
//     case 'Search':
//       return {
//         ...state,
//         dogs: action.payload 
//       };
//     default:
//       return state; 
//   }
// }
let initialState = {
  dogs: [],
  detail: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'Obt_Dog':
      return {
        ...state,
        dogs: action.payload 
      };
    case 'Search':
      return {
        ...state,
        dogs: action.payload 
      };
    case 'Details':
      return {
        ...state,
        detail: action.payload 
      };
    case 'Post_Dog':
      return {
        ...state,
        dogs: action.payload 
      };
    default:
      return state; 
  }
}

