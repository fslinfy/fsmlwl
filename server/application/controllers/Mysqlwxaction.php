<?php defined('BASEPATH') OR exit('No direct script access allowed'); 

 class Mysqlwxaction extends CI_Controller {
  public function index() 
  {  
     $link = mysqli_connect('gz-cdb-p2hbsmqa.sql.tencentcdb.com:63689', 
     'root','lfy670313','wms'); 
session_start();

$act = $_GET['act'];
if (!$act) {
	$act = $_POST['act'];
}
$act = strtolower($act);
$retval = '';
/*
if (($act<>'saveformid') && ($act<>'getopenid') && ($act<>'sysuserlogin') && ($act<>'getckmclist')  ){
//***************************************************************************
$khid =(int)$_GET['khid'];
$userid =$_GET['userid'];
$openid =$_GET['openid'];
if ($khid>0)
{
  $sqlstr=" select * from khuser  where userid=".$userid ;
}
else
{
  $sqlstr=" select * from khuser  where userid=".$userid ;
}
 $loginname='';  

  $query = mysqli_query($link, $sqlstr);

	if ($query) {
		while ($row = mysqli_fetch_array($query)) {
			 if ($openid<>$row['openid'])
       {
         $loginname=$row['loginwxname'];
       }
			break;
		}
   	if ($loginname<>'') {
		  $arr['success'] = false;
		  $arr['data'] = array('id' => 0,'wxlogin'=>0,'msg' => urlencode('此微信帐号已在别处登录！'. $sqlstr));
      mysqli_close($link);	
      echo urldecode(json_encode($arr));
		  return ;
	  }

	}else
  {
		  $arr['success'] = false;
		  $arr['data'] = array('id' => 0,'wxlogin'=>0,'msg' => urlencode('此微信帐号登录资料失误！'. $sqlstr));
      mysqli_close($link);	
      echo urldecode(json_encode($arr));
		  return ;

  }


//***********************************************************************************
}

*/

switch($act) {
	case 'getckmclist' :
		$retval =self::getckmclist($link);
		break;
	case 'getxsdcpkcmx' :
		$retval =self::getxsdcpkcmx($link);
		break;
    
	case 'getworklist' :
		$retval =self::getworklist($link);
		break;

	case 'getsqlselect' :
		$retval =self::getsqlselect($link);
		break;    
	case 'getpackinglist' :
		$retval =self::getpackinglist($link);
		break;    
	case 'cpxsdshsave' :
		$retval =self::cpxsdshsave($link);
		break;

	case 'wxcpgfdshsave' :
		$retval =self::wxcpgfdshsave($link);
		break;
	case 'wxcpghdshsave' :
		$retval =self::wxcpghdshsave($link);
		break;

	case 'cpjkdshsave' :
		$retval =self::cpjkdshsave($link);
		break;
	case 'cpckdshsave' :
		$retval =self::cpckdshsave($link);
		break;
	case 'cpxsdmxsave' :
		$retval =self::cpxsdmxsave($link);
		break;
	case 'wxghdmxsave' :
		$retval =self::wxghdmxsave($link);
		break;


	case 'cpgfdmxsave' :
		$retval =self::cpgfdmxsave($link);
		break;

	case 'cpckdmxsave' :
		$retval =self::cpckdmxsave($link);
		break;

	case 'cpxsdlist' :
		$retval =self::cpxsdlist($link);
		break;
	case 'wxcpghdlist' :
		$retval =self::wxcpghdlist($link);
		break;

	case 'cpckdgl' :
		$retval =self::cpckdgl($link);
		break;

	case 'cpjkdlist' :
		$retval =self::cpjkdlist($link);
		break;
	case 'cpjkdwz' :
		$retval =self::cpjkdwz($link);
		break;
 	case 'cpckdwz' :
		$retval =self::cpckdwz($link);
		break;

	case 'cpjcttloc' :
		$retval =self::cpjcttloc($link);
		break;
	case 'cpgfdlist' :
		$retval =self::cpgfdlist($link);
		break;
	case 'wxcpgfdlist' :
		$retval =self::wxcpgfdlist($link);
		break;

	case 'cpckdlist' :
		$retval =self::cpckdlist($link);
		break;
	case '_cpckdlist' :
		$retval =self::_cpckdlist($link);
		break;

	case 'cpxsdmxloc' :
		$retval =self::cpxsdmxloc($link);
		break;
	case 'cpckdselectdata' :
		$retval =self::cpckdselectdata($link);
		break;
	case 'cpgfdselectdata' :
		$retval =self::cpgfdselectdata($link);
		break;

	case 'cpjkdselectdata' :
		$retval =self::cpjkdselectdata($link);
		break;
  case 'ckmclist' :
    $retval =self::ckmclist($link);
	  break;
  case 'khmclist' :
    $retval =self::khmclist($link);
	  break;
  case 'cpkcmenulist' :
		$retval =self::cpkcmenulist($link);
		break;
	case 'cphmlist' :
		$retval =self::cphmlist($link);
		break;
	case 'cphmedit' :
		$retval =self::cphmedit($link);
		break;
  case 'saveformid' :
		$retval =self::saveformid($link);
		break;
	case 'khuserslist' :
		$retval =self::khuserslist($link);
		break;
	case 'khusersedit' :
		$retval =self::khusersedit($link);
		break;

	case 'usertypelist' :
		$retval =self::usertypelist($link);
		break;
	case 'usertypeedit' :
		$retval =self::usertypeedit($link);
		break;

	case 'phptest' :
		$retval =self::phptest($link);
		break;
	case 'getopenid' :
		$retval =self::getopenid($link);
		break;
  case 'smsservice' :
		$retval =self::smsservice($link);
		break;
  case 'getaccesstoken' :
		$retval =self::getaccesstoken($link);
		break;
	default :
	  $result0['success'] = false;
 		$result0['data'] = array('id' => 1, 'msg' => urlencode('传递参数错误！'));
     $retval=urldecode(json_encode($result0));
		break;
}
mysqli_close($link);	
echo $retval;
    
}

private static function getopenid($link)
{
  $code=$_GET["code"];
  $nickname=$_GET["nickname"];
  $appId = 'wxeae999873fea2cd7';
  $secret = "01b158135fe1149813030834721f1763";
  $url='https://api.weixin.qq.com/sns/jscode2session?appid='.$appId.'&secret='. $secret.'&js_code='.$code.'&grant_type=authorization_code';

            $curl = curl_init();
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_TIMEOUT, 500);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_URL, $url);
 
            $res = curl_exec($curl);
            curl_close($curl);
          //  return $res;
            $o=json_decode($res);
            
            $openid=$o->openid;
            //$openid=$data->openid;
 		        $result['success'] = true;
	          $result['openid'] = $openid;

           if ($openid)
           {
            $sqlstr = "insert into wxusers (openId,nickname) values ('".$openid."','".$nickname."')";
 	          $query = mysqli_query($link,$sqlstr);
            }
            return urldecode(json_encode($result));
}


private static function  phptest($link)
{
      $url="http://www.fsminglian.com/WxSMSService.php";
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

private static function getHttp($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_URL, $url);
    $tmpInfo = curl_exec($curl);
   if (curl_errno($curl)){
     return 'Errno'.curl_error($curl);
     }
   curl_close($curl);
   return $tmpInfo; // 返回数据       
}
private static function postHttp($url,$data) {
   $curl = curl_init(); // 启动一个CURL会话           
   curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址                       
   curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检测         
   curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2); // 从证书中检查SSL加密算法是否存在           
   curl_setopt($curl, CURLOPT_HTTPHEADER, array('Expect:')); //解决数据包大不能提交          
   curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转           
   curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer           
   
   curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求           
   
   if ($data){
      curl_setopt($curl, CURLOPT_POSTFIELDS, $data); // Post提交的数据包           
   
   }
   curl_setopt($curl, CURLOPT_TIMEOUT, 500); // 设置超时限制防止死循 30         
   curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容           
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回                  
   $tmpInfo = curl_exec($curl); // 执行操作           
  if (curl_errno($curl)){
     return 'Errno'.curl_error($curl);
  }
  curl_close($curl); // 关键CURL会话           
   
   return $tmpInfo; // 返回数据       
}
private static function  smsservice($link)
{
            $data = $_GET['data'];
            /*
            $url="http://www.fsminglian.com/WxSMSService.php?data=".$data;
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_TIMEOUT, 500);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_URL, $url);
            $res = curl_exec($curl);
            curl_close($curl);
            //$o=json_decode($res);
 		        //$result['success'] = true;
	          //$result['data'] =$o->data ;
            //return urldecode(json_encode($result));
        //   $res=self::getAccessToken($link);*/
            $res=self::getHttp("http://www.fsminglian.com/WxSMSService.php?data=".$data);
            return urldecode($res);
}

private static function getAccessToken($link) {
    
  $sql="select * from sys_ini where varmc='access_token' and varlb='cache' limit 1";
  $query =	mysqli_query($link,$sql);
  $rows = mysqli_num_rows($query);
  
  $expire=time();
  $access_token="";
  if ($rows==0 )
  {
      $sql1="insert into sys_ini (varlb,varmc,expire) values ('cache','access_token',now())";
      mysqli_query($link,$sql1);
  }
  else
  {
      while ($row = mysqli_fetch_array($query)) {
        $access_token= $row['VARVALUE'];
        $expire= $row['Expire'];
	  	}
      if (time() - strtotime($expire)>0)
      {
        $access_token="";
      }
  }

//  return $rows."---".$access_token."==".$expire ;

  if ($access_token=="")
  {
     $appid = "wxeae999873fea2cd7"; 
     $appsecret = "01b158135fe1149813030834721f1763"; 
  
      $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$appsecret;
    
    //$result = https_request($url);
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_TIMEOUT, 500);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_URL, $url);
 
            $res = curl_exec($curl);
            curl_close($curl);

    
    
    $jsoninfo = json_decode($res, true);
    $access_token = $jsoninfo['access_token'];
    
    //$access_token=time();
    if ($access_token) 
    {
      $sql1="update sys_ini set varvalue='".$access_token."',expire=date_add(now(), interval 2 hour) where varmc='access_token' and varlb='cache'";
      mysqli_query($link,$sql1);
    }
  }
   $result=array();
   if ($access_token){
   	$result['success'] = true;
   }
   else
   {
   	$result['success'] = false;
   }
		$result['token'] =$access_token;
    return urldecode(json_encode($result));
}

private static function  cpjkdshsave($link)
{
	$options = $_GET['options'];
  
	
  /*$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
  $shr =$o['username'] ;
	$jkid = $o['jkid'];
	$shr = $o['shr'];
  $jkid = $o['jkid'];
  */


	if ($options=="ok"){
      $jkd =json_decode($_GET['jkd'],true);
      $shbz=$jkd['shbz'];
      $gsby = $jkd['gsby'];
	    $jkid=$jkd['jkid'];
      $shr=$jkd['shr'];
      $cnote=$jkd['cnote'];
  		if ($shbz=='ywsh'){
	   	  $sqlstr = " update cpjkd set ztbz=2,shrq=now()";
		    $sqlstr .= ",shr='" . $shr . "' ,cnote='" . $cnote. "' where  ztbz<2 and delbz=0 and jkid=" . $jkid;
      }else{
        $sqlstr = " update cpjkd set ztbz=3,cwshrq=now()";
		    $sqlstr .= ",cwsh='" . $shr . "' ,cnote='" . $cnote. "' where  ztbz=2 and delbz=0 and jkid=" . $jkid;
      }        

		  mysqli_query($link,'start transaction');



	
   	mysqli_query($link,$sqlstr);
		if (mysqli_errno($link) > 0) {
	  	$result['success'] = true;
	    $result['data'] = array('id' =>1, 'msg' => urlencode('进仓审核数据保存失败'));
      return urldecode(json_encode($result));
		}
		foreach ($gsby as $row) {
			$cpjkdjestr = " update cpjkdje set gs='" . $row['gs'] . "'";
			$cpjkdjestr .= ",byg='" . $row['byg'] . "'";
			$cpjkdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
			mysqli_query($link,$cpjkdjestr);
			if (mysqli_errno($link) > 0) {
				  mysqli_query($link,'rollback');
      	  $result['success'] = true;
	        $result['data'] = array('id' =>1, 'msg' => urlencode('进仓审核数据保存失败'));
          return urldecode(json_encode($result));
				  break;
			}
		}


	}else
	{
		$jkid = $_GET['jkid'];
    $shr = $_GET['shr'];
    $shbz = $_GET['shbz'];
    	if ($shbz=='ywsh'){
		$sqlstr = " update cpjkd set delbz=1,shrq=now(),shr='".$shr."' where delbz=0 and  ztbz<2 and jkid=" . $jkid;
      }else{
        $sqlstr = " update cpjkd set delbz=1,cwshrq=now(),cwsh='".$shr."' where delbz=0 and  ztbz=2 and jkid=" . $jkid;
      }
		mysqli_query($link,'start transaction');
		mysqli_query($link,$sqlstr);
		  
	}

   $result['success'] = true;
		mysqli_query($link,'commit');
		if (mysqli_errno($link) > 0) {
			mysqli_query($link,'rollback');
	    $result['data'] = array('id' =>1, 'msg' => urlencode('进仓审核数据保存失败'));
		} else {
	    $result['data'] = array('id' =>0, 'msg' => urlencode('进仓审核数据保存成功'));
		}
    return urldecode(json_encode($result));
}

private static function cpckdshsave($link) {
  $options = $_GET['options'];
  if ($options == "ok") {
    $ckd = json_decode($_GET['ckd'], true);
    $gsby = $ckd['gsby'];
    $ckid = $ckd['ckid'];
    $shr = $ckd['shr'];
    $shbz = $_GET['shbz'];
    $cnote = $ckd['cnote'];
    if ($shbz=='ywsh'){
      $sqlstr = " update cpckd set ztbz=1,shrq=now()";
      $sqlstr.= ",shr='".$shr. "' ,cnote='".$cnote. "' where   delbz=0 and ckid=".$ckid;
    }else{
      if ($shbz=='cwsh'){
          $sqlstr = " update cpckd set ztbz=3,cwshrq=now()";
          $sqlstr.= ",cwsh='".$shr. "' ,cnote='".$cnote. "' where   delbz=0 and ckid=".$ckid;
        }else{
      
          $sqlstr = " update cpckd set ztbz=2,shrq=now()";
          $sqlstr.= ",cgy='".$shr. "' ,cnote='".$cnote. "' where   delbz=0 and ckid=".$ckid;
         }
  
    }

    mysqli_query($link, 'start transaction');
    mysqli_query($link, $sqlstr);
    if (mysqli_errno($link) > 0) {
      $result['success'] = true;
      $result['data'] = array('id' => 1, 'msg' => urlencode('单据审核保存失败'));
      return urldecode(json_encode($result));
    }
    foreach($gsby as $row) {
      $cpckdjestr = " update cpckdje set gs='".$row['gs']. "'";
      $cpckdjestr.= ",byg='".$row['byg']. "'";
      $cpckdjestr.= ",cg='".$row['cg']. "' where jeid=".$row['jeid'];
      mysqli_query($link, $cpckdjestr);
      if (mysqli_errno($link) > 0) {
        mysqli_query($link, 'rollback');
        $result['success'] = true;
        $result['data'] = array('id' => 1, 'msg' => urlencode('单据审核保存失败'));
        return urldecode(json_encode($result));
        break;
      }
    }
  } else {
     $ckid = $_GET['ckid'];
     $shr = $_GET['shr'];
     $shbz = $_GET['shbz'];
     if ($shbz=='ywsh'){
      $sqlstr = " update cpckd set delbz=1,shrq=now(),shr='".$shr. "' where   delbz=0 and ckid=".$ckid;
     }else{
      if ($shbz=='cwsh'){
        $sqlstr = " update cpckd set delbz=1,cwshrq=now(),cwsh='".$shr. "' where   delbz=0 and ckid=".$ckid;
        }else{
          $sqlstr = " update cpckd set delbz=1,shrq=now(),cgy='".$shr. "' where   delbz=0 and ckid=".$ckid;
         }
     }
     mysqli_query($link, 'start transaction');
     mysqli_query($link, $sqlstr);
  }

  $result['success'] = true;
  mysqli_query($link, 'commit');
  if (mysqli_errno($link) > 0) {
    mysqli_query($link, 'rollback');
    $result['data'] = array('id' => 1, 'msg' => urlencode('单据审核保存失败'));
  } else {
    $result['data'] = array('id' => 0, 'msg' => urlencode('单据审核保存成功'));
  }
  return urldecode(json_encode($result));
}
private static function  cpxsdshsave($link)
{
	$xsid = $_GET['id'];

	$loc = $_GET['options'];
  $shr = $_GET['username'];

	if ($loc=="ok"){	
		$sqlstr = " update cpxsd set ztbz=1";
		$sqlstr .= ",endrq='".$_GET['endrq']."'";
		$sqlstr .= ",cphm='".$_GET['cphm']."'";
		$sqlstr .= ",sfr='".$_GET['sfr']."'";
		$sqlstr .= ",cnote='".$_GET['cnote']."'";
		$sqlstr .= ",shrq=NOW(), shr='".$shr."' where  ztbz=0 and delbz=0 and xsid=".$xsid;
	}else
	{
		//if ($loc=="lastdel")
		//{	 
			$sqlstr = " update cpxsd set delbz=1";
			$sqlstr .= ",shrq=NOW(), shr='".$shr."' where  delbz=0 and xsid=".$xsid;
	//	}
	//	else
	//	{
	//		$sqlstr = " update cpxsd set delbz=1";
	//		$sqlstr .= ",shrq=NOW(), shr='".$shr."' where  ztbz=0 and delbz=0 and xsid=".$xsid;
	//	}
	}
		

	mysqli_query($link,$sqlstr);
	$result=array();
	if (mysqli_errno($link) > 0) {
		$result['success'] = true;
	  $result['data'] = array('id' =>1, 'msg' => urlencode('数据保存失败'));
    return urldecode(json_encode($result));
		
	} 
	else 
	{
		$result['success'] = true;
	    //$result['data'] = array('result' =>"success");
		$result['data'] = array('id' =>0, 'msg' => urlencode('数据保存成功'));
        return urldecode(json_encode($result));
	}
}

private static function  wxcpghdshsave($link)
{
	$xsid = $_GET['id'];
	$loc = $_GET['options'];
  $shr = $_GET['username'];
  switch($loc) {
	 case 'ok' :
		$sqlstr = " update wxcpghd set ztbz=1";
		$sqlstr .= ",endrq='".$_GET['endrq']."'";
		$sqlstr .= ",cnote='".$_GET['cnote']."'";
    $sqlstr .= ",jebz=".$_GET['jebz'];
		$sqlstr .= ",khshrq=NOW(), khshr='".$shr."' where  ztbz=0 and delbz=0 and ghid=".$xsid;
    break;
	 case 'delete' :
			$sqlstr = " update wxcpghd set delbz=1";
			$sqlstr .= ",khshrq=NOW(), khshr='".$shr."' where delbz=0 and ghid=".$xsid;
	    break;
	}
		

	mysqli_query($link,$sqlstr);
	$result=array();
	if (mysqli_errno($link) > 0) {
		$result['success'] = true;
	  $result['data'] = array('id' =>1, 'msg' => urlencode('审核数据保存失败'));
    return urldecode(json_encode($result));
		
	} 
	else 
	{
		$result['success'] = true;
	    //$result['data'] = array('result' =>"success");
		$result['data'] = array('id' =>0, 'msg' => urlencode('审核数据保存成功'));
        return urldecode(json_encode($result));
	}
}
private static function  wxcpgfdshsave($link)
{
	$xsid = $_GET['id'];
	$loc = $_GET['options'];
  $shr = $_GET['username'];
	if ($loc=="ok"){	
		$sqlstr = " update wxcpgfd set ztbz=1";
		$sqlstr .= ",endrq='".$_GET['endrq']."'";
		$sqlstr .= ",cphm='".$_GET['cphm']."'";
		$sqlstr .= ",sfr='".$_GET['sfr']."'";
		$sqlstr .= ",cnote='".$_GET['cnote']."'";
    $sqlstr .= ",ckmc='".$_GET['ckmc']."'";
    $sqlstr .= ",L_id=".$_GET['L_id'];
		$sqlstr .= ",khshrq=NOW(), khshr='".$shr."' where  ztbz=0 and delbz=0 and gfid=".$xsid;
	}else
	{
			$sqlstr = " update wxcpgfd set delbz=1";
			$sqlstr .= ",khshrq=NOW(), khshr='".$shr."' where  delbz=0 and gfid=".$xsid;
	}

	mysqli_query($link,$sqlstr);
	$result=array();
	if (mysqli_errno($link) > 0) {
		$result['success'] = true;
	  $result['data'] = array('id' =>1, 'msg' => urlencode('数据保存失败'.$sqlstr));
    return urldecode(json_encode($result));
	} 
	else 
	{
		$result['success'] = true;
	    //$result['data'] = array('result' =>"success");
		$result['data'] = array('id' =>0, 'msg' => urlencode('数据保存成功'));
        return urldecode(json_encode($result));
	}
}


private static function getpackinglist($link) {
	$p_e_code =$_GET["p_e_code"];
	$khid =(int)$_GET["khid"];
	$gfbz =0 ;// (int)$_GET["gfbz"];
	//if ($gfbz==undefined) $gfbz=0;

	if ($khid>0)
	{
  	$lid =(int)$_GET['L_id'];
  	$sqlstr = "	SELECT  `PS_id`,`PS_name`,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
`Weight_Status`,`PS_code`,`Active`,`E_code`,
a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,
c.*FROM packing a LEFT OUTER JOIN (
SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,Khps_id as id,Khid,mints  
FROM packing_kh WHERE khid=".$khid." and L_id=".$lid." ) c ON a.PS_id=c.Pid 
where active=1 and  E_code='".$_GET['p_e_code']."' and a.Xmlb=".$gfbz;
		
	}
	else
	{
		$sqlstr = " SELECT * ,PS_id as id  FROM packing where E_code='" . $_GET['p_e_code'] . "'";
		$sqlstr = $sqlstr . " and Active=1  and Xmlb=".$gfbz;
		$sqlstr = $sqlstr . "   order by PS_code ";
	}
	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);


	
}

private static function  cpxsdlist($link) {	
	
		
$pagesize =0 ;	
if(isset($_GET['pagesize'])) {
  $pagesize =(int)$_GET['pagesize'];
}
$currentpage =1 ;
if(isset($_GET['page'])) {
  $currentpage =(int)$_GET['page'];
}


 	$xsid=0;//(int)$_GET["xsid"];
	
	$khid=(int)$_GET["khid"];
	
	$ckid=(int)$_GET["ckid"];
	
	
	
    $loc=$_GET["loc"];
	if ($xsid>0)
	{
	  $loc="xsid";	
	}
	$filter="";
	   switch($loc) 
		{
      	case 'cpxsdsh' :
		   //$khkd=$_GET["khkd"];
		   $filter .=" and cpxsd.ztbz=0 and cpxsd.delbz=0 ";   //.$khkd;
		  //$filter .=" and (xsid=3705 )";
		   break;
	  	case 'cpxsdmfh' :
			$filter .=" and cpxsd.ztbz=1 and cpxsd.delbz=0 and cpxsd.fhbz<1 ";  
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpxsd.xsrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			{
	    		$filter .=" and cpxsd.xsrq<='".$_GET["enddate"]."'";
		    }	


			//	$filter .=" and cpxsd.ztbz=1 and cpxsd.fhbz<1 ";  
	  		break;
	  	case 'cpxsdmfhck' :
			$filter .=" and cpxsd.ztbz=1 and cpxsd.delbz=0 and cpxsd.fhbz<1 and cpxsd.cdbz=0 ";  
	  		break;

	  	case 'cpxsdloc' :
			$filter .=" and (cpxsd.ztbz>0 and cpxsd.delbz=0) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpxsd.xsrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			{
	    		$filter .=" and cpxsd.xsrq<='".$_GET["enddate"]."'";
		    }	
			//if ($_GET["deletebz"]=="0")
			//{
			//	$filter .= " and cpxsd.delbz=0";
			//}

		  	break;
   	  	case 'cpxsddelloc' :
			$filter .=" and (cpxsd.ztbz>0 and cpxsd.delbz=1) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpxsd.xsrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			{
	    		$filter .=" and cpxsd.xsrq<='".$_GET["enddate"]."'";
		    }	
			//if ($_GET["deletebz"]=="0")
			//{
			//	$filter .= " and cpxsd.delbz=0";
			//}

		  	break;

    	}
		if ($xsid>0)
		{
			$filter =" and cpxsd.xsid=".$xsid;
		}
    
		if ($khid>0)
    	{
    		$filter .=" and cpxsd.khid=".$khid;
    	}
    	if ($ckid>0)
    	{
    		$filter .=" and cpxsd.L_id=".$ckid;
    	}
		$sqlstr1 =" cpxsd.*,xsid as id FROM cpxsd where  khkd>0 ".$filter ;

	

  $sqlstr ="SELECT SQL_CALC_FOUND_ROWS ".$sqlstr1;

  if ($pagesize>0){
     $sqlstr .=" limit ".(($currentpage-1)*$pagesize).",".$pagesize  ;
  }


  $xsdquery = mysqli_query($link," ".$sqlstr);
  $cur_rows=mysqli_num_rows($xsdquery);
	
	$total_rows =mysqli_fetch_array(mysqli_query($link,"select found_rows()"))[0];
  $total_pages=1;
  
  if ($pagesize>0){
      $total_pages=($total_rows +$pagesize - 1) / $pagesize;
  }

  $sqlstr =" select ".$sqlstr1;








 $mxsqlstr = " SELECT  m.*,bz.ps_name as bzmc	
 FROM cpxsdmx m,cpxsd,packing bz,(".$sqlstr.") xsd  
 where cpxsd.xsid=m.xsid and bz.PS_id=m.bzid  and xsd.xsid=m.xsid ";	

//return $mxsqlstr;
	$xsdmxquery = mysqli_query($link,$mxsqlstr);




	
		if ($xsdquery) {

		$menutype = "";
		$xsd = array();
		$menu_cpkc = array();

		while ($xsdrow = mysqli_fetch_array($xsdquery)) {
			$id = $xsdrow['xsid'];
			$fields=mysqli_num_fields($xsdquery);
			$my_array = array();
			for ($i = 0; $i <$fields ; $i++) {
			    $field_info =mysqli_fetch_field_direct($xsdquery, $i);
				  $newvar = $xsdrow[$field_info->name];
				  $my_array[$field_info->name] = urlencode($newvar);
			};


     	$my_array1 = array();
			mysqli_data_seek($xsdmxquery, 0);

			while ($row = mysqli_fetch_array(	$xsdmxquery)) {
				if ($row['xsid'] == $id) {
					$my_array2 = array();
					$fields=mysqli_num_fields(	$xsdmxquery);
					for ($i = 0; $i <$fields ; $i++) {
					     $field_info =mysqli_fetch_field_direct(	$xsdmxquery, $i);
						 $newvar = $row[$field_info->name];
						 $my_array2[$field_info->name] = urlencode($newvar);
					};
					array_push($my_array1, $my_array2);
				}
			}
      
      $my_array['xsdmx'] =$my_array1 ;


			array_push($xsd, $my_array);
		}
    $result['total_rows']=(int)$total_rows; 
    $result['cur_rows']=(int)$cur_rows; 
    $result['pagesize']=$pagesize; 
    $result['cur_pages']=(int)$currentpage; 
    $result['total_pages']=(int)$total_pages; 
		$result['success'] = true;
    $result['rows'] = $xsd;
		
	} else {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($result));
		
}

private static function  wxcpghdlist($link) {	
$pagesize =0 ;	
if(isset($_GET['pagesize'])) {
  $pagesize =(int)$_GET['pagesize'];
}
$currentpage =1 ;
if(isset($_GET['page'])) {
  $currentpage =(int)$_GET['page'];
}
$ghid=0;
if(isset($_GET['ghid']))
{
	$ghid=(int)$_GET["ghid"];
}

$khid=0;
if(isset($_GET['khid']))
{
	$khid=(int)$_GET["khid"];
}
$ckid=0;
if(isset($_GET['ckid']))
{
	$ckid=(int)$_GET["ckid"];
}
$loc='';
if(isset($_GET['loc']))
{
	$loc=$_GET["loc"];
}
$delete=0;
if(isset($_GET['delete']))
{
	$loc=(int)$_GET["delete"];
}


	if ($ghid>0)
	{
	  $loc="ghid";	
	}
	$filter="";


  switch($loc) 
		{
      	case 'wxcpghdsh' :
		   
		   $filter .=" and wxcpghd.ztbz=0 and wxcpghd.delbz=0 ";   //.$khkd;
		  
		   break;
	  	case 'wxcpghdmfh' :
			$filter .=" and wxcpghd.ztbz=1 and wxcpghd.delbz=0 and wxcpghd.fhbz<1 ";  
			if ($_GET["startdate"])
    		{
    			$filter .=" and wxcpghd.xsrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			{
	    		$filter .=" and wxcpghd.xsrq<='".$_GET["enddate"]."'";
		    }	


			//	$filter .=" and wxcpghd.ztbz=1 and wxcpghd.fhbz<1 ";  
	  		break;
	  	case 'wxcpghdmfhck' :
   			$filter .=" and wxcpghd.ztbz=1 and wxcpghd.delbz=0 and wxcpghd.fhbz<1 and wxcpghd.cdbz=0 ";  
	  		break;

	  	case 'wxcpghdloc_kh' :
  			$filter .=" and (wxcpghd.ztbz>0 and wxcpghd.delbz=0) ";
	  		if ($_GET["startdate"])
    		{
    			$filter .=" and wxcpghd.xsrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			{
	    		$filter .=" and wxcpghd.xsrq<='".$_GET["enddate"]."'";
		    }	
			//if ($_GET["deletebz"]=="0")
			//{
				$filter .= " and wxcpghd.delbz=".$delete;
			//}

		  	break;
        /*
   	  	case 'wxcpghddelloc' :
	  		$filter .=" and (wxcpghd.ztbz>0 and wxcpghd.delbz=1) ";
		  	if ($_GET["startdate"])
    		{
    			$filter .=" and wxcpghd.xsrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			{
	    		$filter .=" and wxcpghd.xsrq<='".$_GET["enddate"]."'";
		    }	
			//if ($_GET["deletebz"]=="0")
			//{
			$filter .= " and wxcpghd.delbz=".$delete;
			//}

		  	break;*/

    	}
		if ($ghid>0)
		{
			$filter =" and wxcpghd.ghid=".$ghid;
		}
    
		if ($khid>0)
    	{
    		$filter .=" and wxcpghd.khid=".$khid;
    	}
    	if ($ckid>0)
    	{
    		$filter .=" and wxcpghd.L_id=".$ckid;
    	}
		$sqlstr1 =" wxcpghd.*,ghid as id FROM wxcpghd where  ghid>0 ".$filter ;

	

  $sqlstr ="SELECT SQL_CALC_FOUND_ROWS ".$sqlstr1;

  if ($pagesize>0){
     $sqlstr .=" limit ".(($currentpage-1)*$pagesize).",".$pagesize  ;
  }


  $xsdquery = mysqli_query($link," ".$sqlstr);
  $cur_rows=mysqli_num_rows($xsdquery);
	
	$total_rows =mysqli_fetch_array(mysqli_query($link,"select found_rows()"))[0];
  $total_pages=1;
  
  if ($pagesize>0){
      $total_pages=($total_rows +$pagesize - 1) / $pagesize;
  }

  $sqlstr =" select ".$sqlstr1;








 $mxsqlstr = " SELECT  m.*,bz.ps_name as bzmc	
 FROM wxcpghdmx m,wxcpghd,packing bz,(".$sqlstr.") xsd  
 where wxcpghd.ghid=m.ghid and bz.PS_id=m.bzid  and xsd.ghid=m.ghid ";	

//return $mxsqlstr;
	$xsdmxquery = mysqli_query($link,$mxsqlstr);




	
		if ($xsdquery) {

		$menutype = "";
		$xsd = array();
		$menu_cpkc = array();

		while ($xsdrow = mysqli_fetch_array($xsdquery)) {
			$id = $xsdrow['ghid'];
			$fields=mysqli_num_fields($xsdquery);
			$my_array = array();
			for ($i = 0; $i <$fields ; $i++) {
			    $field_info =mysqli_fetch_field_direct($xsdquery, $i);
				  $newvar = $xsdrow[$field_info->name];
				  $my_array[$field_info->name] = urlencode($newvar);
			};


     	$my_array1 = array();
			mysqli_data_seek($xsdmxquery, 0);

			while ($row = mysqli_fetch_array(	$xsdmxquery)) {
				if ($row['ghid'] == $id) {
					$my_array2 = array();
					$fields=mysqli_num_fields(	$xsdmxquery);
					for ($i = 0; $i <$fields ; $i++) {
					     $field_info =mysqli_fetch_field_direct(	$xsdmxquery, $i);
						 $newvar = $row[$field_info->name];
						 $my_array2[$field_info->name] = urlencode($newvar);
					};
					array_push($my_array1, $my_array2);
				}
			}
      
      $my_array['xsdmx'] =$my_array1 ;


			array_push($xsd, $my_array);
		}
    $result['total_rows']=(int)$total_rows; 
    $result['cur_rows']=(int)$cur_rows; 
    $result['pagesize']=$pagesize; 
    $result['cur_pages']=(int)$currentpage; 
    $result['total_pages']=(int)$total_pages; 
    
    $result['sql']=$sqlstr; 
    $result['sqlmx']=$mxsqlstr; 
		$result['success'] = true;
    $result['rows'] = $xsd;
		
	} else {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($result));
		
}

private static function  cpckdgl($link) {	

$xsdh=$_GET["xsdh"];

$sqlstr="select * from cpxsd where ztbz=1 and fhbz<2 and xsdh='".$xsdh."'";
$xsdquery = mysqli_query($link," ".$sqlstr);
if (!$xsdquery) {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	  return urldecode(json_encode($result));
}


$mxsqlstr = " SELECT  m.*,bz.ps_name as bzmc,m.xssl-m.ccsl as mfhsl,m.xszl-m.cczl as mfhzl	
FROM cpxsdmx m,cpxsd,packing bz where cpxsd.xsid=m.xsid and bz.PS_id=m.bzid ";	
$xsdmxquery = mysqli_query($link,$mxsqlstr);
	
if ($xsdmxquery) {
  		$menutype = "";
	  	$xsd = array();
		  $menu_cpkc = array();
		  while ($xsdrow = mysqli_fetch_array($xsdquery)) {
			  $id = $xsdrow['xsid'];
			  $fields=mysqli_num_fields($xsdquery);
			  $my_array = array();
			  for ($i = 0; $i <$fields ; $i++) {
			      $field_info =mysqli_fetch_field_direct($xsdquery, $i);
				    $newvar = $xsdrow[$field_info->name];
				    $my_array[$field_info->name] = urlencode($newvar);
			  };
     	  $my_array1 = array();
			  mysqli_data_seek($xsdmxquery, 0);
			  while ($row = mysqli_fetch_array(	$xsdmxquery)) {
				  if ($row['xsid'] == $id) {
					  $my_array2 = array();
					  $fields=mysqli_num_fields(	$xsdmxquery);
					  for ($i = 0; $i <$fields ; $i++) {
					     $field_info =mysqli_fetch_field_direct(	$xsdmxquery, $i);
						   $newvar = $row[$field_info->name];
						  $my_array2[$field_info->name] = urlencode($newvar);
					  };
					array_push($my_array1, $my_array2);
				}
			}
      $my_array['xsdmx'] =$my_array1 ;
			array_push($xsd, $my_array);
		}
		$result['success'] = true;
    $result['rows'] = $xsd;
		
	} else {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'.$mxsqlstr));
	}
	return urldecode(json_encode($result));
}

private static function  cpjkdlist($link) {	

$pagesize =0 ;	
if(isset($_GET['pagesize'])) {
  $pagesize =(int)$_GET['pagesize'];
}
$currentpage =1 ;
if(isset($_GET['page'])) {
  $currentpage =(int)$_GET['page'];
}


  $khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$kh=(int)$_GET["kh"];
	$loc=$_GET["loc"];

	
   
		$filter =" and cpjkd.ztbz>0  and cpjkd.delbz=0 ";
	  		if ($_GET["startdate"])
    		{
      			$filter .=" and cpjkd.czrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			  {
	    		$filter .=" and cpjkd.czrq<='".$_GET["enddate"]."'";
		    }	
	  if ($loc=="cpjkdmsh") 
		{
		      $filter =" and cpjkd.ztbz<2 and cpjkd.delbz=0 ";   
		}
    if ($loc=="cpjkdcwsh") 
		{
		      $filter =" and cpjkd.ztbz=2 and cpjkd.delbz=0 ";   
		}
		if ($khid>0)
    {
    		$filter .=" and cpjkd.khid=".$khid;
    }
    if ($ckid>0)
    {
    		$filter .=" and cpjkd.L_id=".$ckid;
    }
		$sqlstr1 =" cpjkd.*,jkid as id,ck.L_name as ckmc,c_shortname as khjc  FROM customer c, cpjkd,location ck where cpjkd.L_id=ck.l_id and cpjkd.delbz=0 and c.c_id=cpjkd.khid  ".$filter ;
	
	

  $sqlstr ="SELECT SQL_CALC_FOUND_ROWS ".$sqlstr1;

  if ($pagesize>0){
     $sqlstr .=" limit ".(($currentpage-1)*$pagesize).",".$pagesize  ;
  }


  $xsdquery = mysqli_query($link," ".$sqlstr);
  $cur_rows=mysqli_num_rows($xsdquery);
	
	$total_rows =mysqli_fetch_array(mysqli_query($link,"select found_rows()"))[0];
  $total_pages=1;
  
  if ($pagesize>0){
      $total_pages=($total_rows +$pagesize - 1) / $pagesize;
  }

  $sqlstr =" select ".$sqlstr1;















	
	



 $mxsqlstr = " SELECT 0 as jeid, m.*,bz.ps_name as bzmc	,'' as byg,'' as gs,'' as cg
 FROM cpjkdmx m,cpjkd,packing bz,(".$sqlstr.") jkd  
 where cpjkd.jkid=m.jkid and bz.PS_id=m.bzid  and jkd.jkid=m.jkid ";	

//return $mxsqlstr;
	$xsdmxquery = mysqli_query($link,$mxsqlstr);

 $jesqlstr = " SELECT  je.jeid ,m.mxid ,0 as jcsl,je.sl as jczl,je.dj as czdj,je.je as jcje,je.work as cpmc,je.dw as jldw,je.byg,je.gs,je.cg	
FROM cpjkdje je, cpjkdmx m,cpjkd,packing bz,(".$sqlstr.") jkd  
 where m.mxid=je.mxid and cpjkd.jkid=m.jkid and bz.PS_id=m.bzid  and jkd.jkid=m.jkid ";	

//return $jesqlstr;
	$jequery = mysqli_query($link,$jesqlstr);



	
		if ($xsdquery) {

		$menutype = "";
		$xsd = array();
    $jeid=0;
		$menu_cpkc = array();

		while ($xsdrow = mysqli_fetch_array($xsdquery)) {
			$id = $xsdrow['jkid'];
			$fields=mysqli_num_fields($xsdquery);
			$my_array = array();
      $my_array['kh'] =$kh;
			for ($i = 0; $i <$fields ; $i++) {
			    $field_info =mysqli_fetch_field_direct($xsdquery, $i);
				  $newvar = $xsdrow[$field_info->name];
				  $my_array[$field_info->name] = urlencode($newvar);
			};


     	$my_array1 = array();
			mysqli_data_seek($xsdmxquery, 0);

			while ($row = mysqli_fetch_array(	$xsdmxquery)) {
				if ($row['jkid'] == $id) {
					$my_array2 = array();
					$fields=mysqli_num_fields(	$xsdmxquery);
          $jeid = $row['mxid'];
					for ($i = 0; $i <$fields ; $i++) {
					   $field_info =mysqli_fetch_field_direct(	$xsdmxquery, $i);
						 $newvar = $row[$field_info->name];
						 $my_array2[$field_info->name] = urlencode($newvar);
					};
					array_push($my_array1, $my_array2);
   				if ($kh==0){
          mysqli_data_seek($jequery,0);
          while ($jerow = mysqli_fetch_array($jequery)) {
                if ($jerow['mxid'] == $jeid) {
                  $my_array2 = array();
                  $fields=mysqli_num_fields($jequery);
  					      for ($i = 0; $i <$fields ; $i++) {
					          $field_info =mysqli_fetch_field_direct(	$jequery, $i);
						        $newvar = $jerow[$field_info->name];
						        $my_array2[$field_info->name] = urlencode($newvar);
	  				      };
		  			      array_push($my_array1, $my_array2);
                }
            }
           }
				}
			}
      
      $my_array['jkdmx'] =$my_array1 ;


			array_push($xsd, $my_array);
		}
		
    $result['total_rows']=(int)$total_rows; 
    $result['cur_rows']=(int)$cur_rows; 
    $result['pagesize']=$pagesize; 
    $result['cur_pages']=(int)$currentpage; 
    $result['total_pages']=(int)$total_pages; 
		$result['success'] = true;
    $result['rows'] = $xsd;
		
		
	} else {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($result));
	
}

private static function  cpjkdwz($link) {	
	
	
	
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$loc=$_GET["loc"];

	

		$filter =" and cpjkd.ztbz>2  and cpjkd.delbz=0 ";
	  		if ($_GET["startdate"])
    		{
      			$filter .=" and cpjkd.czrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			  {
	    		$filter .=" and cpjkd.czrq<='".$_GET["enddate"]."'";
		    }	



		
    if ($ckid>0)
    {
    		$filter .=" and cpjkd.L_id=".$ckid;
    }
	  if ($loc=="cpjkdwz") 
		{
		

		$sqlstr ="SELECT  cpjkd.khid,c_shortname as khjc,sum(mx.jcsl) as jcsl,sum(mx.jczl) as jczl  
    FROM customer c, cpjkd,cpjkdmx mx
    where cpjkd.jkid=mx.jkid and c.c_id=cpjkd.khid  ".$filter ;
    $sqlstr =$sqlstr." group by khid,khjc";
		}else{
      if ($khid>0)
      {
    		$filter .=" and cpjkd.khid=".$khid;
      }
      $sqlstr ="SELECT  mx.cpid,mx.cpmc ,sum(mx.jcsl) as jcsl,sum(mx.jczl) as jczl  
      FROM cpjkd,cpjkdmx mx
      where cpjkd.jkid=mx.jkid  ".$filter ;
      $sqlstr =$sqlstr." group by cpid,cpmc";


    }


		$xsdquery = mysqli_query($link,$sqlstr);
		if ($xsdquery) {
  		$xsd = array();
	  	while ($xsdrow = mysqli_fetch_array($xsdquery)) {
		  	$fields=mysqli_num_fields($xsdquery);
  			$my_array = array();
	  		for ($i = 0; $i <$fields ; $i++) {
			    $field_info =mysqli_fetch_field_direct($xsdquery, $i);
				  $newvar = $xsdrow[$field_info->name];
				  $my_array[$field_info->name] = urlencode($newvar);
		  	};
			  array_push($xsd, $my_array);
		  }
		  $result['rows'] = $xsd;
		  $result['success'] = true;
	  } 
    else
    {
		  $result['success'] = false;
		  $result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	  }
	return urldecode(json_encode($result));
	
}

private static function  cpckdwz($link) {	
	
	
	
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$loc=$_GET["loc"];

	

		$filter =" and cpckd.ztbz>2  and cpckd.delbz=0 ";
	  		if ($_GET["startdate"])
    		{
      			$filter .=" and cpckd.ckrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			  {
	    		$filter .=" and cpckd.ckrq<='".$_GET["enddate"]."'";
		    }	



		
    if ($ckid>0)
    {
    		$filter .=" and cpxsd.L_id=".$ckid;
    }
	  if ($loc=="cpckdwz") 
		{
  		$sqlstr ="SELECT  cpxsd.khid,c_shortname as khjc,sum(mx.ccsl) as ccsl,sum(mx.cczl) as cczl  
      FROM customer c, cpckd,cpckdmx mx,cpxsd 
      where cpckd.ckid=mx.ckid and cpckd.xsid=cpxsd.xsid and c.c_id=cpxsd.khid  ".$filter ;
      $sqlstr =$sqlstr." group by khid,khjc";
		}else{
      if ($khid>0)
      {
    		$filter .=" and cpxsd.khid=".$khid;
      }
      $sqlstr ="SELECT  cpxsdmx.cpid,cpxsdmx.cpmc ,SUM(mx.ccsl) AS ccsl,SUM(mx.cczl) AS cczl  
      FROM cpckd,cpckdmx mx ,cpxsd,cpxsdmx 
      WHERE cpckd.ckid=mx.ckid AND cpxsd.xsid=cpckd.xsid  AND mx.xsmxid=cpxsdmx.mxid  ".$filter ;
      $sqlstr =$sqlstr." group by cpid,cpmc";


    }


		$xsdquery = mysqli_query($link,$sqlstr);
		if ($xsdquery) {
  		$xsd = array();
	  	while ($xsdrow = mysqli_fetch_array($xsdquery)) {
		  	$fields=mysqli_num_fields($xsdquery);
  			$my_array = array();
	  		for ($i = 0; $i <$fields ; $i++) {
			    $field_info =mysqli_fetch_field_direct($xsdquery, $i);
				  $newvar = $xsdrow[$field_info->name];
				  $my_array[$field_info->name] = urlencode($newvar);
		  	};
			  array_push($xsd, $my_array);
		  }
		  $result['rows'] = $xsd;
		  $result['success'] = true;
	  } 
    else
    {
		  $result['success'] = false;
		  $result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'.  $sqlstr));
	  }
	return urldecode(json_encode($result));
	
}

private static function  cpjcttloc($link) {	
	
	
	
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$loc=$_GET["loc"];

$year=(int)$_GET["year"];
$month=(int)$_GET["month"];
$day=(int)$_GET["day"];
	

		$filter =" and d.delbz=0 ";
		$filter1 =" and d.delbz=0 ";
 		$filter2 =" and d.delbz=0 ";
    $filter3 =" and d.delbz=0 ";
    

	  		if ($year>0)
    		{
      			$filter .=" and YEAR(d.czrq)=".$year;
            $filter1 .=" and YEAR(d.ckrq)=".$year;
            $filter2 .=" and YEAR(d.gfrq)=".$year;
            $filter3 .=" and YEAR(d.tzrq)=".$year;
    		}

	  		if ($month>0)
    		{
      			$filter .=" and MONTH(d.czrq)=".$month;
            $filter1 .=" and MONTH(d.ckrq)=".$month;
            $filter2 .=" and MONTH(d.gfrq)=".$month;
            $filter3 .=" and MONTH(d.tzrq)=".$month;
    		}
	  		if ($day>0)
    		{
      			$filter .=" and DAYOFMONTH(d.czrq)=".$day;
            $filter1 .=" and DAYOFMONTH(d.ckrq)=".$day;
            $filter2 .=" and DAYOFMONTH(d.gfrq)=".$day;
            $filter3 .=" and DAYOFMONTH(d.tzrq)=".$day;
    		}
		
    if ($ckid>0)
    {
    		$filter .=" and d.L_id=".$ckid;
        $filter1 .=" and cpxsd.L_id=".$ckid;
        $filter2 .=" and d.L_id=".$ckid;
        $filter3 .=" and d.L_id=".$ckid;
    }
  



	  	

	  if ($loc=="khwz") 
		{
    		$sqlstr ="SELECT  d.khid as id ,d.khmc as mc,mx.jcsl as jcsl,mx.jczl as jczl  
        FROM  cpjkd d,cpjkdmx mx
        where d.jkid=mx.jkid and d.ztbz>2  ".$filter ;
       
        $sqlstr1 ="SELECT  cpxsd.khid as id ,cpxsd.khmc as mc,mx.ccsl as jcsl,mx.cczl as jczl  
        FROM  cpckd d,cpckdmx mx,cpxsd,cpxsdmx
        where d.ckid=mx.ckid  and d.ztbz>2 and cpxsd.xsid=cpxsdmx.xsid and cpxsdmx.mxid=mx.xsmxid ".$filter1 ;

	      $sqlstr2 ="SELECT  d.khid as id ,d.khmc as mc,mx.sl as jcsl,mx.zl as jczl  
        FROM  cpgfd d,cpgfdmx mx
        where d.gfid=mx.gfid and  d.ztbz>0 ".$filter2 ;
       
        $sqlstr3 ="SELECT  d.khid as id ,d.khmc as mc,mx.tzsl as jcsl,mx.tzzl as jczl  
        FROM  cptzd d,cptzdmx mx
        where d.tzid=mx.tzid and d.khid<>d.newkhid and  d.ztbz>0  ".$filter3 ;
        $sqlstr4 ="SELECT  d.newkhid as id ,d.newkhmc as mc,mx.tzsl as jcsl,mx.tzzl as jczl  
        FROM  cptzd d,cptzdmx mx
        where d.tzid=mx.tzid and d.khid<>d.newkhid and  d.ztbz>0 ".$filter3 ;

       // $sqlstr =$sqlstr." group by id,mc";
		}else{
      $filter4=$filter3;
      if ($khid>0)
      {
    		$filter  .=" and d.khid=".$khid;
        $filter1 .=" and cpxsd.khid=".$khid;
        $filter2 .=" and d.khid=".$khid;
        $filter3 .=" and d.khid=".$khid;
        $filter4 .=" and d.newkhid=".$khid;

      }
        $sqlstr ="SELECT  mx.cpid as id, mx.cpmc as mc ,mx.jcsl as jcsl,mx.jczl as jczl  
          FROM cpjkd d,cpjkdmx mx
          where d.jkid=mx.jkid  and d.ztbz>2 ".$filter ;
        
        $sqlstr1 ="SELECT  cpxsdmx.cpid as id ,cpxsdmx.cpmc  as mc,mx.ccsl as jcsl,mx.cczl as jczl  
        FROM  cpckd d,cpckdmx mx,cpxsd,cpxsdmx
        where d.ckid=mx.ckid  and d.ztbz>2 and cpxsd.xsid=cpxsdmx.xsid and cpxsdmx.mxid=mx.xsmxid ".$filter1 ;

	      $sqlstr2 ="SELECT  0 as id ,mx.xmmc as mc,mx.sl as jcsl,mx.zl as jczl  
        FROM  cpgfd d,cpgfdmx mx
        where d.gfid=mx.gfid and  d.ztbz>0 ".$filter2 ;
        
        $sqlstr3 ="SELECT  mx.cpid as id ,mx.cpmc as mc,mx.tzsl as jcsl,mx.tzzl as jczl  
        FROM  cptzd d,cptzdmx mx
        where d.tzid=mx.tzid and d.khid<>d.newkhid and  d.ztbz>0 ".$filter3 ;

        $sqlstr4 ="SELECT  mx.cpid as id ,mx.cpmc as mc,mx.tzsl as jcsl,mx.tzzl as jczl  
        FROM  cptzd d,cptzdmx mx
        where d.tzid=mx.tzid and d.khid<>d.newkhid and  d.ztbz>0 ".$filter4 ;


         // $sqlstr =$sqlstr." group by id,mc";
    }
 
    $sqlstr="select id,mc,sum(jcsl) as jcsl ,sum(jczl) as jczl from ((". $sqlstr. " ) union  all (".$sqlstr1. ") union  all (".$sqlstr2.")  union  all (".$sqlstr3.") union  all (".$sqlstr4.") ) w  group by id,mc " ;
    //return $sqlstr; 
		$xsdquery = mysqli_query($link,$sqlstr);
		if ($xsdquery) {
  		$xsd = array();
	  	while ($xsdrow = mysqli_fetch_array($xsdquery)) {
		  	$fields=mysqli_num_fields($xsdquery);
  			$my_array = array();
	  		for ($i = 0; $i <$fields ; $i++) {
			    $field_info =mysqli_fetch_field_direct($xsdquery, $i);
				  $newvar = $xsdrow[$field_info->name];
				  $my_array[$field_info->name] = urlencode($newvar);
		  	};
			  array_push($xsd, $my_array);
		  }
		  $result['rows'] = $xsd;
		  $result['success'] = true;
	  } 
    else
    {
		  $result['success'] = false;
		  $result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	  }
	return urldecode(json_encode($result));

}
private static function cpgfdlist($link) {


	
$pagesize =0 ;	
if(isset($_GET['pagesize'])) {
  $pagesize =(int)$_GET['pagesize'];
}
$currentpage =1 ;
if(isset($_GET['page'])) {
  $currentpage =(int)$_GET['page'];
}

  $khid = (int)$_GET["khid"];
  $ckid = (int)$_GET["ckid"];
  $kh = (int)$_GET["kh"];
  $loc = $_GET["loc"];
  $filter = " and cpgfd.ztbz>0  and cpgfd.delbz=0 ";
  if ($_GET["startdate"]) {
      $filter.= " and cpgfd.gfrq>='".$_GET["startdate"]."'";
  }
  if ($_GET["enddate"]) {
      $filter.= " and cpgfd.gfrq<='".$_GET["enddate"]."'";
  }
  if ($loc == "cpgfdmsh") {
      $filter = " and cpgfd.ztbz<2 and cpgfd.delbz=0 ";
  }
  if ($loc == "cpgfdcwsh") {
      $filter = " and cpgfd.ztbz=2 and cpgfd.delbz=0 ";
  }
  if ($khid > 0) {
      $filter.= " and cpgfd.khid=".$khid;
  }
  if ($ckid > 0) {
     $filter.= " and cpgfd.L_id=".$ckid;
  }
  $sqlstr1 = " cpgfd.*,gfid as id,c_shortname as khjc  FROM customer c, cpgfd,location ck where cpgfd.L_id=ck.l_id and cpgfd.delbz=0 and c.c_id=cpgfd.khid  ".$filter;

  $sqlstr ="SELECT SQL_CALC_FOUND_ROWS ".$sqlstr1;

  if ($pagesize>0){
     $sqlstr .=" limit ".(($currentpage-1)*$pagesize).",".$pagesize  ;
  }


  $xsdquery = mysqli_query($link," ".$sqlstr);
  $cur_rows=mysqli_num_rows($xsdquery);
	
	$total_rows =mysqli_fetch_array(mysqli_query($link,"select found_rows()"))[0];
  $total_pages=1;
  
  if ($pagesize>0){
      $total_pages=($total_rows +$pagesize - 1) / $pagesize;
  }

  $sqlstr =" select ".$sqlstr1;


  $mxsqlstr = " SELECT 0 as jeid, m.*
  FROM cpgfdmx m, cpgfd,  (".$sqlstr.") gfd
  where cpgfd.gfid = m.gfid  and gfd.gfid = m.gfid ";	

  //return $mxsqlstr;
  $xsdmxquery = mysqli_query($link, $mxsqlstr);

  if ($xsdquery) {

    $menutype = "";
    $xsd = array();
    $jeid = 0;
    $menu_cpkc = array();

    while ($xsdrow = mysqli_fetch_array($xsdquery)) {
      $id = $xsdrow['gfid'];
      $fields = mysqli_num_fields($xsdquery);
      $my_array = array();
      $my_array['kh'] = $kh;
      for ($i = 0; $i < $fields; $i++) {
        $field_info = mysqli_fetch_field_direct($xsdquery, $i);
        $newvar = $xsdrow[$field_info -> name];
        $my_array[$field_info -> name] = urlencode($newvar);
      };


      $my_array1 = array();
      mysqli_data_seek($xsdmxquery, 0);

      while ($row = mysqli_fetch_array($xsdmxquery)) {
        if ($row['gfid'] == $id) {
          $my_array2 = array();
          $fields = mysqli_num_fields($xsdmxquery);
          $jeid = $row['mxid'];
          for ($i = 0; $i < $fields; $i++) {
            $field_info = mysqli_fetch_field_direct($xsdmxquery, $i);
            $newvar = $row[$field_info -> name];
            $my_array2[$field_info -> name] = urlencode($newvar);
          };
          array_push($my_array1, $my_array2);
          
        }
      }

      $my_array['gfdmx'] = $my_array1;
      array_push($xsd, $my_array);
    }

		
    $result['total_rows']=(int)$total_rows; 
    $result['cur_rows']=(int)$cur_rows; 
    $result['pagesize']=$pagesize; 
    $result['cur_pages']=(int)$currentpage; 
    $result['total_pages']=(int)$total_pages; 
		$result['success'] = true;
    $result['rows'] = $xsd;


  } else {
    $result['success'] = false;
    $result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
  }
  return urldecode(json_encode($result));

}




private static function wxcpgfdlist($link) {


	
$pagesize =0 ;	
if(isset($_GET['pagesize'])) {
  $pagesize =(int)$_GET['pagesize'];
}
$currentpage =1 ;
if(isset($_GET['page'])) {
  $currentpage =(int)$_GET['page'];
}

  $khid = (int)$_GET["khid"];
  $ckid = (int)$_GET["ckid"];
  $kh = (int)$_GET["kh"];
  $loc = $_GET["loc"];
  if ($loc=='cpgfdsh'){
      $filter = " and wxcpgfd.ztbz=0  and wxcpgfd.delbz=0 ";
  }else{
      $filter = " and wxcpgfd.ztbz=1  and wxcpgfd.delbz=0 ";

      if ($_GET["startdate"]) {
         $filter.= " and wxcpgfd.kdrq>='".$_GET["startdate"]."'";
      }
      if ($_GET["enddate"]) {
         $filter.= " and wxcpgfd.kdrq<='".$_GET["enddate"]."'";
      }
  }
  if ($khid > 0) {
      $filter.= " and wxcpgfd.khid=".$khid;
  }
  if ($ckid > 0) {
     $filter.= " and wxcpgfd.L_id=".$ckid;
  }
  $sqlstr1 = " wxcpgfd.*,gfid as id,c_shortname as khjc  FROM customer c, wxcpgfd,location ck where wxcpgfd.L_id=ck.l_id and wxcpgfd.delbz=0 and c.c_id=wxcpgfd.khid  ".$filter;

  $sqlstr ="SELECT SQL_CALC_FOUND_ROWS ".$sqlstr1;

  if ($pagesize>0){
     $sqlstr .=" limit ".(($currentpage-1)*$pagesize).",".$pagesize  ;
  }


  $xsdquery = mysqli_query($link," ".$sqlstr);
  $cur_rows=mysqli_num_rows($xsdquery);
	
	$total_rows =mysqli_fetch_array(mysqli_query($link,"select found_rows()"))[0];
  $total_pages=1;
  
  if ($pagesize>0){
      $total_pages=($total_rows +$pagesize - 1) / $pagesize;
  }

  $sqlstr =" select ".$sqlstr1;


  $mxsqlstr = " SELECT 0 as jeid, m.*
  FROM wxcpgfdmx m, wxcpgfd,  (".$sqlstr.") gfd
  where wxcpgfd.gfid = m.gfid  and gfd.gfid = m.gfid ";	

  //return $mxsqlstr;
  $xsdmxquery = mysqli_query($link, $mxsqlstr);

  if ($xsdquery) {

    $menutype = "";
    $xsd = array();
    $jeid = 0;
    $menu_cpkc = array();

    while ($xsdrow = mysqli_fetch_array($xsdquery)) {
      $id = $xsdrow['gfid'];
      $fields = mysqli_num_fields($xsdquery);
      $my_array = array();
      $my_array['kh'] = $kh;
      for ($i = 0; $i < $fields; $i++) {
        $field_info = mysqli_fetch_field_direct($xsdquery, $i);
        $newvar = $xsdrow[$field_info -> name];
        $my_array[$field_info -> name] = urlencode($newvar);
      };


      $my_array1 = array();
      mysqli_data_seek($xsdmxquery, 0);

      while ($row = mysqli_fetch_array($xsdmxquery)) {
        if ($row['gfid'] == $id) {
          $my_array2 = array();
          $fields = mysqli_num_fields($xsdmxquery);
          $jeid = $row['mxid'];
          for ($i = 0; $i < $fields; $i++) {
            $field_info = mysqli_fetch_field_direct($xsdmxquery, $i);
            $newvar = $row[$field_info -> name];
            $my_array2[$field_info -> name] = urlencode($newvar);
          };
          array_push($my_array1, $my_array2);
          
        }
      }

      $my_array['gfdmx'] = $my_array1;
      array_push($xsd, $my_array);
    }

		
    $result['total_rows']=(int)$total_rows; 
    $result['cur_rows']=(int)$cur_rows; 
    $result['pagesize']=$pagesize; 
    $result['cur_pages']=(int)$currentpage; 
    $result['total_pages']=(int)$total_pages; 
		$result['success'] = true;
    $result['rows'] = $xsd;


  } else {
    $result['success'] = false;
    $result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
  }
  return urldecode(json_encode($result));

}




private static function  cpckdlist($link) {	
	
$pagesize =0 ;	
if(isset($_GET['pagesize'])) {
  $pagesize =(int)$_GET['pagesize'];
}
$currentpage =1 ;
if(isset($_GET['page'])) {
  $currentpage =(int)$_GET['page'];
}

	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$kh=(int)$_GET["kh"];
	$loc=$_GET["loc"];

	

		$filter =" and cpckd.ztbz>0  and cpckd.delbz=0 ";
	  		if ($_GET["startdate"])
    		{
      			$filter .=" and cpckd.ckrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			  {
	    		$filter .=" and cpckd.ckrq<='".$_GET["enddate"]."'";
		    }	


	    if ($loc=="cpckdmsh") 
		   {
    	 	  $filter =" and cpckd.ztbz=0 and cpckd.delbz=0 ";   
		   }
      if ($loc=="cpckdcksh") 
		   {
    	 	  $filter ="  and cpckd.ztbz=1 and cpckd.delbz=0 ";   
		   }
      if ($loc=="cpckdcwsh") 
		   {
    	 	  $filter ="  and cpckd.ztbz=2 and cpckd.delbz=0 ";   
		   }



    


		if ($khid>0)
    {
    		$filter .=" and cpxsd.khid=".$khid;
    }
    if ($ckid>0)
    {
    		$filter .=" and ck.L_id=".$ckid;
    }

$sqlstr1 =" cpckd.ckid,cpckd.delbz,cpckd.`xsid`
    , cpckd.`ckrq`
    , cpckd.`czy`
    , cpckd.`shr`
    , cpckd.`cnote`
    , cpckd.`thr`
    , cpckd.`rq`
    , cpckd.`shrq`
    , cpckd.`ckdh`
    , cpckd.`cphm`
    , cpckd.`cgy`,cpckd.ckid as id,ck.L_name as ckmc,c_shortname as khjc,cpxsd.sfdh FROM customer c, cpckd,location ck,cpxsd where cpxsd.L_id=ck.l_id and cpckd.delbz=0 and c.c_id=cpxsd.khid and cpxsd.xsid=cpckd.xsid  ".$filter;
  $sqlstr ="SELECT SQL_CALC_FOUND_ROWS ".$sqlstr1;
  if ($pagesize>0){
     $sqlstr .=" limit ".(($currentpage-1)*$pagesize).",".$pagesize  ;
  }


  $xsdquery = mysqli_query($link," ".$sqlstr);
  $cur_rows=mysqli_num_rows($xsdquery);
	
	$total_rows =mysqli_fetch_array(mysqli_query($link,"select found_rows()"))[0];
  $total_pages=1;
  
  if ($pagesize>0){
      $total_pages=($total_rows +$pagesize - 1) / $pagesize;
  }
  $sqlstr =" select ".$sqlstr1;




//$sqlstr ="SELECT ".$sqlstr  ;

 $mxsqlstr = " SELECT 0 as jeid, m.*,bz.ps_name as bzmc	,
 cpxsdmx.cdmc,cpxsdmx.cpmc,cpxsdmx.cpph,cpxsdmx.cpgg,
 '' as byg,'' as gs,'' as cg
 FROM cpckdmx m,cpckd,cpxsdmx,packing bz,(".$sqlstr.") ckd  
 where cpckd.ckid=m.ckid 
 AND ckd.xsid=cpxsdmx.xsid 
 AND m.xsmxid=cpxsdmx.mxid 
 and bz.PS_id=cpxsdmx.bzid and ckd.ckid=m.ckid ";	

//return $mxsqlstr;
	$xsdmxquery = mysqli_query($link,$mxsqlstr);


 $jesqlstr = " SELECT  je.jeid ,m.ckmxid ,0 as jcsl,je.sl as jczl,je.dj as czdj,je.je as jcje,je.work as cpmc,je.dw as jldw,je.byg,je.gs,je.cg	
FROM cpckdje je, cpckdmx m,cpckd,cpxsdmx,packing bz,(".$sqlstr.") ckd  
where m.ckmxid=je.ckmxid 
AND ckd.xsid=cpxsdmx.xsid 
AND m.xsmxid=cpxsdmx.mxid 
and cpckd.ckid=m.ckid and bz.PS_id=cpxsdmx.bzid  and ckd.ckid=m.ckid ";	

//return $jesqlstr;
	$jequery = mysqli_query($link,$jesqlstr);



	
		if ($xsdquery) {

	  	$menutype = "";
		  $xsd = array();
      $jeid=0;
		  $menu_cpkc = array();

		  while ($xsdrow = mysqli_fetch_array($xsdquery)) {
			    $id = $xsdrow['ckid'];
			    $fields=mysqli_num_fields($xsdquery);
			    $my_array = array();
          $my_array['kh'] =$kh;
			    for ($i = 0; $i <$fields ; $i++) {
			        $field_info =mysqli_fetch_field_direct($xsdquery, $i);
				      $newvar = $xsdrow[$field_info->name];
				      $my_array[$field_info->name] = urlencode($newvar);
			    };
         	$my_array1 = array();
		    	mysqli_data_seek($xsdmxquery, 0);

			    while ($row = mysqli_fetch_array(	$xsdmxquery)) {
				  if ($row['ckid'] == $id) {
					    $my_array2 = array();
					    $fields=mysqli_num_fields(	$xsdmxquery);
              $jeid = $row['ckmxid'];
					    for ($i = 0; $i <$fields ; $i++) {
					      $field_info =mysqli_fetch_field_direct(	$xsdmxquery, $i);
						    $newvar = $row[$field_info->name];
						    $my_array2[$field_info->name] = urlencode($newvar);
					    };
					    array_push($my_array1, $my_array2);
   				    if ($kh==0){
                mysqli_data_seek($jequery,0);
                while ($jerow = mysqli_fetch_array($jequery)) {
                  if ($jerow['ckmxid'] == $jeid) {
                      $my_array2 = array();
                      $fields=mysqli_num_fields($jequery);
  					          for ($i = 0; $i <$fields ; $i++) {
					                $field_info =mysqli_fetch_field_direct(	$jequery, $i);
						              $newvar = $jerow[$field_info->name];
						              $my_array2[$field_info->name] = urlencode($newvar);
	  				          };
		  			      array_push($my_array1, $my_array2);
                }
            }
           }
				}
			}
      
      $my_array['ckdmx'] =$my_array1 ;


			array_push($xsd, $my_array);
		}

		
    $result['total_rows']=(int)$total_rows; 
    $result['cur_rows']=(int)$cur_rows; 
    $result['pagesize']=$pagesize; 
    $result['cur_pages']=(int)$currentpage; 
    $result['total_pages']=(int)$total_pages; 
		$result['success'] = true;
    $result['rows'] = $xsd; 
		
	} else {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($result));
		
}


private static function  _cpckdlist($link) {	
	
	
	
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$kh=(int)$_GET["kh"];
	$loc=$_GET["loc"];


	

		$filter =" and cpckd.ztbz>0  and cpckd.delbz=0 ";
	  		if ($_GET["startdate"])
    		{
      			$filter .=" and cpckd.ckrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			  {
	    		$filter .=" and cpckd.ckrq<='".$_GET["enddate"]."'";
		    }	


	    if ($loc=="cpckdmsh") 
		   {
    	 	  $filter =" and cpckd.ztbz=0 and cpckd.delbz=0 ";   
		   }
      if ($loc=="cpckdcksh") 
		   {
    	 	  $filter ="  and cpckd.ztbz=1 and cpckd.delbz=0 ";   
		   }
      if ($loc=="cpckdcwsh") 
		   {
    	 	  $filter ="  and cpckd.ztbz=2 and cpckd.delbz=0 ";   
		   }



    


		if ($khid>0)
    {
    		$filter .=" and cpxsd.khid=".$khid;
    }
    if ($ckid>0)
    {
    		$filter .=" and ck.L_id=".$ckid;
    }

		$sqlstr ="SELECT  cpckd.*,cpckd.ckid as id,ck.L_name as ckmc,c_shortname as khjc,cpxsd.sfdh FROM customer c, cpckd,location ck,cpxsd where cpxsd.L_id=ck.l_id and cpckd.delbz=0 and c.c_id=cpxsd.khid and cpxsd.xsid=cpckd.xsid  ".$filter ;
		$xsdquery = mysqli_query($link,$sqlstr);




 $mxsqlstr = " SELECT 0 as jeid, m.*,bz.ps_name as bzmc	,
 cpxsdmx.cdmc,cpxsdmx.cpmc,cpxsdmx.cpph,cpxsdmx.cpgg,
 '' as byg,'' as gs,'' as cg
 FROM cpckdmx m,cpckd,cpxsdmx,packing bz,(".$sqlstr.") ckd  
 where cpckd.ckid=m.ckid 
 AND ckd.xsid=cpxsdmx.xsid 
 AND m.xsmxid=cpxsdmx.mxid 
 and bz.PS_id=cpxsdmx.bzid and ckd.ckid=m.ckid ";	

//return $mxsqlstr;
	$xsdmxquery = mysqli_query($link,$mxsqlstr);

 $jesqlstr = " SELECT  je.jeid ,m.ckmxid ,0 as jcsl,je.sl as jczl,je.dj as czdj,je.je as jcje,je.work as cpmc,je.dw as jldw,je.byg,je.gs,je.cg	
FROM cpckdje je, cpckdmx m,cpckd,cpxsdmx,packing bz,(".$sqlstr.") ckd  
where m.ckmxid=je.ckmxid 
AND ckd.xsid=cpxsdmx.xsid 
AND m.xsmxid=cpxsdmx.mxid 
and cpckd.ckid=m.ckid and bz.PS_id=cpxsdmx.bzid  and ckd.ckid=m.ckid ";	

//return $jesqlstr;
	$jequery = mysqli_query($link,$jesqlstr);



	
		if ($xsdquery) {

		$menutype = "";
		$xsd = array();
    $jeid=0;
		$menu_cpkc = array();

		while ($xsdrow = mysqli_fetch_array($xsdquery)) {
			$id = $xsdrow['ckid'];
			$fields=mysqli_num_fields($xsdquery);
			$my_array = array();
      $my_array['kh'] =$kh;
			for ($i = 0; $i <$fields ; $i++) {
			    $field_info =mysqli_fetch_field_direct($xsdquery, $i);
				  $newvar = $xsdrow[$field_info->name];
				  $my_array[$field_info->name] = urlencode($newvar);
			};


     	$my_array1 = array();
			mysqli_data_seek($xsdmxquery, 0);

			while ($row = mysqli_fetch_array(	$xsdmxquery)) {
				if ($row['ckid'] == $id) {
					$my_array2 = array();
					$fields=mysqli_num_fields(	$xsdmxquery);
          $jeid = $row['ckmxid'];
					for ($i = 0; $i <$fields ; $i++) {
					   $field_info =mysqli_fetch_field_direct(	$xsdmxquery, $i);
						 $newvar = $row[$field_info->name];
						 $my_array2[$field_info->name] = urlencode($newvar);
					};
					array_push($my_array1, $my_array2);
   				if ($kh==0){
          mysqli_data_seek($jequery,0);
          while ($jerow = mysqli_fetch_array($jequery)) {
                if ($jerow['ckmxid'] == $jeid) {
                  $my_array2 = array();
                  $fields=mysqli_num_fields($jequery);
  					      for ($i = 0; $i <$fields ; $i++) {
					          $field_info =mysqli_fetch_field_direct(	$jequery, $i);
						        $newvar = $jerow[$field_info->name];
						        $my_array2[$field_info->name] = urlencode($newvar);
	  				      };
		  			      array_push($my_array1, $my_array2);
                }
            }
           }
				}
			}
      
      $my_array['ckdmx'] =$my_array1 ;


			array_push($xsd, $my_array);
		}

		$result['rows'] = $xsd;
		$result['success'] = true;
		
	} else {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($result));
		
}


private static function  cpckdselectdata($link) {
  $khid= $_GET['khid'];
	$sqlstr = "SELECT cphm AS Name,'' AS Id FROM khcphm WHERE  khid=".$khid." AND cphm<>'' GROUP BY cphm ";
	$query = mysqli_query($link,$sqlstr);

	if ($query) {

		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
			     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["cphm"] = $menu_array1;

	    $sqlstr = "SELECT thr AS Name,'' AS Id,cphm FROM khcphm WHERE  khid=".$khid." AND thr<>'' GROUP BY cphm,thr ";
	    $query = mysqli_query($link,$sqlstr);
		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
				     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["sfr"] = $menu_array1;
		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));
}

private static function  cpgfdselectdata($link) {
  $khid= $_GET['khid'];
	$sqlstr = "SELECT cphm AS Name,'' AS Id,thr FROM khcphm WHERE  khid=".$khid." AND cphm<>'' GROUP BY cphm ";
	$query = mysqli_query($link,$sqlstr);

	if ($query) {

		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
			     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["cphm"] = $menu_array1;

	 $sqlstr = "SELECT thr AS Name,'' AS Id,cphm FROM khcphm WHERE  khid=".$khid." AND cphm<>'' and thr<>'' order by thr  ";
	 
	  $query = mysqli_query($link,$sqlstr);
		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
				     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["sfr"] = $menu_array1;




	  $sqlstr = "SELECT L_name AS Name,L_id AS Id FROM Location WHERE  active=1   GROUP BY L_code";
	  $query = mysqli_query($link,$sqlstr);
		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
				     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["ckmc"] = $menu_array1;



	  $sqlstr = "SELECT P_name AS Name,'' AS Id FROM produces WHERE  active=1   GROUP BY P_name";
	  $query = mysqli_query($link,$sqlstr);
		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
				     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["cdmc"] = $menu_array1;

	  $sqlstr = "SELECT S_name AS Name,S_id AS Id,Rate FROM commodity WHERE  active=1   GROUP BY S_name";
	  $query = mysqli_query($link,$sqlstr);
		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
				     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}

		$menu["cpmc"] = $menu_array1;

	$p_e_code ='1'; //$_GET["p_e_code"];
	
	$gfbz =0 ;// (int)$_GET["gfbz"];
	

	
  	$lid =(int)$_GET['L_id'];

  	$sqlstr = "	SELECT  `PS_id`,`PS_name` as Name ,'' As Id,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
`Weight_Status`,`PS_code`,`Active`,`E_code`,
a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,
c.*FROM packing a LEFT OUTER JOIN (
SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,Khps_id as id,Khid,mints  
FROM packing_kh WHERE khid=".$khid." and L_id=1 ) c ON a.PS_id=c.Pid 
where active=1 and  E_code='".$p_e_code."' and a.Xmlb=".$gfbz;

	$query = mysqli_query($link,$sqlstr);
		
		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
				     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}

		$menu["bzmc"] = $menu_array1;





		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));
}

private static function  cpjkdselectdata($link) {
   $lid= $_GET['ckid'];

	$sqlstr = "SELECT Name,'' AS Id  FROM worker  WHERE jobs=1 and active=1 and  l_id=".$lid;
	$query = mysqli_query($link,$sqlstr);
	if ($query) {
		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
			     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["byg"] = $menu_array1;

  $sqlstr = "SELECT Name,'' AS Id  FROM worker  WHERE jobs=2 and active=1 and  l_id=".$lid;
	
	  $query = mysqli_query($link,$sqlstr);
		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
				     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["gs"] = $menu_array1;

$sqlstr = "SELECT Name,'' AS Id  FROM worker  WHERE jobs=3 and active=1 and  l_id=".$lid;
	
	  $query = mysqli_query($link,$sqlstr);
		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
				     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["cg"] = $menu_array1;

		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));
}
private static function  cphmlist($link) {
	$sqlstr = " SELECT * FROM khcphm where khid=" . $_GET['khid'] . "  order by cphm ";
	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}
private static function  ckmclist($link) {
	$sqlstr = " SELECT l_id as Id,l_name as Name FROM location  where active=1   order by l_code ";
	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}
private static function  khmclist($link) {
	$sqlstr = " SELECT C_id as Id,C_shortname as Name,C_name as khmc FROM customer where active=1 and  C_name<>''  order by c_code ";
	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}


private static function  getckmclist($link) {
  $lidstring = $_GET['lidstring'];
  $sqlstr = " SELECT l_id as ckid,l_name as ckmc FROM location  where active=1 ";
 	if (strpos($lidstring,',')>-1 )
	{
	   $sqlstr .= "  and POSITION(CONCAT(',',L_id ,',') IN '".$lidstring."')>0 ";
	}
	$sqlstr = $sqlstr . " ORDER BY L_code";
	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}

private static function  getxsdcpkcmx($link) {
  $xsid = $_GET['xsid'];
  
  $sqlstr = " SELECT
    `cpkc`.`L_id`
    , `cpkc`.`khid`
    , `cpkc`.`cdid`
    , `cpkc`.`cpid`
    , `cpkc`.`cpph`
    , `cpkc`.`bzid`
    , `cpkc`.`cpgg`
    , `cpkc`.`jldw`
    , `cpkc`.`kcsl`
    , `cpkc`.`kcsl`
    ,  cpkcmx.area
    , `cpkcmx`.`cw`
    , `cpkcmx`.`sm`
    , `cpkcmx`.`czrq`
    , `cpkcmx`.`czdj`
    , `cpkcmx`.`sl`
    , `cpkcmx`.`zl`
    , `cpxsdmx`.`kcid`
    , `cpxsdmx`.`cdmc`
    , `cpxsdmx`.`cpmc`
    , `cpxsdmx`.`bzmc`
    ,  cpkcmx.id AS mxkcid
    ,0 AS cwccsl,0 AS cwcczl
FROM
    `wms`.`cpkcmx`
    INNER JOIN `wms`.`cpkc` 
        ON (`cpkcmx`.`kcid` = `cpkc`.`kcid`)
    INNER JOIN `wms`.`cpxsdmx` 
        ON (`cpxsdmx`.`kcid` = `cpkc`.`kcid`)
WHERE cpxsdmx.xsid=".$xsid;
	$sqlstr .=" and  cpkcmx.sl>0  ORDER BY cpxsdmx.mxid,cpkcmx.czrq,cpkcmx.cw ";
	//$menu['success'] = false;
//		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'.$sqlstr));
 //  	return urldecode(json_encode($menu));

	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}
private static function  getworklist($link) {
  $lid = $_GET['L_id'];
  $e_code = $_GET['E_code'];
  $sqlstr = " SELECT * FROM work where active=1 and (lidstring='' or  POSITION(CONCAT(',".$lid.",') IN lidstring )>0 )";
	$sqlstr .=" and E_code='".$e_code."' ORDER BY Jobs";

	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}

private static function  getsqlselect($link) {
 
  $sqlstr = $_GET['sql'];
  if ($sqlstr==""){
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
   	return urldecode(json_encode($menu));
  }
  $sqlstr=base64_decode($sqlstr);
 	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}

private static function  cphmedit($link) {

	$options = $_GET['options'];

	$id = $_GET['id'];


	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from khcphm where id=" . $id;
			break;
		default :
			if ($id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update khcphm set cphm='" . $_GET['cphm'] . "'";
				$sql .= ",thr='" . $_GET['thr'] . "'";
				$sql .= ",wxnumber='" . $_GET['wxnumber'] . "'";
				$sql .= ",wxname='" . $_GET['wxname'] . "'";
				$sql .= ",active=" . $_GET['active'];
				$sql .= " where id=" . $id;
			} 
			else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into khcphm(khid,cphm,thr,wxnumber,wxname) values(" . $_GET['khid'] ;
				$sql .= ",'" . $_GET['cphm'] . "'";
				$sql .= ",'" . $_GET['thr'] . "'";
				$sql .= ",'" . $_GET['wxnumber'] . "'";
				$sql .= ",'" . $_GET['wxname'] . "')";
			}
			break;
	};
	mysqli_query($link,$sql);
	$arr['success'] = true;
	if (mysqli_errno($link) > 0) {
		$msg = $errmsg;
		$arr['data'] = array('id' =>1, 'msg' => urlencode($msg));
	}else
	{
		$arr['data'] = array('id' => 0, 'msg' => urlencode($msg));
	}
	
	return urldecode(json_encode($arr));

}

private static function  usertypeedit($link) {

	$options = $_GET['options'];

	$id = $_GET['id'];


	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from usertype where typeid=" . $id;
			break;
		default :
			if ($id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update usertype set typename='" . $_GET['typename'] . "'";
				$sql .= ",code='" . $_GET['code'] . "'";
				$sql .= ",wxmenustring='" . $_GET['wxmenustring'] . "'";
				
        $sql .= ",new=" . $_GET['new'];
        $sql .= ",edit=" . $_GET['edit'];
        $sql .= ",sh=" . $_GET['sh'];
        $sql .= ",cwsh=" . $_GET['cwsh'];
        $sql .= ",cgsh=" . $_GET['cgsh'];
        $sql .= ",del=" . $_GET['del'];
        $sql .= ",system=" . $_GET['system'];
				$sql .= " where typeid=" . $id;
			} 
			else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into usertype(typeName,code,wxmenustring,new,edit,del,sh,cwsh,cgsh,system) values('" . $_GET['typename'] ;
				$sql .= "','" . $_GET['code'] . "'";
				$sql .= ",'" . $_GET['wxmenustring'] . "'";
				$sql .= "," . $_GET['new'] ;
        $sql .= "," . $_GET['edit'] ;
        $sql .= "," . $_GET['del'] ;
        $sql .= "," . $_GET['sh'] ;
        $sql .= "," . $_GET['cwsh'] ;
        $sql .= "," . $_GET['cgsh'] ;
				$sql .= "," . $_GET['system'] . ")";
			}
			break;
	};
  //return $sql;
	mysqli_query($link,$sql);
	$arr['success'] = true;
	if (mysqli_errno($link) > 0) {
		$msg = $errmsg;
		$arr['data'] = array('id' =>1, 'msg' => urlencode($msg));
	}else
	{
		$arr['data'] = array('id' => 0, 'msg' => urlencode($msg));
	}
	
	return urldecode(json_encode($arr));

}

private static function  saveformid($link) {

	$form_id =$_GET['form_id'];
  if ($form_id=="the formId is a mock one") {
   	$arr['success'] = true;
   	$arr['data'] = array('id' =>0);
    return urldecode(json_encode($arr)); 
  }
  
  $cnote =$_GET['form_id'];
	$member_id=$_GET['member_id'];
	$sql = "insert into formids(form_id,member_id) values('" . $form_id ;
	$sql .= "','" . $member_id. "')";
  mysqli_query($link,$sql);
	$arr['success'] = true;
	  if (mysqli_errno($link) > 0) {
		$arr['data'] = array('id' =>1,'msg'=>$sql);
	}else
	{
		$arr['data'] = array('id' => 0);
	}
	
	return urldecode(json_encode($arr));

}

private static function  khuserslist($link) {

$khid=0;
$Lid=0;
if (isset($_GET['khid'])){
	$khid =(int)$_GET['khid'];
}
if (isset($_GET['L_id'])){
  $Lid =(int)$_GET['L_id'];
}
  //	  $menu['success'] = false;
//		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询参数非法！'));
//   	return urldecode(json_encode($menu));
  if (($khid==0)&&($Lid==0)){
	  $menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询参数非法！'));
   	return urldecode(json_encode($menu));
  }else{
  if ($khid>0){
  $sqlstr = " SELECT     `userid`
    , `username`
    , `usercode`
    , `active`
    , `tel`
    , `address`
    , `sfjhm`
    , `sysrq`
    , `sysrq`
    , `edit`
    , `sh`
    , `system`
    , `del`
    , `cwsh`
    , `E_code`
    ,wxmenustring,new,lastdel, `smsphone`,userid as id ,0 as typeid,'' as typename FROM khusers where khid=" . $_GET['khid'] . "  order by usercode ";
  }
  else
  {
    $sqlstr = " SELECT userid as id,users.typeid
    , userid
    , usercode
    , username
    , users.active
    , address
    ,active
    , lastdel
    , smsphone,0 AS khid,'' as wxmenustring,0 AS edit, 0 AS sh, 0 AS del,1 as new,usertype.typename  FROM users,usertype where users.typeid=usertype.typeid order by usertype.code,users.usercode ";

	  //$menu['success'] = false;
	//	$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
  // 	return urldecode(json_encode($menu));

  }
  }
//	return  $sqlstr;
  $query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}

private static function  usertypelist($link) {
	$sqlstr = " SELECT * FROM usertype";
  $query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}

private static function  khusersedit($link) {
	$khid =(int)$_GET['khid'];
  
	$options = $_GET['options'];
	$id = $_GET['id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
      if ($khid>0){
			$sql = "delete from khusers where userid=" . $id;
      }else{
        $sql = "delete from users where userid=" . $id;
      }
			break;
		case "smsactive" :
			//delete
			$msg = "成功取消用户激活状态！";
			$errmsg = "取消用户激活状态失败！";
      if ($khid>0){
		    	$sql = "update  khusers set smsactive=0 where  userid=" . $id;
      }else{

           $sql = "update  users set smsactive=0 where  userid=" . $id;
      }
      	$msg=$sql;
			break;
		case "unlocked" :
			//delete
			$msg = "解锁成功！";
			$errmsg = "解锁失败！";
      if ($khid>0){
			$sql = "update  khusers set locked=0,trylogin=0 where userid=" . $id;
      }else{
        $sql = "update  users set locked=0,trylogin=0 where  userid=" . $id;
      }
      $msg=$sql;
			break;
		default :
			if ($id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
        if ($khid>0){
  				$sql = "update khusers set username='" . $_GET['username'] . "'";
	  			$sql .= ",usercode='" . $_GET['usercode'] . "'";
		  		$sql .= ",smsphone='" . $_GET['smsphone'] . "'";
           $sql .= ",wxmenustring='" . $_GET['wxmenustring'] . "'";
  				$sql .= ",active=" . $_GET['active'];
				  $sql .= ",edit=" . $_GET['edit'];
				  $sql .= ",sh=" . $_GET['sh'];
				  $sql .= ",del=" . $_GET['del'];
				  $sql .= ",lastdel=" . $_GET['lastdel'];
				  $sql .= " where userid=" . $id;
        }else{
          $sql = "update users set username='" . $_GET['username'] . "'";
				  $sql .= ",usercode='" . $_GET['usercode'] . "'";
				  $sql .= ",smsphone='" . $_GET['smsphone'] . "'";
				  $sql .= ",active=" . $_GET['active'];
          $sql .= ",typeid=" . $_GET['typeid'];
       		$sql .= ",lastdel=" . $_GET['lastdel'];
				  $sql .= " where userid=" . $id;
        }
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
             
        if ($khid>0){
  				$sql = "insert into khusers(khid,username,usercode,smsphone,wxmenustring,edit,sh,del,lastdel) values(" . $_GET['khid'] ;
	  			$sql .= ",'" . $_GET['username'] . "'";
		  		$sql .= ",'" . $_GET['usercode'] . "'";
			  	$sql .= ",'" . $_GET['smsphone'] . "'";
          $sql .= ",'" . $_GET['wxmenustring'] . "'";
			  	$sql .= "," . $_GET['edit'] ;
		    	$sql .= "," . $_GET['sh'] ;
				  $sql .= "," . $_GET['del'] ;
				  $sql .= "," . $_GET['lastdel'] ;
				  $sql .= ")";
        }else
        {
  				$sql = "insert into users(typeid,username,usercode,smsphone,lastdel) values(" . $_GET['typeid'] ;
	  			$sql .= ",'" . $_GET['username'] . "'";
		  		$sql .= ",'" . $_GET['usercode'] . "'";
			  	$sql .= ",'" . $_GET['smsphone'] . "'";
				  $sql .= "," . $_GET['lastdel'] ;
				  $sql .= ")";
        }
			}
			break;
	};
//	return $sql;
	$rows=mysqli_query($link,$sql);

	$arr['success'] = true;
	if (mysqli_errno($link) > 0) {
		$arr['data'] = array('id' => 1, 'msg' => urlencode($errmsg));
	}
	else
	{
		$arr['data'] = array('id' => 0, 'msg' => urlencode($msg));
	}
	return urldecode(json_encode($arr));
}
private static function  cpxsdmxloc($link) {
	
	
	$xsid=(int)$_GET["xsid"];
	
    
	    $sqlstr = " SELECT  m.*,bz.ps_name as bzmc	FROM cpxsdmx m,cpxsd,packing bz where cpxsd.xsid=m.xsid and bz.PS_id=m.bzid and cpxsd.xsid= ".$xsid ;	
        
    	$query = mysqli_query($link,$sqlstr);
    	return self::getjsonstoredata($query, 0);
}

private static function  cpkcmenulist($link) {
	
$khid=$_GET['khid'];
$ckid=$_GET['ckid'];

$sqlstr = "SELECT L_id as ckid ,L_Shortname as ckjc,L_name as ckmc FROM location "; // where E_code='" . $_GET['p_e_code'] . "' AND 
if ($ckid>0)
{
  $sqlstr =$sqlstr." where l_id=".$ckid;  
}


$ckquery = mysqli_query($link,$sqlstr);

$sqlstr = "SELECT 
  c.cdid,c.cpid,c.bzid,c.jldw,c.L_id as ckid,c.kcid,c.khid,
  c.cpph,
  mx.sl - c.kdsl AS sl,
  mx.zl - c.kdzl AS zl,
  c.kdsl,c.kdzl,
  kh.C_shortname as khmc,
  cd.p_name AS cdmc,
  cp.S_name AS cpmc,
  bz.PS_name AS bzmc,bz.rate,
  mx.sl AS kcsl,
  mx.zl AS kczl 
  FROM
  cpkc c,
  customer kh,
  produces cd,
  packing bz,
  commodity cp,
  location ck,
  (SELECT 
    kcid,
    SUM(sl) AS sl,
    SUM(zl) AS zl 
  FROM
    cpkcmx 
  GROUP BY kcid 
  HAVING SUM(sl) <> 0 
    OR SUM(zl) <> 0) mx 
  WHERE mx.kcid = c.kcid 
  AND c.L_id = ck.L_id 
  AND c.khid = kh.c_id 
  AND c.cpid = cp.s_id 
  AND c.cdid = cd.p_id 
  AND c.bzid = bz.ps_id and  kh.active=1 and cd.active=1 and cp.active=1 ";
  if ($khid>0)
  {
    $sqlstr = $sqlstr." and c.khid=".$khid  ;
  }
  if ($ckid>0)
  {
    $sqlstr = $sqlstr." and c.L_id=".$ckid  ;
  }
  $sqlstr = $sqlstr." order by c.l_id,Cd.P_name,cp.S_name"; 

	

	$cpkc = mysqli_query($link,$sqlstr);

	if (($cpkc)&&($ckquery)) {
		$menutype = "";

		$menu_ck = array();
		$menu_cpkc = array();

		while ($menurow = mysqli_fetch_array($ckquery)) {
			$menutype = $menurow['ckid'];
			$sumkcsl=0;
      $sumkczl=0;

			$myck_array = array();
			$myck_array["menu"] = urlencode($menurow['ckjc']);
			$myck_array["ckmc"] = urlencode($menurow['ckmc']);
			$myck_array["menuId"] = $menutype;
			

			$menu_array1 = array();
			mysqli_data_seek($cpkc, 0);

			while ($row = mysqli_fetch_array($cpkc)) {
				
				if ($row['ckid'] == $menutype) {

          $sumkcsl=$sumkcsl+(float)$row['kcsl'];
          $sumkczl=$sumkczl+$row['kczl'];
					$my_array = array();
					$fields=mysqli_num_fields($cpkc);
					for ($i = 0; $i <$fields ; $i++) {
					     $field_info =mysqli_fetch_field_direct($cpkc, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
					};
					array_push($menu_array1, $my_array);
				}
			}
      //$menu_array11=array();
     // $menu_array11['kc']=$menu_array1;
     // $menu_array11['sumkcsl']=$sumkcsl;
     // $menu_array11['sumkczl']=$sumkczl;
     $myck_array['sumkcsl']=$sumkcsl;
     $myck_array['sumkczl']=$sumkczl;

     array_push($menu_ck, $myck_array);

		 array_push($menu_cpkc,$menu_array1);
			
		}

		$menu["ck"] = $menu_ck;
		$menu["cpkc"] = $menu_cpkc;
		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));

}


private static function  cpxsdmxsave($link) {



	$str = $_GET['data'];
    $s = base64_decode($str);
	$o =json_decode($s);


	//	return $o->{'ckmc'}. $o->{'cphm'};// json_last_error();   


	$cpxsdmx = $o->{'cpxsdmx'};

  

    $L_id =$o->{'ckid'};

   $khid=$o->{'khid'};

   	$my_date =new DateTime($o->{'xsrq'});
    $my_year = $my_date ->format("Y");

	$dhsql="select C_name as khmc from customer where c_id=".$khid;;
	$result = mysqli_query($link,$dhsql);
	$arr=mysqli_fetch_assoc($result);
	$khmc =$arr['khmc'];
  
	$dhsql="select setdh(".$L_id.",".$my_year .",'x') as dh ";
	$result = mysqli_query($link,$dhsql);
	$arr=mysqli_fetch_assoc($result);
	$dh =$arr['dh'];

  $arr=array();
  $arr['result'] ='success';
	$arr['dh'] ="";
  $arr['id'] =1;
  $arr['msg'] =urlencode('数据查询操作失败！'); 


	$cpxsdstr = "insert into cpxsd (xsdh,L_id,khkd,xjbz,khid,khmc,ckmc,sfr,cphm,czy,cnote,xsrq,endrq)values('";
	$cpxsdstr .= $dh. "'";
	$cpxsdstr .= ",". $L_id;
	$cpxsdstr .= ",". $o->{'khkd'};
	$cpxsdstr .= ",". $o->{'xjbz'};
	$cpxsdstr .= ",". $o->{'khid'};
	
	$cpxsdstr .= ",'". $khmc . "'";

	$cpxsdstr .= ",'". $o->{'ckmc'} . "'";
	$cpxsdstr .= ",'". $o->{'sfr'}  . "'";
	$cpxsdstr .= ",'". $o->{'cphm'} . "'";
	$cpxsdstr .= ",'". $o->{'czy'}  . "'";
	$cpxsdstr .= ",'". $o->{'cnote'}. "'";
	$cpxsdstr .= ",'". $o->{'xsrq'} . "'";
	$cpxsdstr .= ",'". $o->{'endrq'} . "')";
	
	mysqli_query($link,'start transaction');
	mysqli_query($link,$cpxsdstr);
	$xsid=mysqli_insert_id($link);
	if ((mysqli_errno($link) > 0 ) ||($xsid==0)) {
		mysqli_query($link,'rollback');
		//return '数据保存失败!' . $cpxsdstr;
    	return urldecode(json_encode($arr));


	}
	//return $cpxsdstr;


	foreach ($cpxsdmx as $row) {
    $zl=$row->{'zl'};
    if ($zl=='') $zl='0';
		$cpxsdmxstr  = " insert into cpxsdmx (xsid,kcid,xssl,xszl,xsdj,xsje,cpph,jldw,cdid,cpid,bzid,cdmc,cpmc,bzmc)";
		$cpxsdmxstr .= " values (".$xsid."," .$row->{'kcid'}.",".$row->{'sl'};
		$cpxsdmxstr .= "," . $zl.",0,0" ;
		$cpxsdmxstr .= ",'" .$row->{'cpph'}."','".$row->{'jldw'} . "'";
		$cpxsdmxstr .= "," . $row->{'cdid'}.",".$row->{'cpid'}.",".$row->{'bzid'};
		$cpxsdmxstr .= ",'" . $row->{'cdmc'}."','".$row->{'cpmc'}."','".$row->{'bzmc'}."')";
		mysqli_query($link,$cpxsdmxstr);
		if (mysqli_errno($link) > 0)
		{
			mysqli_query($link,'rollback');
			//return '商品数据保存失败!!' . $cpxsdmxstr;
      $arr['msg'] =urlencode('商品数据保存失败'); 	
      return urldecode(json_encode($arr));
			break;
		}
	}
	mysqli_query($link,'commit');
	if (mysqli_errno($link) > 0) {
		mysqli_query($link,'rollback');
    return urldecode(json_encode($arr));
		//return '数据保存失败!!!';
	} 



  $arr['result'] ='success';
	$arr['dh'] =$dh;
  $arr['id'] =0;
  $arr['xsid'] =$xsid;
  $arr['msg'] =urlencode('数据查询操作成功！'); 
	return urldecode(json_encode($arr));
}
private static function  wxghdmxsave($link) {
	$str = $_GET['data'];
  $s = base64_decode($str);
	$o =json_decode($s);
	//	return $o->{'ckmc'}. $o->{'cphm'};// json_last_error();   
	$cpxsdmx = $o->{'cpxsdmx'};
  $L_id =$o->{'ckid'};
  $khid=$o->{'khid'};
 	$my_date =new DateTime($o->{'xsrq'});
  $my_year = $my_date ->format("Y");

	$dhsql="select C_name as khmc from customer where c_id=".$khid;;
	$result = mysqli_query($link,$dhsql);
	$arr=mysqli_fetch_assoc($result);
	$khmc =$arr['khmc'];
  
	$dhsql="select setdh(".$L_id.",".$my_year .",'H') as dh ";
	$result = mysqli_query($link,$dhsql);
	$arr=mysqli_fetch_assoc($result);
	$dh =$arr['dh'];

  $arr=array();
  $arr['result'] ='success';
	$arr['dh'] ="";
  $arr['id'] =1;
  $arr['msg'] =urlencode('数据查询操作失败！'); 


	$cpxsdstr = "insert into wxcpghd (ghdh,L_id,jebz,xjbz,khid,khmc,ckmc,newkhid,newkhmc,czy,cnote,xsrq,endrq)values('";
	$cpxsdstr .= $dh. "'";
	$cpxsdstr .= ",". $L_id;
	$cpxsdstr .= ",". $o->{'jebz'};
	$cpxsdstr .= ",". $o->{'xjbz'};
	$cpxsdstr .= ",". $o->{'khid'};
	$cpxsdstr .= ",'". $khmc . "'";
	$cpxsdstr .= ",'". $o->{'ckmc'} . "'";
	$cpxsdstr .= ",". $o->{'newkhid'} ;
	$cpxsdstr .= ",'". $o->{'newkhmc'} . "'";
	$cpxsdstr .= ",'". $o->{'czy'}  . "'";
	$cpxsdstr .= ",'". $o->{'cnote'}. "'";
	$cpxsdstr .= ",'". $o->{'xsrq'} . "'";
	$cpxsdstr .= ",'". $o->{'endrq'} . "')";
	
	mysqli_query($link,'start transaction');
	mysqli_query($link,$cpxsdstr);
	$xsid=mysqli_insert_id($link);
	if ((mysqli_errno($link) > 0 ) ||($xsid==0)) {
		   mysqli_query($link,'rollback');
		//return '数据保存失败!' . $cpxsdstr;
    $arr['msg'] =urlencode('数据保存失败!' . $cpxsdstr); 
    	return urldecode(json_encode($arr));


	}
	//return $cpxsdstr;


	foreach ($cpxsdmx as $row) {
    $zl=$row->{'zl'};
    if ($zl=='') $zl='0';
		$cpxsdmxstr  = " insert into wxcpghdmx (ghid,kcid,xssl,xszl,cpph,jldw,cdid,cpid,bzid,cdmc,cpmc,bzmc)";
		$cpxsdmxstr .= " values (".$xsid."," .$row->{'kcid'}.",".$row->{'sl'};
		$cpxsdmxstr .= "," . $zl ;
		$cpxsdmxstr .= ",'" .$row->{'cpph'}."','".$row->{'jldw'} . "'";
		$cpxsdmxstr .= "," . $row->{'cdid'}.",".$row->{'cpid'}.",".$row->{'bzid'};
		$cpxsdmxstr .= ",'" . $row->{'cdmc'}."','".$row->{'cpmc'}."','".$row->{'bzmc'}."')";
		mysqli_query($link,$cpxsdmxstr);
		if (mysqli_errno($link) > 0)
		{
			mysqli_query($link,'rollback');
			//return '商品数据保存失败!!' . $cpxsdmxstr;
      $arr['msg'] =urlencode('商品数据保存失败'. $cpxsdmxstr); 	
      return urldecode(json_encode($arr));
			break;
		}
	}
	mysqli_query($link,'commit');
	if (mysqli_errno($link) > 0) {
		mysqli_query($link,'rollback');
    return urldecode(json_encode($arr));
		//return '数据保存失败!!!';
	} 



  $arr['result'] ='success';
	$arr['dh'] =$dh;
  $arr['id'] =0;
  $arr['ghid'] =$xsid;
  $arr['msg'] =urlencode('数据查询操作成功！'); 
	return urldecode(json_encode($arr));
}
private static function  cpgfdmxsave($link) {
	$str = $_GET['data'];
  $s = base64_decode($str);
	$o =json_decode($s);


	//	return $o->{'ckmc'}. $o->{'cphm'};// json_last_error();   


	$gfdmx = $o->{'gfdmx'};

  

  $L_id =$o->{'L_id'};

  $khid=$o->{'khid'};

  $my_date =new DateTime($o->{'kdrq'});
  $my_year = $my_date ->format("Y");

	$dhsql="select C_name as khmc from customer where c_id=".$khid;;
	$result = mysqli_query($link,$dhsql);
	$arr=mysqli_fetch_assoc($result);
	$khmc =$arr['khmc'];
  
	$dhsql="select setdh(".$L_id.",".$my_year .",'G') as dh ";
	$result = mysqli_query($link,$dhsql);
	$arr=mysqli_fetch_assoc($result);
	$dh =$arr['dh'];

  $arr=array();
  $arr['result'] ='success';
	$arr['dh'] ="";
  $arr['id'] =1;
  $arr['msg'] =urlencode('数据查询操作失败！'); 


	$cpgfdstr = "insert into wxcpgfd (gfdh,L_id,xjbz,khid,khmc,ckmc,sfr,cphm,khczy,cnote,kdrq,endrq,khsl,khzl)values('";
	$cpgfdstr .= $dh. "'";
	$cpgfdstr .= ",". $L_id;
	$cpgfdstr .= ",". $o->{'xjbz'};
	$cpgfdstr .= ",". $o->{'khid'};
	$cpgfdstr .= ",'". $khmc . "'";
	$cpgfdstr .= ",'". $o->{'ckmc'} . "'";
	$cpgfdstr .= ",'". $o->{'sfr'}  . "'";
	$cpgfdstr .= ",'". $o->{'cphm'} . "'";
	$cpgfdstr .= ",'". $o->{'khczy'}  . "'";
	$cpgfdstr .= ",'". $o->{'cnote'}. "'";
	$cpgfdstr .= ",'". $o->{'kdrq'} . "'";
	$cpgfdstr .= ",'". $o->{'endrq'} . "'";
	$cpgfdstr .= ",". $o->{'khsl'} ;
  $cpgfdstr .= ",". $o->{'khzl'} . ")";
	mysqli_query($link,'start transaction');
	mysqli_query($link,$cpgfdstr);
	$xsid=mysqli_insert_id($link);
	if ((mysqli_errno($link) > 0 ) ||($xsid==0)) {
		mysqli_query($link,'rollback');
		//return '数据保存失败!' . $cpgfdstr;
    	return urldecode(json_encode($arr));


	}
	//return $cpgfdstr;


	foreach ($gfdmx as $row) {
    $zl=$row->{'zl'};
    if ($zl=='') $zl='0';
		$gfdmxstr  = " insert into wxcpgfdmx (gfid,khsl,khzl,jldw,cdmc,xmmc,bzmc)";
		$gfdmxstr .= " values (".$xsid."," .$row->{'sl'};
		$gfdmxstr .= "," . $zl ;
		$gfdmxstr .= ",'" .$row->{'jldw'} . "'";
		$gfdmxstr .= ",'" . $row->{'cdmc'}."','".$row->{'cpmc'}."','".$row->{'bzmc'}."')";
		mysqli_query($link,$gfdmxstr);
		if (mysqli_errno($link) > 0)
		{
			mysqli_query($link,'rollback');
			//return '商品数据保存失败!!' . $gfdmxstr;
      $arr['msg'] =urlencode('过货商品数据保存失败'); 	
      return urldecode(json_encode($arr));
			break;
		}
	}
	mysqli_query($link,'commit');
	if (mysqli_errno($link) > 0) {
		mysqli_query($link,'rollback');
    return urldecode(json_encode($arr));
		//return '数据保存失败!!!';
	} 



  $arr['result'] ='success';
	$arr['dh'] =$dh;
  $arr['id'] =0;
  $arr['xsid'] =$xsid;
  $arr['msg'] =urlencode('数据查询操作成功！'); 
	return urldecode(json_encode($arr));


}
private static function  cpckdmxsave($link) {


	
	$str = $_GET['data'];
  $s = base64_decode($str);
	$ckd =json_decode($s);

//return $ckd;
		//return $ckd->{'ckmc'}. $ckd->{'cphm'};// json_last_error();   
  $errstr='';
	$cpckdmx = $ckd->{'cpckdmx'};

  $xsid =$ckd->{'xsid'};
  $L_id =$ckd->{'L_id'};
  

   	$my_date =new DateTime($ckd->{'ckrq'});
    $my_year = $my_date ->format("Y");

	//$dhsql="select C_name as khmc from customer where c_id=".$khid;;
	//$result = mysqli_query($link,$dhsql);
	//$arr=mysqli_fetch_assoc($result);
	//$khmc =$arr['khmc'];
  
	$dhsql="select setdh(".$L_id.",".$my_year .",'C') as dh ";
	$result = mysqli_query($link,$dhsql);
	$arr=mysqli_fetch_assoc($result);
	$dh =$arr['dh'];

  $arr=array();
  $arr['result'] ='success';
	$arr['dh'] ="";
  $arr['id'] =1;
  $arr['msg'] =urlencode('数据查询操作失败！'); 


	$cpckdstr = "insert into cpckd (ckdh,thr,cphm,czy,cnote,ckrq,wxck,xsid)values('";
	$cpckdstr .= $dh. "'";
	$cpckdstr .= ",'". $ckd->{'thr'}  . "'";
	$cpckdstr .= ",'". $ckd->{'cphm'} . "'";
	$cpckdstr .= ",'". $ckd->{'czy'}  . "'";
	$cpckdstr .= ",'". $ckd->{'cnote'}. "'";
	$cpckdstr .= ",'". $ckd->{'ckrq'} . "'";
  $cpckdstr .= ",1";
	$cpckdstr .= ",". $ckd->{'xsid'} . ")";
	
  	//return  $cpckdstr;

	mysqli_query($link,'start transaction');
	mysqli_query($link,$cpckdstr);
	$ckid=mysqli_insert_id($link);
	if ((mysqli_errno($link) > 0 ) ||($xsid==0)) {
	  	mysqli_query($link,'rollback');
	  	//return '数据保存失败!' . $cpckdstr;
      
      $arr['msg'] =urlencode('数据查询操作失败！'.$cpckdstr); 
    	return urldecode(json_encode($arr));
	}
	//return $cpckdstr;
	foreach ($cpckdmx as $row) {
       $zl=$row->{'cczl'};
       if ($zl=='') $zl='0';
	     $cpckdmxstr  = " insert into cpckdmx (ckid,xsmxid,ccsl,cczl,ccje,xjje)";
	     $cpckdmxstr .= " values (".$ckid."," .$row->{'xsmxid'} .","    .$row->{'ccsl'}.",".$row->{'cczl'};
		   $cpckdmxstr .= "," .$row->{'ccje'}.",".$row->{'xjje'} .")";
		   mysqli_query($link,$cpckdmxstr);
		   if (mysqli_errno($link) > 0)
		   {
		    	mysqli_query($link,'rollback');
			    $arr['msg'] =urlencode('商品数据保存失败'.$cpckdmxstr.$cpckdstr); 	
          return urldecode(json_encode($arr));
			    break;
		   }
	}
	mysqli_query($link,'commit');
	if (mysqli_errno($link) > 0) {
		mysqli_query($link,'rollback');
    $arr['msg'] =urlencode('商品数据保存失败!!!'); 	
    return urldecode(json_encode($arr));
		//return '数据保存失败!!!';
	} 
  $arr['result'] ='success';
	$arr['dh'] =$dh;
  $arr['id'] =0;
  $arr['ckid'] =$ckid;
  $arr['msg'] =urlencode('数据查询操作成功！'); 
	return urldecode(json_encode($arr));
}

//**************************
private static function  getjsonstoredata($query, $total) {//返回STORE所需的数据
     $newvar="";

	if ($query) {
        $rows=0;      
		
		$my_array1 = array();		
		
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();

			$rows=$rows+1;
            $fields=mysqli_num_fields($query); 
			for ($i =0; $i < $fields; $i++) {
			    $field_info =mysqli_fetch_field_direct($query, $i);
				$newvar = $row[$field_info->name];
				$my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($my_array1, $my_array);
			//$arr['rows'][] = $my_array;
		}
		if ($rows==0){
			$arr['rows']=array();
		}else
		{
			$arr['rows']=$my_array1;

		}
		$arr['results'] = $rows;
		$arr['total'] = $rows;
		$arr['success'] = true;
		$arr['data'] = array('id' => 0, 'msg' => urlencode('数据查询操作成功！'));
	} else {
		$arr['success'] = false;
		$arr['rows'] =array();
		$arr['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}

	return urldecode(json_encode($arr));

}
  
  

}