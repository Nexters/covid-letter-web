import SvgStampVaccine from '../../assets/stamp/Vaccine'
import SvgStampMaskfree from '../../assets/stamp/Maskfree'
import SvgStampTravel from '../../assets/stamp/Travel'
import SvgStampUnder100 from '../../assets/stamp/Under100'
import SvgStampCovidend from '../../assets/stamp/Covidend'

export const StampFactory = (optionId: number, width = '11.2rem') => {
    switch (optionId) {
        case 1:
            return <SvgStampMaskfree width={width}/>
        case 2:
            return <SvgStampTravel width={width}/>
        case 3:
            return <SvgStampUnder100 width={width}/>
        case 4:
            return <SvgStampVaccine width={width}/>
        case 5:
            return <SvgStampCovidend width={width}/>

        /**
         * <SvgStampNodate /> 추후 날자 미지정 선택 시
         */
    }
}
