<?php defined('BASEPATH') OR exit('No direct script access allowed'); 
 class Mysqlviewaction extends CI_Controller {
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
	case 'cpxsdview' :
		$retval =self::cpxsdview($link);
		break;
	default :
	
  		$result['success'] = false;
  		$result['data'] = array('id' => 1, 'msg' => urlencode('传递参数错误！'));
      $retval=urldecode(json_encode($result));
  
			break;
}
mysqli_close($link);	
echo $retval;
       
}


private static function  cpxsdview($link) {	
	
	
	$xsid=3948;
	
	$sqlstr ="SELECT *,xsid as id FROM cpxsd where  xsid= ".$xsid ;
	$xsdquery = mysqli_query($link,$sqlstr);
  
 $mxsqlstr = " SELECT  m.*,bz.ps_name as bzmc	
 FROM cpxsdmx m,cpxsd,packing bz,(".$sqlstr.") xsd  
 where cpxsd.xsid=m.xsid and bz.PS_id=m.bzid  and xsd.xsid=m.xsid  ";	
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

  
  

 }