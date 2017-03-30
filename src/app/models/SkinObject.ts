import {SkinAuthority} from './SkinAuthority';
import {HalObject} from './HalObject';
export class SkinObject extends HalObject {
    id?: string;
    titles: Array<string>;
    authority?: SkinAuthority;
}
