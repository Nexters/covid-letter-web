import {CovidStatResponse} from '$types/response/stat'
import {numberFormat} from '$utils/index'
import {withAxios} from '$utils/fetcher/withAxios'
import styled from '@emotion/styled'
import HomeImage from 'assets/images/HomeImage'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from 'next'
import tw from 'twin.macro'
import AnalyzeSection from '$components/main/AnalyzeSection'
import {PropsFromApp, ValueMap} from '$types/index'
import MyLetterSection from '$components/main/MyLetterSection'
import StatBadge from '$components/main/StatBadge'
import {useAlertStore, useAuthStore} from '$contexts/StoreContext'
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/router'
import ROUTES from '$constants/routes'
import {FontOhsquare} from '$styles/utils/font'
import {FlexStart} from '$styles/utils/layout'
import {MainButton} from '$styles/utils/components'
import useNumberAnimation from '$hooks/useNumberAnimation'
import {animated} from 'react-spring'
import MainLayout from '$components/layout/MainLayout'
import {useEffect} from 'react'
import cookies from 'next-cookies'
import {getIntervalFromTodayToNextday} from '$utils/date'

const Container = styled.div`
    ${tw`tw-bg-beige-300`}
    min-height: 100vh;
    height: 100%;
    padding: ${7.1 + 3.2}rem 2.4rem 3.2rem;
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

const AnimatedSpan = styled(animated.span)`
    ${tw`tw-inline-block`}
`

const Main = ({
    vaccinated, // 2차 접종 완료자 수   <-- 접종 완료율로 변경 필요!!
    vaccinatedPer, // 2차 접종 완료자 수 (전일대비 증감량) <-- 접종 완료율로 변경 필요!!
    confirmed, // 확진자수
    confirmedPer, // 확진자수 (전일대비 증감량)
    cured, // 완치자수
    curedPer, // 완치자수 (전일대비 증감량)
    lettersSend, // 발송된 편지
    lettersPending, // 미발송 편지수
    token,
    isGoogleLogin,
    isMobile,
}: PropsFromApp<InferGetServerSidePropsType<typeof getServerSideProps>>) => {
    const {isLogined, loginUser, clearUser} = useAuthStore()

    useEffect(() => {
        if (token) {
            loginUser()
        } else {
            clearUser()
        }
    }, [token])

    const {confirm} = useAlertStore()
    const router = useRouter()

    const createNewLetter = () => {
        if (!isLogined) {
            confirm({
                title: '앗! 당황했어?',
                message: '이 기능은 로그인을 해야\n사용할 수 있는 기능이야!\n로그인할래?',
                onSuccess: () => {
                    router.push(ROUTES.LOGIN)
                },
                successText: '응, 할래!',
                cancelText: '아니, 안할래',
            })
            return
        }
        router.push(ROUTES.COVID.LETTER.OPTION)
    }

    const transitions = useNumberAnimation(numberFormat(lettersSend + lettersPending))

    return (
        <MainLayout isMobile={isMobile} isGoogleLogin={isGoogleLogin}>
            <Container>
                <TitleContainer>
                    <Title>
                        <Highlight>
                            총{' '}
                            {transitions((props, item) => (
                                <AnimatedSpan style={props}>{item.number}</AnimatedSpan>
                            ))}
                            통
                        </Highlight>
                        의 편지가
                        <br />
                        작성되었어!
                    </Title>
                </TitleContainer>
                <SubTitle>
                    코로나가 끝나는 그 날,
                    <br />
                    마음을 담은 편지를 전달해줄게:)
                </SubTitle>
                <MainImage>
                    <HomeImage />
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
                                <StatBadge type={'blue'} value={vaccinated} change={vaccinatedPer} isIncrease={true} />
                            ),
                        },
                        {
                            title: '총 확진자 수',
                            value: <StatBadge type={'red'} value={confirmed} change={confirmedPer} isIncrease={true} />,
                        },
                        {
                            title: '총 완치자 수',
                            value: <StatBadge type={'green'} value={cured} change={curedPer} isIncrease={true} />,
                        },
                    ]}
                />
                <AnalyzeSection
                    style={{
                        marginTop: '1.6rem',
                    }}
                    title="이만큼 작성됐어!"
                    info={[
                        {
                            title: '미발송 편지',
                            value: <Value>{numberFormat(lettersPending)}</Value>,
                        },
                        {
                            title: '발송된 편지',
                            value: <Value>{numberFormat(lettersSend)}</Value>,
                        },
                    ]}
                />
                <MyLetterSection logined={isLogined} />
            </Container>
        </MainLayout>
    )
}

/**
 *
 * @todo 코로나 통계, 편지 통계 가져올 때 활용
 */
export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    const {covidApiResult} = cookies({req})
    if (covidApiResult) {
        return {
            props: Object.assign({}, covidApiResult as unknown as ValueMap) as CovidStatResponse<string>,
        }
    }
    const stats = await withAxios<CovidStatResponse<string>>({
        url: '/covidstat',
    })

    if (!stats) {
        return {
            props: {} as CovidStatResponse<string>,
            notFound: true,
        }
    }

    const maxAge = getIntervalFromTodayToNextday()

    res?.setHeader('Set-Cookie', `covidApiResult=${JSON.stringify(stats)}; path=/; max-age=${maxAge}`)

    return {
        props: {...stats},
        notFound: false,
    }
}

export default observer(Main)
