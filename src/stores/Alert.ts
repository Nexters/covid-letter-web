/* eslint-disable @typescript-eslint/no-unused-expressions */
import {noop} from '$utils/index'
import React from 'react'

export interface Alert {
    type: AlertType | null
    title: string
    message: string
    successText: string
    onSuccess: (e?: React.SyntheticEvent) => void
    cancelText: string
    onCancel: (e?: React.SyntheticEvent) => void
    onOpen: () => void
    onClose: (e?: React.SyntheticEvent) => void
}

export interface AlertState extends Alert {
    isShow: boolean
    close: (e: React.SyntheticEvent) => void
    alert: (args: Partial<Alert>) => void
    confirm: (args: Partial<Alert>) => void
}

export const ALERT_TYPE = {
    ALERT: 'ALERT',
    CONFIRM: 'CONFIRM',
} as const

export type AlertType = typeof ALERT_TYPE[keyof typeof ALERT_TYPE]

const createAlert = (): AlertState => {
    return {
        type: null,
        isShow: false,
        title: '',
        message: '',
        successText: '확인',
        onSuccess: () => {},
        cancelText: '취소',
        onCancel: () => {},
        onOpen: () => {},
        onClose: () => {},

        close(e: React.SyntheticEvent) {
            this.onClose(e)
            this.isShow = false
        },

        alert({title, message, successText, onSuccess, onOpen, onClose}) {
            onOpen && onOpen()

            this.type = ALERT_TYPE.ALERT
            this.isShow = true
            this.title = title || ''
            this.message = message || ''
            this.successText = successText || '확인'
            this.onSuccess = onSuccess || noop
            this.onClose = onClose || noop
        },
        confirm({title, message, successText, onSuccess, cancelText, onCancel, onOpen, onClose}) {
            onOpen && onOpen()

            this.type = ALERT_TYPE.CONFIRM
            this.isShow = true
            this.title = title || ''
            this.message = message || ''
            this.successText = successText || '확인'
            this.onSuccess = onSuccess || noop
            this.cancelText = cancelText || '취소'
            this.onCancel = onCancel || noop
            this.onClose = onClose || noop
        },
    }
}

export {createAlert}
