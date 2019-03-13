import React from 'react'
import Row from '../Row'
import Cell from '../Cell'
import renderer from 'react-test-renderer'

test('Row component render correctly', () => {
    const row = renderer.create(
        <Row>
            <td>Cell 1</td>
            <td>Cell 2</td>
        </Row>
    )

    const tree = row.toJSON();

    expect(tree).toMatchSnapshot();
})

test('Row component render correctly with Cell component', () => {
    const row = renderer.create(
        <Row>
            <Cell>Cell 1</Cell>
            <Cell>Cell 2</Cell>
        </Row>
    )

    const tree = row.toJSON();

    expect(tree).toMatchSnapshot();
})