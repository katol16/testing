import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';
import CommentBox from "../CommentBox";
import CommentList from "../CommentList";


let wrapped;
// To będzie wykonane przed dwoma poniższymi testami
// Pamietaj, ze wykona sie dwa razy, bo masz dwa testy
// czyli raz przed peirwszym testem a rad przed drugim testem
beforeEach(()=> {
    wrapped = shallow(<App />);
});
// beforeEach bedzie aplikowane do testów któ©e są w tym pliku i do zadnych innych testow poza tym plikiem

it ('shows a comment box', () => {
    // const div = document.createElement('div');
    //
    // ReactDOM.render(<App />, div);

    // Looks instide the div
    // and checks to see if the CommentBox is in there

    // To poniższe rozwiązanie nie jest najlepsze
    // expect(div.innerHTML).toContain('Comment box');
    // Powyzszy przykłąd jest chujowy, bo my nie musimy wiedziec co jest wewnatrz komponentu CommentBox, tylko cchemy wiedziec, ze istnieje
    // To co jest wewnatrz CommentBox, mozmey s[rapawdzic w innym tescie, dotyczacym CommentBoxa

    // To poniższe zrobimy, ale zeby to łatwo zrobić potrzebujemy Enzyme
    // expect(div).toHaveAnInstanceOf(CommentBox);

    // ReactDOM.unmountComponentAtNode(div);

    // Enzyme
    // shallow bedzie renderowac tylko App component, ale nie bedzie renderować dzieci
    // Ale da coś w rodzaju placeholdera na componenty dzieci
    // To ponizej mamy już w beforeEach, wiec mozemy tu wyjebac
    // const wrapped = shallow(<App />);

    expect(wrapped.find(CommentBox).length).toEqual(1);

});

it ('shows a comment list', () => {
    // To ponizej mamy już w beforeEach, wiec mozemy tu wyjebac
    // const wrapped = shallow(<App />);

   expect(wrapped.find(CommentList).length).toEqual(1);
});


// DO CAŁOŚCI
// Testing Design - what do we Care About?
    // App Component
        // Shows the Comment Box inside of it
        // Shows the COmment List inside of it
    // CommentBox Component
        // Shows a text area and a button
        // Users can enter input into the text area
        // When the input is submitted, textarea should get emptied
    // CommentList Component
        // Shows one "li" element per component
        // Text from each comment is visible
    // Comments Reducer
        // Properly hands actions with a type of "SAVE_COMMENT"
        // Dosen't throw an error if it gets an action with any other type
    // SaveComment Action
        // Has a type of "SAVE_COMMENT"
        // Produces an action that has a payload of the new comment's text
