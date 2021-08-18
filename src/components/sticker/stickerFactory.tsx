import Blue from 'assets/sticker/Blue'
import Expect from 'assets/sticker/Expect'
import Fighting from 'assets/sticker/Fighting'
import Good from 'assets/sticker/Good'
import Happy from 'assets/sticker/Happy'
import Love from 'assets/sticker/Love'
import Ok from 'assets/sticker/Ok'
import Sad from 'assets/sticker/Sad'
import Shame from 'assets/sticker/Shame'
import Shock from 'assets/sticker/Shock'
import Shy from 'assets/sticker/Shy'
import Unhappy from 'assets/sticker/Unhappy'
import {STICKER_TYPE, StickerType} from '$types/response/letter'

export const StickerFactory = (stickerType: StickerType, width = '5.2rem') => {
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
