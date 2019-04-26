import { ShareInfo } from '../../../interface';

export default abstract class Share {
    abstract callShare (): any;
    
    abstract setShareInfo (shareInfo: ShareInfo): any;
}