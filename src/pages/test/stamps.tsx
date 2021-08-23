import SvgStampCovidend from '$assets/stamp/Covidend'
import SvgStampMaskfree from '$assets/stamp/Maskfree'
import SvgStampNodate from '$assets/stamp/Nodate'
import SvgStampTravel from '$assets/stamp/Travel'
import SvgStampUnder100 from '$assets/stamp/Under100'
import SvgStampVaccine from '$assets/stamp/Vaccine'

const Stamps = () => {
    return (
        <>
            <SvgStampCovidend width={'5rem'} />
            <br />
            <SvgStampMaskfree width={'5rem'} />
            <br />
            <SvgStampNodate width={'5rem'} />
            <br />
            <SvgStampTravel width={'5rem'} />
            <br />
            <SvgStampUnder100 width={'5rem'} />
            <br />
            <SvgStampVaccine width={'5rem'} />
        </>
    )
}

export default Stamps
