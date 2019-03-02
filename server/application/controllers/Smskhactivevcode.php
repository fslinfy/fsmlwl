<?php defined('BASEPATH') OR exit('No direct script access allowed'); 
use  QCloud_WeApp_SDK\Sms\SmsSingleSender;  
use QCloud_WeApp_SDK\Sms\SmsSenderUtil;  

 class Smskhactivevcode extends CI_Controller {
  public function index() 
  {  
    $appid = 1400083497; // 1400开头
    $appkey = "b4ad65d8d9e2617a7d6795c75b98d8ea";
    $smsSign = "明联物流"; 
    $link = mysqli_connect( 
          'gz-cdb-p2hbsmqa.sql.tencentcdb.com:63689', 
          'root',
          'lfy670313',
          'wms'); 

    $khid=$_GET["khid"];	
    $phone=$_GET["smsphone"];

    $sqlstr="select * from customer  where active=1 and LOCATE(',".$phone.",',concat(',',smsphone,',')) and C_id=".$khid ;
    $arr = array();
    $query = mysqli_query($link,$sqlstr);
    $rows=mysqli_num_rows($query);
    if ($rows==0)
    {
        $this->json(['result' => "非法ID 或电话号码！"]);   
    }
    else
    {
      session_start();
      $num = 6;
      $code = ' ';
      for ($i = 0; $i < $num; $i++)//生成验证码
      {
			  $code[$i] = chr(rand(48, 57));//数字
      }
      $code="123456";
      
      $_SESSION["VerifyCode"] = $code;
   	  
      /* 
       try {   
      
       $templateId =106661;
	     $params =array();
       array_push($params,$code);
       array_push($params,2);
       $ssender = new SmsSingleSender($appid, $appkey);
       $result = $ssender->sendWithParam("86", $phone, $templateId,  	$params, $smsSign, "", ""); 
       $a=json_decode($result, true);
        if ($a["result"]==0)
        {
       
             
             mysqli_query($link,'insert into logs (msg) values ("'.$phone."   vcode: ".$code.'")');

             $this->json(['result' => "success",'vcode'=>$code]);   
        }
        else
        {
         $this->json(['result' => "信息发送失败！"]);   
        }


        } catch(\Exception $e) {
          $this->json(['result' => "信息发送失败！"]);   
        }
    
         */
         $this->json(['result' => "success",'vcode'=>$code]);  
    }
    mysqli_close($link);	
  }
}