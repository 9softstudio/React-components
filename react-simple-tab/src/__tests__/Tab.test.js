import React from 'react'
import renderer from 'react-test-renderer'

import Tab from '../Tab'

const defaultProps = {
    label: ""
}

describe('render', () => {
    it('content match with snapshot', () => {
        const element = renderer.create(<Tab {...defaultProps} />);

        const result = element.toJSON();

        expect(result).toMatchSnapshot();
    })
})