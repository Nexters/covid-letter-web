import {CovidStatResponse} from '$types/response/stat'
import {numberFormat} from '$utils/index'
import {withAxios} from '$utils/fetcher/withAxios'
import styled from '@emotion/styled'
import HomeImage from 'assets/images/HomeImage'
import {InferGetServerSidePropsType} from 'next'
import tw from 'twin.macro'
import AnalyzeSection from '$components/main/AnalyzeSection'
import {PropsFromApp} from '$types/index'
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
    vaccinated, // 2??? ?????? ?????????
    vaccinatedPer, // 2??? ?????? ????????? (???????????? ?????????)
    confirmed, // ????????????
    confirmedPer, // ???????????? (???????????? ?????????)
    cured, // ????????????
    curedPer, // ???????????? (???????????? ?????????)
    lettersSend, // ????????? ??????
    lettersPending, // ????????? ?????????
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
                title: '???! ?????????????',
                message: '??? ????????? ???????????? ??????\n????????? ??? ?????? ????????????!\n????????????????',
                onSuccess: () => {
                    router.push(ROUTES.LOGIN)
                },
                successText: '???, ??????!',
                cancelText: '??????, ?????????',
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
                            ???{' '}
                            {transitions((props, item) => (
                                <AnimatedSpan style={props}>{item.number}</AnimatedSpan>
                            ))}
                            ???
                        </Highlight>
                        ??? ?????????
                        <br />
                        ???????????????!
                    </Title>
                </TitleContainer>
                <SubTitle>
                    ???????????? ????????? ??? ???,
                    <br />
                    ????????? ?????? ????????? ???????????????:)
                </SubTitle>
                <MainImage>
                    <HomeImage />
                </MainImage>
                <LetterButton onClick={createNewLetter}>?????? ??????</LetterButton>
                <AnalyzeSection
                    style={{
                        marginTop: '3.2rem',
                    }}
                    title="?????? ???????????????..."
                    info={[
                        {
                            title: '?????? ?????????',
                            value: (
                                <StatBadge
                                    type={'blue'}
                                    value={`${vaccinated}%`}
                                    change={`${vaccinatedPer}%`}
                                    isIncrease={true}
                                />
                            ),
                        },
                        {
                            title: '??? ????????? ???',
                            value: <StatBadge type={'red'} value={confirmed} change={confirmedPer} isIncrease={true} />,
                        },
                        {
                            title: '??? ????????? ???',
                            value: <StatBadge type={'green'} value={cured} change={curedPer} isIncrease={true} />,
                        },
                    ]}
                />
                <AnalyzeSection
                    style={{
                        marginTop: '1.6rem',
                    }}
                    title="????????? ????????????!"
                    info={[
                        {
                            title: '????????? ??????',
                            value: <Value>{numberFormat(lettersPending)}</Value>,
                        },
                        {
                            title: '????????? ??????',
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
 * @todo ????????? ??????, ?????? ?????? ????????? ??? ??????
 */
export async function getServerSideProps() {
    /**
     * @deprecated ????????? ????????? ????????? ???????????? ??????
     */
    // const {covidApiResult} = cookies({req})
    // if (covidApiResult) {
    //     return {
    //         props: Object.assign({}, covidApiResult as unknown as ValueMap) as CovidStatResponse,
    //     }
    // }

    const stats = await withAxios<CovidStatResponse>({
        url: '/covidstat',
    })

    if (!stats) {
        return {
            props: {} as CovidStatResponse,
            notFound: true,
        }
    }

    /**
     * @deprecated ????????? ???????????? ??????
     */
    // const maxAge = getIntervalFromTodayToNextday()
    // res?.setHeader('Set-Cookie', `covidApiResult=${JSON.stringify(stats)}; path=/; max-age=${maxAge}`)

    return {
        props: {...stats},
        notFound: false,
    }
}

export default observer(Main)
