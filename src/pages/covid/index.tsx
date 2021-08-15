import {useState} from 'react'
import MainHeader from '$components/header'
import {CovidStats, LetterStats} from '$types/response/stat'
import {numberFormat} from '$utils/index'
import {withAxios} from '$utils/fetcher/withAxios'
import styled from '@emotion/styled'
import SvgHome from 'assets/HomeImage'
import {InferGetServerSidePropsType} from 'next'
import tw from 'twin.macro'
import AnalyzeSection from '$components/main/AnalyzeSection'
import {PropsFromApp} from '$types/index'
import MyLetterSection from '$components/main/MyLetterSection'
import StatBadge from '$components/main/StatBadge'
import useLogout from '$hooks/useLogout'
import {useAlertStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/router'
import ROUTES from '$constants/routes'
import toast from '$components/toast'
import {FontOhsquare, FontOhsquareAir} from '$styles/utils/font'
import {FlexStart} from '$styles/utils/layout'
import {MainButton} from '$styles/utils/components'

const Container = styled.div`
    ${tw`tw-bg-beige-300`}
    min-height: 100vh;
    height: 100%;
    padding: 3.2rem 2.4rem;
`

const TitleContainer = styled.div`
    ${FontOhsquare}
    ${FlexStart}
    ${tw`tw-text-left tw-text-xl tw-text-primary-green-500`}
`

const Title = styled.span``

const Highlight = styled.span`
    ${tw`tw-text-primary-green-500`}
    background-image: linear-gradient(1turn, #DCAE5C, #DCAE5C 8px, transparent 0, transparent);
`

const SubTitle = styled.div`
    ${FontOhsquareAir}
    ${FlexStart}
    ${tw`tw-text-left tw-text-base tw-text-grey-700`}
    margin-top: 1.2rem;
`

const MainImage = styled.div`
    ${tw`tw-flex tw-text-right tw-flex-1 tw-justify-end tw-items-center`}
    margin-top: 1.2rem;
`

const LetterButton = styled(MainButton)`
    ${tw`tw-w-full`}
    margin-top: 2.4rem;
    padding: 1.35rem 0;
    border-radius: 0.4rem;
`

const Value = styled.div`
    ${FontOhsquare}
    ${tw`tw-text-primary-green-500 tw-text-base`}
    padding-top: .4rem;
`

const Main = ({
    confirmedCase,
    confirmedIncrease,
    completeCure,
    cureIncrease,
    completeShot,
    shotRate,
    unsented,
    sented,
    token,
    isGoogleLogin,
    isMobile,
}: PropsFromApp<InferGetServerSidePropsType<typeof getServerSideProps>>) => {
    const [isLogined, setIsLogined] = useState(!!token)

    const logout = useLogout(isGoogleLogin)
    const {confirm, alert} = useAlertStore()
    const router = useRouter()

    const logoutPage = () => {
        logout()
        setIsLogined(false)
        if (!isMobile) {
            alert({
                title: '로그아웃되었습니다.',
            })
        } else {
            toast('로그아웃되었습니다.', 1500)
        }
    }

    const createNewLetter = () => {
        if (!isLogined) {
            confirm({
                title: '앗! 당황하셨죠?',
                message: '이 기능은 로그인을 해야\n사용할 수 있는 기능입니다.\n로그인 하시겠어요?',
                onSuccess: () => {
                    router.push(ROUTES.LOGIN)
                },
                successText: '네.할래요!',
                cancelText: '아니요.안할래요',
            })
        }
    }

    return (
        <>
            <MainHeader logined={isLogined} logout={logoutPage} />
            <Container>
                <TitleContainer>
                    <Title>
                        <Highlight>총 {numberFormat(unsented + sented)}통</Highlight>의 편지가
                        <br />
                        작성되었어요.
                    </Title>
                </TitleContainer>
                <SubTitle>
                    코로나가 끝나는 그 날,
                    <br />
                    마음을 담은 편지를 전달해줄게요.
                </SubTitle>
                <MainImage>
                    <SvgHome />
                </MainImage>
                <LetterButton onClick={createNewLetter}>편지 작성</LetterButton>
                <AnalyzeSection
                    style={{
                        marginTop: '3.2rem',
                    }}
                    title="현재 우리나라는..."
                    info={[
                        {
                            title: '접종 완료율',
                            value: (
                                <StatBadge
                                    type={'blue'}
                                    value={`${completeShot}%`}
                                    change={`${shotRate}%`}
                                    isIncrease={true}
                                />
                            ),
                        },
                        {
                            title: '총 확진자 수',
                            value: (
                                <StatBadge
                                    type={'red'}
                                    value={numberFormat(confirmedCase)}
                                    change={numberFormat(confirmedIncrease)}
                                    isIncrease={true}
                                />
                            ),
                        },
                        {
                            title: '총 완치자 수',
                            value: (
                                <StatBadge
                                    type={'green'}
                                    value={numberFormat(completeCure)}
                                    change={numberFormat(cureIncrease)}
                                    isIncrease={true}
                                />
                            ),
                        },
                    ]}
                />
                <AnalyzeSection
                    style={{
                        marginTop: '1.6rem',
                    }}
                    title="이만큼 작성됐어요"
                    info={[
                        {
                            title: '미발송 편지',
                            value: <Value>{numberFormat(unsented)}</Value>,
                        },
                        {
                            title: '발송된 편지',
                            value: <Value>{numberFormat(sented)}</Value>,
                        },
                    ]}
                />
                <MyLetterSection logined={isLogined} />
            </Container>
        </>
    )
}

/**
 *
 * @todo 코로나 통계, 편지 통계 가져올 때 활용
 */
export async function getServerSideProps() {
    const covidStats = await withAxios<CovidStats>({
        url: '/covid/stats',
    })

    const letterStats = await withAxios<LetterStats>({
        url: '/letter/stats',
    })

    if (!covidStats || !letterStats) {
        return {
            props: {} as CovidStats & LetterStats,
            notFound: true,
        }
    }

    return {
        props: {...covidStats, ...letterStats},
        notFound: false,
    }
}

export default observer(Main)
