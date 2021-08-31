import React from 'react';
import Card from './Card';
import { data } from '../../../../public/assets/data.json'
import { render } from '@testing-library/react';

describe('Test for Card component', () => {
    let component;
    let vote=false
    beforeEach(() => {
         vote=false
    })
    test('should load component Card sort list ', () => {
        component = render(<Card person={data[0]} sort="list" changeVotes={changeVotes}></Card>);
        expect(component).toMatchSnapshot();
    });
    test('should load component Card  sort grid', () => {
        component = render(<Card person={data[3]} sort="grid" changeVotes={changeVotes}></Card>);
        expect(component).toMatchSnapshot();
    });
    test('should load call change votes positive', () => {
        component = render(<Card person={data[2]} sort="grid" changeVotes={changeVotes}></Card>);
        component.container.querySelector(".buttons div").click()
        component.container.querySelector(".buttons button").click()
        component.container.querySelector(".buttons button").click()
        expect(vote).toBe(true);
    });
    test('should load call change votes negative', () => {
        component = render(<Card person={data[5]} sort="list" changeVotes={changeVotes}></Card>);
        component.container.querySelectorAll(".buttons div")[2].click()
        component.container.querySelector(".buttons button").click()
        expect(vote).toBe(true);
    });
    const changeVotes=() => {
        vote=true
    }

})