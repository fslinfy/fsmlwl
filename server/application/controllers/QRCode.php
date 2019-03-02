<?php  
 
    require_once 'CombineImage.class.php';
 
    function httpGet($url) {
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_TIMEOUT, 500);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_URL, $url);
 
            $res = curl_exec($curl);
            curl_close($curl);
 
            return $res;
    }
 
 
    function getAccessToken() {
            $AppId = "wxeae999873fea2cd7"; //小程序APPid
            $AppSecret = "01b158135fe1149813030834721f1763"; //小程序APPSecret
            $data = json_decode(file_get_contents("access_token.json"));
            if ($data->expire_time < time()) {
                $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$AppId.'&secret='.$AppSecret;
                $res = json_decode(httpGet($url));
                $access_token = $res->access_token;
                if ($access_token) {
                    $data->expire_time = time() + 7000;
                    $data->access_token = $access_token;
                    $fp = fopen("access_token.json", "w");
                    fwrite($fp, json_encode($data));
                    fclose($fp);
                }
            } else {
                $access_token = $data->access_token;
            }
            return $access_token;
  }
 
 
    function get_content_post($url,$post_data=array(),$header=array()){   
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查  
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, true);  // 从证书中检查SSL加密算法是否存在 
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_AUTOREFERER,true);
        $content = curl_exec($ch);
        $info = curl_getinfo($ch,CURLINFO_EFFECTIVE_URL); 
        $code = curl_getinfo($ch,CURLINFO_HTTP_CODE);       
        curl_close($ch);    
        if($code == "200"){
            return $content;
        }else{
            return "错误码：".$code;
        }
    }
 
 
    $ACCESS_TOKEN = getAccessToken($access_token); 
    //接口A小程序码,总数10万个（永久有效，扫码进入path对应的动态页面）
    $url = 'http://api.weixin.qq.com/wxa/getwxacode?access_token='.$ACCESS_TOKEN;
    //接口B小程序码,不限制数量（永久有效，将统一打开首页，可根据scene跟踪推广人员或场景）
    //$url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=".$ACCESS_TOKEN; 
    //接口C小程序二维码,总数10万个（永久有效，扫码进入path对应的动态页面）
    //$url = 'http://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='.$ACCESS_TOKEN;
    header('content-type:image/png');
    $color = array(  
            "r" => "114",  //这个颜色码自己到Photoshop里设
            "g" => "188",  //这个颜色码自己到Photoshop里设
            "b" => "234",  //这个颜色码自己到Photoshop里设
    );  
    $data = array(
        //$data['scene'] = "scene";//自定义信息，可以填写诸如识别用户身份的字段，注意用中文时的情况  
        //$data['page'] = "pages/index/index";//扫码后对应的path，只能是固定页面
        'path' => $_POST['path'], //前端传过来的页面path
        'width' => intval(600), //设置二维码尺寸
        'auto_color' => false,
        'line_color' => $color,
    );
    $data = json_encode($data);
 
    $QRCode = get_content_post($url,$data);
    $imgName = $_POST['imgname'];
    $fileName = $imgName.'.png';
     
    //输出二维码
    file_put_contents('QRCode/'.$fileName,$QRCode);
 
    //合成海报
    $ci = new CombineImage(array('QRCode/'.$fileName, 'background.png'), 'QRCode/'.$imgName.'.jpg');
    $ci->combine();
    $ci->show();
 
 
?>