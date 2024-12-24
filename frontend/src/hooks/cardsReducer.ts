export enum CardsActionKind {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  SET_QUANTITY = "SET_QUANTITY",
}

export interface CardsAction {
  type: CardsActionKind;
  payload: PokemonCardType;
}

export interface PokemonCardType {
  id: string;
  name: string;
  information: string;
  imagePath: string;
  quantity: number;
}
export type CardsState = PokemonCardType[];

export function selectedCardsReducer(state: CardsState, action: CardsAction) {
  const { type, payload } = action;
  console.log({ state, type, payload });
  switch (type) {
    case CardsActionKind.INCREASE: {
      const newState = state.map((c) => {
        if (c.id == payload.id) {
          c.quantity += 1;
        }
        return c;
      });
      return newState;
    }
    case CardsActionKind.DECREASE: {
      const newState = state.map((c) => {
        if (c.id == payload.id) {
          const newQuantity = c.quantity - 1;
          c.quantity = newQuantity < 0 ? 0 : newQuantity;
        }
        return c;
      });
      return newState;
    }
    case CardsActionKind.SET_QUANTITY: {
      const newState = state.map((c) => {
        if (c.id == payload.id) {
          c.quantity = payload.quantity;
        }
        return c;
      });
      return newState;
    }
    default:
      return state;
  }
}
