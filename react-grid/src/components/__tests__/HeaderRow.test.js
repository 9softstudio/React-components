import React from 'react'
import HeaderRow from '../HeaderRow'
import HeaderCell from '../HeaderCell'
import ShallowRenderer from 'react-test-renderer/shallow'

test('HeaderRow component render correctly', () => {
    const renderer = new ShallowRenderer();

    const header = renderer.render(
        <HeaderRow sortBy='Cell1' sortOrder='asc'>
            <HeaderCell sortBy='Cell1'>Cell 1</HeaderCell>
            <HeaderCell>Cell 2</HeaderCell>
        </HeaderRow>
    );

    expect(header).toMatchSnapshot();
})