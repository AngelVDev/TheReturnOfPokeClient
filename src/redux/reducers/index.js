const initialState = {
  pokes: [], //copia burda para hacerle magia
  allPokes: [],
  types: [],
  pokeDetail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKES":
      return {
        ...state,
        pokes: action.payload,
        allPokes: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_QUERY":
      return {
        ...state,
        allPokes: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        pokeDetail: action.payload,
      };
    case "FILTER_SOURCE":
      const copy = [...state.pokes];
      const bySource =
        action.payload === "MIXED"
          ? copy
          : action.payload === "DB"
          ? state.pokes.filter((el) => el.createdInDb)
          : state.pokes.filter((el) => !el.createdInDb);
      return {
        ...state,
        allPokes: bySource,
      };
    case "SORT_POKEATK":
      const falsePoke = [...state.pokes];
      const sortATK =
        action.payload === "LOW"
          ? state.pokes.slice().sort((a, b) => {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : action.payload === "HI"
          ? state.pokes.slice().sort((a, b) => {
              if (a.attack > b.attack) {
                return -1;
              }
              if (a.attack > b.attack) {
                return 1;
              }
              return 0;
            })
          : falsePoke;
      return {
        ...state,
        allPokes: sortATK,
      };
    case "SORT_POKEDEF":
      const defCopyPoke = [...state.pokes];
      const sortDEF =
        action.payload === "LOW"
          ? state.pokes.slice().sort((a, b) => {
              if (a.defense > b.defense) {
                return 1;
              }
              if (b.defense > a.defense) {
                return -1;
              }
              return 0;
            })
          : action.payload === "HI"
          ? state.pokes.slice().sort((a, b) => {
              if (a.defense > b.defense) {
                return -1;
              }
              if (a.defense > b.defense) {
                return 1;
              }
              return 0;
            })
          : defCopyPoke;
      return {
        ...state,
        allPokes: sortDEF,
      };
    case "SORT_POKESPD":
      const spdCopyPoke = [...state.pokes];
      const sortSPD =
        action.payload === "LOW"
          ? state.pokes.slice().sort((a, b) => {
              if (a.speed > b.speed) {
                return 1;
              }
              if (b.speed > a.speed) {
                return -1;
              }
              return 0;
            })
          : action.payload === "HI"
          ? state.pokes.slice().sort((a, b) => {
              if (a.speed > b.speed) {
                return -1;
              }
              if (a.speed > b.speed) {
                return 1;
              }
              return 0;
            })
          : spdCopyPoke;
      return {
        ...state,
        allPokes: sortSPD,
      };
    case "SORT_POKENAME":
      const sorted =
        action.payload === "ASC"
          ? state.pokes.slice().sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === "DSC"
          ? state.pokes.slice().sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          : state.pokes;
      return {
        ...state,
        allPokes: sorted,
      };
    case "FILTER_TYPES":
      const copeePokes = [...state.pokes];

      const filteredByType =
        action.payload === "ALL"
          ? copeePokes
          : state.pokes.filter((pk) =>
              pk.types.find((t) => t.name === action.payload)
            );
      return {
        ...state,
        allPokes: filteredByType,
      };
    case "POST_POKE":
      return {
        ...state,
      };
    case "DELETE_BY_ID":
      return {
        ...state,
      };
    case "CLEAR":
      return {
        ...state,
        pokeDetail: {},
      };
    default:
      return {
        ...state,
      };
  }
}
export default rootReducer;
