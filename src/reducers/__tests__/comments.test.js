import commentsReducer from "../comments";
import { SAVE_COMMENT } from "../../actions/types";

it('handle actions of type SAVE_COMMENT', () => {
    const action = {
      type: SAVE_COMMENT,
      payload: 'New comment'
    };

    const newState = commentsReducer([], action);

    expect(newState).toEqual(['New comment']);
});

it('handles action with unknown type', () => {
    // jako akcje przekauzjemy {}, mzomey też dać jakis zjebany string, ktorego nie mmay jako akcja
    const newState = commentsReducer([], { type: 'CHUJOWYTYP'});

    // spodziewamy sie psutego statea, bo typ ma byc zjebany, wiec nic ma nie dodac
    expect(newState).toEqual([]);
});