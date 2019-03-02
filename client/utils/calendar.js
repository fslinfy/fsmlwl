var vm = null;
function _dateShow(that,op) {
   vm=that;
   var today = new Date();//当前时间  
   var y = today.getFullYear();//年  
   var mon = today.getMonth() + 1;//月  
   var d = today.getDate();//日  
   var i = today.getDay();//星期  
   var obj = {}
   if (op == 1) {
      obj["calendarHidden"] = false;
   }else
   {
      obj["calendarHidden"] = true;
   }
   obj["curYear"] = y;
   obj["curMonth"] = mon;
   obj["selectedDate"] = y + '-' + mon + '-' + d;
   that.setData({
      datedata: obj,
      calendarHidden: obj["calendarHidden"]
   });
   if (op==1)
   {
      this.getDateList(y, mon - 1);
   }
}
function _init(that, op) {
   vm = that;
   var today = new Date();//当前时间  
   var y = today.getFullYear();//年  
   var mon = today.getMonth() + 1;//月  
   var d = today.getDate();//日  
   var i = today.getDay();//星期  
   var obj = {}
   if (op == 1) {
      obj["calendarHidden"] = false;
   } else {
      obj["calendarHidden"] = true;

   }
   obj["curYear"] = y;
   obj["curMonth"] = mon;
   obj["selectedDate"] = y + '-' + mon + '-' + d;
   that.setData({
      datedata: obj,
      calendarHidden: obj["calendarHidden"]
   });
   if (op == 1) {
      this.getDateList(y, mon - 1);
   }
}

function _getDateList(y, mon) {
   var obj = vm.data.datedata;
   var ts = 28;
   if (y % 4 == 0 && y % 100 != 0) {
      ts = 29;
   }
   obj["daysCountArr"] = [31, ts, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   vm.setData({
      datedata: obj
   });
   var dateList = [];
   dateList[0] = [];
   var weekIndex = 0;//第几个星期
   for (var i = 0; i < vm.data.datedata.daysCountArr[mon]; i++) {
      var week = new Date(y + '-' + (mon + 1) + '-' + (i + 1)).getDay();
      dateList[weekIndex].push({
         value: y + '-' + (mon + 1) + '-' + (i + 1),
         date: i + 1,
         week: week
      });
      if (week == 0) {
         weekIndex++;
         dateList[weekIndex] = [];
      }
   }
   this.generateDate(dateList);
}
function _generateDate(dateList) {
   var obj = vm.data.datedata;
   obj["dateList"] = dateList;
   vm.setData({
      datedata: obj
   });
}
function _preMonth() {
   var oldobj = vm.data.datedata;
   var curYear = oldobj.curYear;
   var curMonth = oldobj.curMonth;
   curYear = curMonth - 1 ? curYear : curYear - 1;
   curMonth = curMonth - 1 ? curMonth - 1 : 12;
   var obj = vm.data.datedata;
   obj["curYear"] = curYear;
   obj["curMonth"] = curMonth;
   vm.setData({
      datedata: obj
   });
   this.getDateList(curYear, curMonth - 1, vm);
}
function _nextMonth() {
   var oldobj = vm.data.datedata;
   var curYear = oldobj.curYear;
   var curMonth = oldobj.curMonth;
   curYear = curMonth + 1 == 13 ? curYear + 1 : curYear;
   curMonth = curMonth + 1 == 13 ? 1 : curMonth + 1;
   var obj = vm.data.datedata;
   obj["curYear"] = curYear;
   obj["curMonth"] = curMonth;
   vm.setData({
      datedata: obj
   });
   this.getDateList(curYear, curMonth - 1, vm);
}
module.exports = {
   init: _init,
   dateShow: _dateShow,
   generateDate: _generateDate,
   getDateList: _getDateList,
   nextMonth: _nextMonth,
   preMonth: _preMonth

};

