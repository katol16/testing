import React from 'react';
import { mount } from 'enzyme';
import CommentBox from '../CommentBox';
import Root from "../../Root";

let wrapped;
beforeEach(()=> {
   wrapped = mount(<Root><CommentBox /></Root>);
});

// afterEach, jest wykonywany po każdym teście
afterEach(()=> {
   wrapped.unmount();
});

it ('has a text area and a two buttons', () => {
    // Pamiętaj, ze Full DOM Rendering, montuje componenty w DOM (Fejkowym DOM na testy)
    // Co spowoduje, ze testy mogą wplynąć na siebie
    // Dlatego trzbea robic maly cleanup i odmonotwanie componentow
    // Pamietaj jeszcze, ze w tym prykaldzie nie musimy uzywac Full DOM rendering, robimy to zeby poakzac jak dziala, ale wystarczyłby Shallow

    // Za pomocą "find" mozemy szukac wielu rzeczy np. suzkać elementów HTML
    // console.log(wrapped.find('textarea').length);
    // console.log(wrapped.find('button').length);

    expect(wrapped.find('textarea').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(2);

});

// Mamy taką sytuację, ze w dwóch poniższy tekstach robimy to samo na początku
// Nie mozmey tego uzyć w beforeEach, bo moze to zakłócić inne testy, w tym pliku
// Dlatego skorzystamy z funkcji describe z JEST. Jest też opcja zrobić to tak, ze wyciagnac to do glboalnej funkcji i z poziomu testu wywołać tę funkcję
// describe function uzywa sie do grupowanie pewnych ustawien pcozatkwoych w konretnych testach
describe('the text area', () => {
    beforeEach(() => {
        wrapped.find('textarea').simulate('change', {
            // ten poniższy obiekt (fake event object) będzie w pewien sposób wsadzony do commentBox, do handleChange
            target: {value: 'new comment - nasz testowy komentarz'}
        });

        // Force the component to update -> Po co?
        // setState spowodouje rerender asynchronicznie, a tutaj jesli wrzucimy nową wartośc w "change" i bedizmey chcieli sprawdzic, czy zostałąa poakzana, to chcemy to zrobic od razu
        // to moze powdowoać problemy, stad ten "Force"
        // zrobimy "Force the component to update" za pomoca update
        wrapped.update();
    });

    it('has a text area that users can type in', () => {

        // To już mamy w describe
        // wrapped.find('textarea').simulate('change', {
        //     target: {value: 'new comment - nasz testowy komentarz'}
        // });
        // wrapped.update();

        // sprawdizmy, czy textarea, przyjął naszą wartość
        expect(wrapped.find("textarea").prop("value")).toEqual('new comment - nasz testowy komentarz');

        // Aby przetestować coś z change eventami (Nasz przykład)
        // Simulating Events:
            // Find the textarea element
            // Simulate a "change" event
            // Provide a fake event object
            // Force the component to update
            // Assert that the textareas value has changed
    });

    it('when form is submitted, text area gets emptied', () => {
        // To już mamy w describe
        // wrapped.find('textarea').simulate('change', {
        //     target: {value: 'new comment - nasz testowy komentarz'}
        // });
        // wrapped.update();

        // Tu jeszcze możemy sprawdzić, czy dostalismy tę nową wartość, żeby nie bylo, ze sprawdzamy czy sie wyczyscila a nigdy nei dostaliśmy jakiejkolwiek wartości (stringa)
        // Ale my sprawdzamy działanie tego w poprzednim teście więc możemy ty wykomentować
        // expect(wrapped.find("textarea").prop("value")).toEqual('new comment');

        // Następnie wysłanie formularza - pamietaj, ze NIE onSubmit, tylko submit
        wrapped.find('form').simulate('submit');

        // Następnie force update (jest o tmy wczesniej)
        wrapped.update();
        // Po tym powinniśmy dostać nową już pustą wartośc w formularzu

        expect(wrapped.find("textarea").prop("value")).toEqual("");

    });

});