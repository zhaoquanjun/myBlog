/**
 * Created by Administrator on 2016/8/22.
 */
function getUriParam(){
    var url = window.location.href;
    var params = url.split('?')[1];

    var paramRow = new Array();
    paramRow['cid'] = 698;
    paramRow['page'] = 1;
    paramRow['q'] = "";
    if(params){
        var Row = params.split('&');
        for(var i=0;i<Row.length;i++){
            var info = Row[i].split('=');
            paramRow[info[0]] = info[1];
        }
    }
    return paramRow;

}

var param = getUriParam();

class Item extends React.Component{
    render(){
        var data = this.props.data;
        var uri = 'page.html?id=' + data['id'];
        return(
            <li>
                <a href={uri}><h1>{data['title']}</h1></a>
                <span>{data['adddate']}</span>
                <p>{data['description']}</p>
                <a href={uri} >[阅读全文]</a>
            </li>
        )
    }
}

class Page extends React.Component{
    render(){
        var count = this.props.count;
        var page = parseInt(this.props.page);
        var pages = Math.ceil(count/10);
        var source = [];

        var url = window.location.href.split('?')[0] + "?"+"q="+ param['q'] + "&"+"cid="+param['cid']+"&";


        for(var i=1;i<=pages;i++){
            var active = "";
            if(page == i){
                active = "active";
            }
            source.push(  <li className={active} key={"p_"+i}><a href={url+'page='+i}>{i}</a></li>)
        }

        var prev = (page-1) <=1 ? url + "page=1" : url + "page=" + (page-1);
        var next = (page+1) > pages ? url + "page=" + pages : url + "page=" + (page+1);


        return(
            <nav className="pages" >
                <ul className="pagination">
                    <li>
                        <a href={prev} aria-label="Previous">
                            <span aria-hidden="true">«</span>
                        </a>
                    </li>
                    {source}
                    <li>
                        <a href={next} aria-label="Next">
                            <span aria-hidden="true">»</span>
                        </a>
                    </li>
                </ul>
                <div className="m_pagination">
                    加载中。。。
                </div>
            </nav>
        )
    }
}


class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : [],
            count:0,
            page:0,
        }
    }
    componentDidMount() {
        var _that = this;

        $.ajax({
            type:'get',
            url:_that.props.uri,
            dataType:'jsonp',
            success:function(data){
                _that.setState({
                    data:data['list'],
                    count:data['count'],
                    page:data['page'],
                })
            }
        })
    }

    render(){
        var source = [];
        if(this.state.data){
            this.state.data.map(function(obj){
                source.push(<Item key={"item"+obj.id} data={obj} />)
            })
        }

        if(this.state.data.length){
            var P = null;
            if( Math.ceil(this.state.count/10) > 1){
                P = <Page count={this.state.count} page={this.state.page} />
            }
            return(
                <div>
                    <ul className="box2">
                        {source}
                    </ul>
                    {P}
                </div>
            )
        }else{
            return (
                <div style={{textAlign:'center'}}>
                    加载中。。。
                </div>
            )
        }

    }
}


var uri = "http://115.29.202.187/blog/index.php/api?&key="+param['q']+"&cid="+param['cid']+"&page="+param['page']+"&callback=?";

ReactDOM.render(
    <List uri={uri} />,
    document.getElementById('blist')
)