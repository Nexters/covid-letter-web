import {HEADER_POSITION, HEADER_TYPE} from './constants'

export type HeaderType = typeof HEADER_TYPE[keyof typeof HEADER_TYPE]

export type HeaderPosition = typeof HEADER_POSITION[keyof typeof HEADER_POSITION]
