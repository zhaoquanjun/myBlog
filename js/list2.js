/**
 * Created by Administrator on 2016/8/22.
 */


var param = getUriParam();

class Item extends React.Component{
    render(){
        var data = this.props.data;
        var uri = 'comment.html?id=' + data['id'];
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
            page:1,
            load:false,
            noData:false,
        }
    }
    fetDate(url){
        var _that = this;
        $.ajax({
            type:'get',
            url:url,
            dataType:'jsonp',
            success:function(data){
                if(data.count == 0){
                    _that.setState({
                        noData:true,
                    })
                }else{
                    var source = _that.state.data;
                    console.log(data);
                    data.list.map(function(item){
                        source.push(item);
                    })
                    _that.setState({
                        data:source,
                        load:false,
                        count:data['count'],
                    })
                }
            }
        })
    }
    componentDidMount() {
        var _that = this;
        this.fetDate(_that.props.uri + "&page=1");
            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowWidth = $(this).width();
                var windowHeight = $(this).height();

                if (scrollTop + windowHeight == scrollHeight) {

                        if(_that.state.page < Math.ceil(_that.state.count/10)){
                            _that.setState({
                                page:parseInt(_that.state.page)+1,
                            })
                            _that.setState({load:true});
                            let url =  _that.props.uri + "&page=" + parseInt(_that.state.page);
                            _that.fetDate(url);
                           /* var timer = setTimeout(function(){
                                _that.setState({
                                    load:false,
                                })


                            },1000)*/
                        }

                }
            });


    }

    render(){

        var source = [];
        if(this.state.data){
            this.state.data.map(function(obj){
                source.push(<Item key={"item"+Math.random()} data={obj} />)
            })
        }

        if(this.state.data.length){
            return(
                <div>
                    <ul className="box2">
                        {source}
                    </ul>
                    {this.state.load ?  <div style={{textAlign:'center'}}>
                        <img style={{marginRight:10}} src="./image/load.gif" />加载中。。。
                    </div> : null }
                </div>
            )
        }else{
            return (
                <div style={{textAlign:'center'}}>
            {this.state.noData ?"sorry,未搜到相关信息。"  :     "加载中。。。" }
                </div>
            )
        }

    }
}


var uri = "http://120.24.214.233/blog/index.php/api?&key="+param['q']+"&cid="+param['cid']+"&callback=?";
console.log(uri);
ReactDOM.render(
    <List uri={uri} />,
    document.getElementById('blist')
)
