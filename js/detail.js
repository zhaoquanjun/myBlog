/**
 * Created by Administrator on 2016/8/4.
 */

class Item extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item:null,
            error:false,
        }
    }
    componentDidMount(){

        var _that = this;
        $.ajax({
            type:'get',
            url:_that.props.uri,
            dataType:'jsonp',
            success:function(result){
                var data = JSON.parse(base64_decode(result['item']));
                //console.log(data);
                if(data){
                    _that.setState({
                        item:data,
                    });
                }else{
                    _that.setState({
                        error:true
                    })
                }

            }
        })
    }
    render(){
        var item = this.state.item;
        //console.log(item);

        if(item){
            //console.log(item['body']);
            var body = item['body'];
            $("#ds-thread").attr({'data-thread-key' : item['id'],'data-title':item['title'],'data-url':window.location.href});

            document.title = item['title'];
            return(
                <div className="box2">
                    <h1>{item['title']}</h1>
                    <span>更新日期：{item['adddate']} </span>
                    <div style={styles.content} dangerouslySetInnerHTML = {{__html:body}}>
                    </div>

                </div>
            )
        }else{
            if(this.state.error){
                return(
                    <div className="box2">
                        <p style={{textAlign:'center',margin:"40px"}}>
                            请求出错！
                        </p>
                    </div>
                );
            }else{
                return(
                    <div className="box2">
                        <p style={{textAlign:'center',margin:"40px"}}>
                            加载中。。。
                        </p>
                    </div>
                );
            }
        }

    }
}

const styles = {
    content:{
        marginTop:"20px",
    }
}

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
var uri = "http://115.29.202.187/blog/index.php//api?c=index&a=detail&id=" + param['id'] + "&typeid=692&field=body"

ReactDOM.render(
    <Item uri={uri} />,
    document.getElementById('item')
)