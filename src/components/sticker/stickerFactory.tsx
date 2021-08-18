import BLUE from 'assets/sticker/Blue'
import EXPECT from 'assets/sticker/Expect'
import FIGHTING from 'assets/sticker/Fighting'
import GOOD from 'assets/sticker/Good'
import HAPPY from 'assets/sticker/Happy'
import LOVE from 'assets/sticker/Love'
import OK from 'assets/sticker/Ok'
import SAD from 'assets/sticker/Sad'
import SHAME from 'assets/sticker/Shame'
import SHOCK from 'assets/sticker/Shock'
import SHY from 'assets/sticker/Shy'
import UNHAPPY from 'assets/sticker/Unhappy'
import {STICKER_TYPE, StickerType} from '$types/response/letter'

export const StickerFactory = (stickerType: StickerType, width = '5.2rem') => {
    switch (stickerType) {
        case STICKER_TYPE.HAPPY:
            return <HAPPY width={width} />
        case STICKER_TYPE.EXPECT:
            return <EXPECT width={width} />
        case STICKER_TYPE.SHY:
            return <SHY width={width} />
        case STICKER_TYPE.LOVE:
            return <LOVE width={width} />
        case STICKER_TYPE.UNHAPPY:
            return <UNHAPPY width={width} />
        case STICKER_TYPE.SAD:
            return <SAD width={width} />
        case STICKER_TYPE.SHOCK:
            return <SHOCK width={width} />
        case STICKER_TYPE.BLUE:
            return <BLUE width={width} />
        case STICKER_TYPE.SHAME:
            return <SHAME width={width} />
        case STICKER_TYPE.FIGHTING:
            return <FIGHTING width={width} />
        case STICKER_TYPE.GOOD:
            return <GOOD width={width} />
        case STICKER_TYPE.OK:
            return <OK width={width} />
    }
}
