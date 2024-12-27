import { CardResponse } from "@/app/api/my-collection/route";

export enum CardsActionKind {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  SET_QUANTITY = "SET_QUANTITY",
  SET_STATE = "SET_STATE",
}

export interface CardsAction {
  type: CardsActionKind;
  payload: CardResponse;
}
export type Action =
  | {
      type:
        | CardsActionKind.INCREASE
        | CardsActionKind.DECREASE
        | CardsActionKind.SET_QUANTITY;
      payload: CardResponse;
    }
  | {
      type: CardsActionKind.SET_STATE;
      payload: CardResponse[];
    };

export function selectedCardsReducer(state: CardResponse[], action: Action) {
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
    case CardsActionKind.SET_STATE: {
      return payload;
    }
    default:
      return state;
  }
}
