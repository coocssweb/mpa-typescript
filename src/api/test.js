import {API_URL} from '../const';
import Base from './base';

class Test extends Base {
    test (id) {
        let url = `${API_URL}/test/like.json`;
        let data = {id: id};
        return this.request({url, data, type: 'get'});
    }
}

export default new Test();
