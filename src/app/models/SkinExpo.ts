import {HalObject} from './HalObject';
import {SkinExpoObjects} from './SkinExpoObjects';

export class SkinExpo extends HalObject {
    id?: string;
    title: string;
    location: string;
    expoObjects: Array<SkinExpoObjects>;
}
