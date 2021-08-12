import styled from '@emotion/styled'
import BackSvg from '../../assets/BackSvg'

const BackContainer = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    height: 5.6rem;
    background: #EAE6D7;
    padding: 1.6rem;
`

const Back = () => {

    const handleBack = () => {
        console.log('back button clicked')
    }

    return (
        <BackContainer>
            <button onClick={handleBack}>
                <BackSvg width={'2.4rem'} height={'2.4rem'} />
            </button>
        </BackContainer>
    )
}

export default Back
