import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Button from './Button'

describe('index', () => {
    it('', () => {
        const {container} = render(<Button>click me</Button>)

        screen.getByText('click me')
        expect(container.innerHTML).toBe('<button>click me</button>')
    })
})
