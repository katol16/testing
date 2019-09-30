import { saveComment} from "../index";
import { SAVE_COMMENT} from "../types";

describe('saveComment', () => {
   it('has the correct type', () => {
       const action = saveComment();

       expect(action.type).toEqual(SAVE_COMMENT);
   });

   it('has a correct payload', () => {
        const action = saveComment('New comment');

        expect(action.payload).toEqual('New comment');
   });
});