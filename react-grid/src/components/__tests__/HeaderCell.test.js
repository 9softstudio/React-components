import React from 'react'
import HeaderCell from '../HeaderCell'
import ShallowRenderer from 'react-test-renderer/shallow'

test('sortable HeaderCell render correctly', () => {
    const renderer = new ShallowRenderer();

    const cell = renderer.render(
        <HeaderCell sortBy='Cell1' sortOrder='asc' colWidth='200' anotherProp='test'>Cell 1</HeaderCell>
    );

    expect(cell).toMatchSnapshot();
})

test('unsortable HeaderCell render correctly', () => {
    const renderer = new ShallowRenderer();

    const cell = renderer.render(
        <HeaderCell colWidth='200' anotherProp='test'>Cell 1</HeaderCell>
    );

    expect(cell).toMatchSnapshot();
})