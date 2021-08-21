import {Letter} from '$types/response/letter'

type EnvelopeProps = {
    letter: Letter
    name: string,
    email: string,
}

const Envelope = ({letter, name = '', email = ''}: EnvelopeProps) => {
    const {encryptedId, title, sticker, sendOptionText, state, createdDate} = letter;

    return (
        <>
            {encryptedId}
            {title}
            {sticker}
            {sendOptionText}
            {state}
            {createdDate}

            {name}
            {email}
        </>
    )
}

export default Envelope
