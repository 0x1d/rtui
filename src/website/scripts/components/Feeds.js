import $ from 'jquery';
import Component from '../core/Component';
import FeedsApi from '../stores/FeedsApi';

export default class Feeds extends Component {

    constructor(ctx, node) {
        super(ctx, node);

        this.feedsApi = new FeedsApi();
    }
    init() {
        $.when($.get('/feeds/api/downloaded'), $.get('/feeds/api/feeds'))
            .done((downloaded, feeds) => {
                this.toDownloadedList(JSON.parse(downloaded[0]));
                this.toFeedsList(JSON.parse(feeds[0]));
                this.render(this.data);

            });
        this.node.delegate('.addFeed', 'click', this.addFeed.bind(this));

    }
    toViewData(attribute, list) {
        let outList = [];
        for (let itemKey in list) {
            let item = list[itemKey];
            outList.push(item);
        }
        this.data[attribute] = outList;
        return this.data;
    }
    toDownloadedList(list) {
        return this.toViewData('downloaded', list);
    }
    toFeedsList(list) {
        return this.toViewData('feeds', list);
    }
    addFeed() {
        console.log('addFeed');
        this.feedsApi.save({
            feedKey: this.data.feedKey.value,
            feedUrl: this.data.feedUrl.value
        });
    }

}