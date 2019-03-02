var vm = null;
function _init(that) {
   vm = that;
   var obj = {};
   obj["selectTitle"] = "选择";
   obj["hiddenSelectWindow"] = true;
   obj["nameList"] =[];
   vm.setData({
      options: obj,
      hiddenSelectWindow:true
   })
}
function _hiddenSelectWindow(vm) {
   var obj = vm.data.options;
   obj["hiddenSelectWindow"] =true;
   vm.setData({
      options: obj,
      hiddenSelectWindow: true
   });
}

function _check (e,that) {
        var id = e.currentTarget.dataset.index;
        var name = e.currentTarget.dataset.name;

   if (!that.data.multipleChoice) return name; 


   
     if (name != "确认") {
         var obj = that.data.options;
         
         var status = obj.nameList[id].selectStatus;
         if (!status) {
            status = false;
         }
         obj.nameList[id].selectStatus = !status;
         that.setData({
            options: obj
         })
         return "true";
      }

      var str= "";
      var list = that.data.options.nameList;
      
      if (list.length > 0) {
         list.forEach(function (item, index) {
            if (item.selectStatus) {
               str= str + item.Name + ";";
            }
         })
      }
     if (str.length>0)
     {
        str = str.substring(0, str.length-1);
     }
      return str;
   }

function _showSelectWindow(vm,obj,op) {
   //var obj = vm.data.options;
  
   if (op)
   {
      obj["multipleChoice"]=op;
   }else
   {
      obj["multipleChoice"] = false;
   }
   obj["hiddenSelectWindow"] =false;
   if (obj["multipleChoice"])
   {
   var   list=obj["nameList"];
      if (list.length > 0) {
         list.forEach(function (item, index) {
            if (item.Name =="确认") {
               
               list.splice(index, 1);
            }
         })
         
      }
      list.push({ "Name": "确认", "Id": 0 }); 
      obj["nameList"]=list;  
   }
   obj["widowHeight"] = obj.nameList.length > 10 ? "95%;" : "auto;"
  console.log('_showSelectWindow', op)

   vm.setData({
      options: obj,
      multipleChoice: obj["multipleChoice"],
      hiddenSelectWindow: false
   });
   
}
module.exports = {
   init: _init,
   hiddenSelectWindow: _hiddenSelectWindow,
   showSelectWindow: _showSelectWindow,
   check: _check
};

