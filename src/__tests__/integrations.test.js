import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from '../Root';
import App from "../components/App";

beforeEach(() => {
    // włączenia moxiosa
    moxios.install();
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [{ name: 'Fetched #1'}, {name: 'Fetched #2'}]
    })
});

afterEach(() => {
    moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
    // Attempt to render the *entire* app
    const wrapped = mount(
      <Root>
          <App/>
      </Root>
    );

    // find the "fetchComments" button and click it
    wrapped.find('.fetch-comments').simulate('click');

    // Introduce a TINY little pause
    // setTimeout(() => {
    //     // trzeba zrobic update, zebysmy dostali naszą listę po update
    //     wrapped.update();
    //
    //     expect(wrapped.find('li').length).toEqual(2);
    //
    //     // w setTimeout z JEST, jest troche inaczaj.
    //     // Musimy powiedzieć JEST, ze musi poczekać, zanim uzna, ze test został spełniony
    //     // zrobimy to w callbacku jako "done" i poniżej
    //     done();
    //
    //     // cleanup
    //     wrapped.unmount();
    // }, 100);

    // Introduce a TINY little pause with moxios (better solution)
    moxios.wait(() => {
        // trzeba zrobic update, zebysmy dostali naszą listę po update
        wrapped.update();

        expect(wrapped.find('li').length).toEqual(2);

        // w setTimeout z JEST, jest troche inaczaj.
        // Musimy powiedzieć JEST, ze musi poczekać, zanim uzna, ze test został spełniony
        // zrobimy to w callbacku jako "done" i poniżej
        done();

        // cleanup
        wrapped.unmount();
    });


    // Expect to find a list od comments!
    // Uwaga to poniższe bez moxiosa nie zadziała
    // ponieważ w środowisku testowym używamy, fake Browser API, a z tego fake Browser API, nie mozµey robić requestow z outside
    // wlansi ten problem rozwiąze nam moxios
    // expect(wrapped.find('li').length).toEqual(2);
});