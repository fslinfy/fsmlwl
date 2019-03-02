<?php defined('BASEPATH') OR exit('No direct script access allowed'); 

use  QCloud_WeApp_SDK\Sms\SmsSingleSender;  
use QCloud_WeApp_SDK\Sms\SmsSenderUtil;  



 class Smsactivevcode extends CI_Controller {
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
$userid=$_GET["userid"];	

$wxactive=$_GET["wxactive"];
$phone=$_GET["smsphone"];

if ($khid>0){
    $sqlstr="select userid,smsactive from khusers where userid=".$userid." and smsphone='" . $phone . "' and khid=".$khid ;
 
}else{
   $sqlstr="select userid,smsactive from users where userid=".$userid." and smsphone='" . $phone . "' " ;
  
}

$arr = array();

  $query = mysqli_query($link,$sqlstr);

  $rows=mysqli_num_rows($query);
if ($rows==0)
  {
              $this->json(['result' => "非法ID 或电话号码！"]);   
  }
  else
  {
    $smsactive=0;
    //if ($wxactive!=1)
    //{
	    while ($row = mysqli_fetch_array($query)) {
		  	$smsactive= $row['smsactive'];
	  	}
    //} 

   // echo "smsactive".$smsactive;
     $smsactive=0;   //可以重复激活 
    if  ($smsactive==1)
    {
         $this->json(['result' => "此用户已激活！"]);   

    }else{
      session_start();
      $num = 6;
      $code = ' ';
      for ($i = 0; $i < $num; $i++)//生成验证码
      {
			  $code[$i] = chr(rand(48, 57));//数字
      }
       $code="123456";
      $_SESSION["VerifyCode"] = $code;

    
   	  try {   

      
     /*  $templateId =106661;
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
*/
          // $this->json(['result' => "success",'vcode'=>$code]);   
            $this->json(['result' => "信息发送失败!!!!！"]);   
           
    } catch(\Exception $e) {
 $this->json(['result' => "信息发送失败！"]);   
    }
    }
         
  }
  mysqli_close($link);	
  }
}