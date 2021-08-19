import Blue from 'assets/sticker/with/letter/Blue'
import Expect from 'assets/sticker/with/letter/Expect'
import Fighting from 'assets/sticker/with/letter/Fighting'
import Good from 'assets/sticker/with/letter/Good'
import Happy from 'assets/sticker/with/letter/Happy'
import Love from 'assets/sticker/with/letter/Love'
import Ok from 'assets/sticker/with/letter/Ok'
import Sad from 'assets/sticker/with/letter/Sad'
import Shame from 'assets/sticker/with/letter/Shame'
import Shock from 'assets/sticker/with/letter/Shock'
import Shy from 'assets/sticker/with/letter/Shy'
import Unhappy from 'assets/sticker/with/letter/Unhappy'
import {STICKER_TYPE, StickerType} from '$types/response/letter'

export const StickerWithLetterFactory = (stickerType: StickerType, width = '6.4rem') => {
    switch (stickerType) {
        case STICKER_TYPE.HAPPY:
            return <Happy width={width} />
        case STICKER_TYPE.EXPECT:
            return <Expect width={width} />
        case STICKER_TYPE.SHY:
            return <Shy width={width} />
        case STICKER_TYPE.LOVE:
            return <Love width={width} />
        case STICKER_TYPE.UNHAPPY:
            return <Unhappy width={width} />
        case STICKER_TYPE.SAD:
            return <Sad width={width} />
        case STICKER_TYPE.SHOCK:
            return <Shock width={width} />
        case STICKER_TYPE.BLUE:
            return <Blue width={width} />
        case STICKER_TYPE.SHAME:
            return <Shame width={width} />
        case STICKER_TYPE.FIGHTING:
            return <Fighting width={width} />
        case STICKER_TYPE.GOOD:
            return <Good width={width} />
        case STICKER_TYPE.OK:
            return <Ok width={width} />
    }
}
