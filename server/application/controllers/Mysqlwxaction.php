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
switch($act) {

	case 'getckmclist' :
		$retval =self::getckmclist($link);
		break;


	case 'cpxsdshsave' :
		$retval =self::cpxsdshsave($link);
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


	case 'cpxsdlist' :
		$retval =self::cpxsdlist($link);
		break;
	case 'cpjkdlist' :
		$retval =self::cpjkdlist($link);
		break;
	case 'cpjkdwz' :
		$retval =self::cpjkdwz($link);
		break;
	case 'cpjcttloc' :
		$retval =self::cpjcttloc($link);
		break;

	case 'cpgfdlist' :
		$retval =self::cpgfdlist($link);
		break;

	case 'cpckdlist' :
		$retval =self::cpckdlist($link);
		break;

	case 'cpxsdmxloc' :
		$retval =self::cpxsdmxloc($link);
		break;


	case 'cpckdselectdata' :
		$retval =self::cpckdselectdata($link);
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
		//、、$str = $_GET['data'];
    //$L_id = $_GET['p_l_id'];
    //$s = base64_decode($str);
		//$o = json_decode($s);
		//$o = json_decode($o, true);

      $jkd =json_decode($_GET['jkd'],true);
		

    $shbz=$jkd['shbz'];

    $gsby = $jkd['gsby'];
	  $jkid=$jkd['jkid'];
    $shr=$jkd['shr'];
    $cnote=$jkd['cnote'];
//$result['success'] = true;
//$result['data'] = array('id' =>0,'jkid'=>$jkid, 'msg' => $gsby);
//return urldecode(json_encode($result));
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
		$sqlstr = " update cpjkd set delbz=1,shrq=now(),shr='".$shr."' where delbz=0 and  ztbz<2 and jkid=" . $jkid;
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
     $sqlstr = " update cpckd set delbz=1,shrq=now(),shr='".$shr."' where delbz=0 and  ztbz<2 and ckid=".$ckid;
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

private static function  cpxsdlist($link) {	
	
	
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
		$sqlstr ="SELECT *,xsid as id FROM cpxsd where  khkd>0 ".$filter ;
	//	$sqlstr ="SELECT *,xsid as id FROM cpxsd where  xsid>0 ".$filter ;
	//	return $sqlstr;
		$xsdquery = mysqli_query($link,$sqlstr);
//		return self::getjsonstoredata($xsdquery, 0);



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

		$result['rows'] = $xsd;
		$result['success'] = true;
		
	} else {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($result));
		
}

private static function  cpjkdlist($link) {	
	
	
	
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$kh=(int)$_GET["kh"];
	$loc=$_GET["loc"];

	

		$filter =" and cpjkd.ztbz>0  and cpjkd.delbz=0 ";
	  		if ($_GET["startdate"])
    		{
      			$filter .=" and cpjkd.jkrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			  {
	    		$filter .=" and cpjkd.jkrq<='".$_GET["enddate"]."'";
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
		$sqlstr ="SELECT  cpjkd.*,jkid as id,ck.L_name as ckmc,c_shortname as khjc  FROM customer c, cpjkd,location ck where cpjkd.L_id=ck.l_id and cpjkd.delbz=0 and c.c_id=cpjkd.khid  ".$filter ;
		$xsdquery = mysqli_query($link,$sqlstr);




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

		$result['rows'] = $xsd;
		$result['success'] = true;
		
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

	

		$filter =" and cpjkd.ztbz>1  and cpjkd.delbz=0 ";
	  		if ($_GET["startdate"])
    		{
      			$filter .=" and cpjkd.jkrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			  {
	    		$filter .=" and cpjkd.jkrq<='".$_GET["enddate"]."'";
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
	  		if ($year>0)
    		{
      			$filter .=" and YEAR(d.jkrq)=".$year;
            $filter1 .=" and YEAR(d.ckrq)=".$year;
            $filter2 .=" and YEAR(d.gfrq)=".$year;
    		}

	  		if ($month>0)
    		{
      			$filter .=" and MONTH(d.jkrq)=".$month;
            	$filter1 .=" and MONTH(d.ckrq)=".$month;
      			
            $filter2 .=" and MONTH(d.gfrq)=".$month;
    		}
	  		if ($day>0)
    		{
      			$filter .=" and DAY(d.jkrq)=".$day;
            $filter1 .=" and DAY(d.ckrq)=".$day;
            $filter2 .=" and DAY(d.gfrq)=".$day;
    		}
		
    if ($ckid>0)
    {
    		$filter .=" and d.L_id=".$ckid;
        $filter1 .=" and cpxsd.L_id=".$ckid;
        $filter2 .=" and d.L_id=".$ckid;
    }
  



	  	

	  if ($loc=="khwz") 
		{
    		$sqlstr ="SELECT  d.khid as id ,d.khmc as mc,mx.jcsl as jcsl,mx.jczl as jczl  
        FROM  cpjkd d,cpjkdmx mx
        where d.jkid=mx.jkid and d.ztbz>1  ".$filter ;
       
        $sqlstr1 ="SELECT  cpxsd.khid as id ,cpxsd.khmc as mc,mx.ccsl as jcsl,mx.cczl as jczl  
        FROM  cpckd d,cpckdmx mx,cpxsd,cpxsdmx
        where d.ckid=mx.ckid  and d.ztbz>1 and cpxsd.xsid=cpxsdmx.xsid and cpxsdmx.mxid=mx.xsmxid ".$filter1 ;

	      $sqlstr2 ="SELECT  d.khid as id ,d.khmc as mc,mx.sl as jcsl,mx.zl as jczl  
        FROM  cpgfd d,cpgfdmx mx
        where d.gfid=mx.gfid and  d.ztbz>0 ".$filter2 ;
       
       // $sqlstr =$sqlstr." group by id,mc";
		}else{
      if ($khid>0)
      {
    		$filter .=" and d.khid=".$khid;
        $filter1 .=" and cpxsd.khid=".$khid;
        $filter2 .=" and d.khid=".$khid;
      }
        $sqlstr ="SELECT  mx.cpid as id, mx.cpmc as mc ,mx.jcsl as jcsl,mx.jczl as jczl  
          FROM cpjkd d,cpjkdmx mx
          where d.jkid=mx.jkid  and d.ztbz>1 ".$filter ;
        
        $sqlstr1 ="SELECT  cpxsdmx.cpid as id ,cpxsdmx.cpmc  as mc,mx.ccsl as jcsl,mx.cczl as jczl  
        FROM  cpckd d,cpckdmx mx,cpxsd,cpxsdmx
        where d.ckid=mx.ckid  and d.ztbz>1 and cpxsd.xsid=cpxsdmx.xsid and cpxsdmx.mxid=mx.xsmxid ".$filter1 ;

	      $sqlstr2 ="SELECT  0 as id ,mx.xmmc as mc,mx.sl as jcsl,mx.zl as jczl  
        FROM  cpgfd d,cpgfdmx mx
        where d.gfid=mx.gfid and  d.ztbz>0 ".$filter2 ;

         // $sqlstr =$sqlstr." group by id,mc";
    }
 
    $sqlstr="select id,mc,sum(jcsl) as jcsl ,sum(jczl) as jczl from ((". $sqlstr. " ) union  all (".$sqlstr1. ") union  all (".$sqlstr2.") ) w  group by id,mc " ;
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
  $sqlstr = "SELECT  cpgfd.*,gfid as id,c_shortname as khjc  FROM customer c, cpgfd,location ck where cpgfd.L_id=ck.l_id and cpgfd.delbz=0 and c.c_id=cpgfd.khid  ".$filter;
  $xsdquery = mysqli_query($link, $sqlstr);




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

    $result['rows'] = $xsd;
    $result['success'] = true;

  } else {
    $result['success'] = false;
    $result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
  }
  return urldecode(json_encode($result));

}




private static function  cpckdlist($link) {	
	
	
	
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
	$sqlstr = " SELECT l_id as Id,l_name as Name FROM location   order by l_code ";
	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}
private static function  khmclist($link) {
	$sqlstr = " SELECT C_id as Id,C_shortname as Name FROM customer order by c_code ";
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
	$sqlstr = " SELECT userid as id,userid,usercode,username,khid,smsphone,wxname,wxnumber,edit,sh,del,lastdel,active,smsactive,locked  FROM khusers where khid=" . $_GET['khid'] . "  order by usercode ";
	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}

private static function  khusersedit($link) {

	$options = $_GET['options'];
	$id = $_GET['id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from khusers where userid=" . $id;
			break;
		case "smsactive" :
			//delete
			$msg = "成功取消用户激活状态！";
			$errmsg = "取消用户激活状态失败！";
			$sql = "update  khusers set smsactive=0 where smsactive=1 and userid=" . $id;
			break;
		case "unlocked" :
			//delete
			$msg = "解锁成功！";
			$errmsg = "解锁失败！";
			$sql = "update  khusers set locked=0,trylogin=0 where smsactive=1 and userid=" . $id;
			break;

		default :
			if ($id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update khusers set username='" . $_GET['username'] . "'";
				$sql .= ",usercode='" . $_GET['usercode'] . "'";
				$sql .= ",smsphone='" . $_GET['smsphone'] . "'";
				$sql .= ",active=" . $_GET['active'];
				$sql .= ",edit=" . $_GET['edit'];
				$sql .= ",sh=" . $_GET['sh'];
				$sql .= ",del=" . $_GET['del'];
				$sql .= ",lastdel=" . $_GET['lastdel'];
				$sql .= " where userid=" . $id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into khusers(khid,username,usercode,smsphone,edit,sh,del,lastdel,active) values(" . $_GET['khid'] ;
				$sql .= ",'" . $_GET['username'] . "'";
				$sql .= ",'" . $_GET['usercode'] . "'";
				$sql .= ",'" . $_GET['smsphone'] . "'";
				$sql .= "," . $_GET['edit'] ;
				$sql .= "," . $_GET['sh'] ;
				$sql .= "," . $_GET['del'] ;
				$sql .= "," . $_GET['lastdel'] ;
				$sql .= ",1)";
				
			}
			break;
	};
	//return $sql;
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
  AND c.bzid = bz.ps_id ";
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
		$cpxsdmxstr  = " insert into cpxsdmx (xsid,kcid,xssl,xszl,xsdj,xsje,cpph,jldw,cdid,cpid,bzid,cdmc,cpmc,bzmc)";
		$cpxsdmxstr .= " values (".$xsid."," .$row->{'kcid'}.",".$row->{'sl'};
		$cpxsdmxstr .= "," . $row->{'zl'}.",0,0" ;
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