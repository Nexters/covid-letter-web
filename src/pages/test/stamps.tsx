import SvgStampCovidend from '../../assets/stamp/covidend'
import SvgStampMaskfree from '../../assets/stamp/maskfree'
import SvgStampNodate from '../../assets/stamp/nodate'
import SvgStampTravel from '../../assets/stamp/travel'
import SvgStampUnder100 from '../../assets/stamp/under100'
import SvgStampVaccine from '../../assets/stamp/vaccine'

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
