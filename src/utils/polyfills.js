import 'core-js/features/set'
import 'core-js/features/map'
import 'core-js/features/symbol'
import 'core-js/features/array'
import 'core-js/features/object'

function addArrayFlatPolyfill() {
    const ArrayPrototype = Array.prototype

    if ('flatten' in ArrayPrototype && !('flat' in ArrayPrototype)) {
        ArrayPrototype.flat = ArrayPrototype.flatten
    }
}

addArrayFlatPolyfill()