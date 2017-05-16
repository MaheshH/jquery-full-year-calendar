/*
  Developed By Mahesh Hegde to use in MySchool Dashboard.
  Created Date : 16-May-2017
  Created For : MySchool Dashboard [NDTV WW]
*/
(function($){
  'use strict';

  var _default = {
    year: new Date().getFullYear(),
    isSundayHoliday: false,
    publicHolidays: [],
    niwds: [],
    halfDays: []
  };

  $.fn.fullYearCalendar = function(options) {
    options = $.extend(_default, options);
    this.each(function(index, element) {
      var months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
      var content = $('<div class="row fyc-calendar"></div>');
      var monthContainer="";
      $.each(months, function(monthIndex, monthName) {
        monthContainer =$('<div class="col-sm-6 table-responsive" id="'+ monthName +'"></div>');
        monthContainer.append(_getMonthTable(monthIndex, monthName, options));
        content.append(monthContainer);
      });
      $(element).append(content);
    });
    return {
      addHoliday: _addHoliday
    }
  }

  function _getMonthTable(monthIndex, monthName, options) {
    monthIndex += 4;
    var year = options.year;
    if(monthIndex > 12){
      year++;
      monthIndex -= 12;
    }
    var table = '<table class="table fyc-calendar-table"><thead><tr><th colspan="7" class="text-center">'+ monthName +' '+ year +'</th></tr>';
    table += '<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead>';
    var tbody = _getMonthTableBody(monthIndex, year, options);
    table += tbody + '</table>';
    return table;
  }

  function _getMonthTableBody(monthIndex, year, options) {
    var tbody = '<tbody><tr>';
    var day = 1;
    var counter = 0;
    var numberOfDays = moment(''+year+'-'+monthIndex, 'YYYY-MM').daysInMonth();
    var firstDayOfMonth = moment([year, (monthIndex - 1)]).day();
    if(firstDayOfMonth === 0){
      firstDayOfMonth = 7;
    }
    firstDayOfMonth--;
    while(firstDayOfMonth > 0){
      tbody += '<td></td>';
      firstDayOfMonth--;
      counter++;
    }
    while(day <= numberOfDays){
      if(counter > 6){
        counter = 0;
        tbody += '</tr><tr>';
      }
      var currentDate = moment(''+year+'-'+monthIndex+'-'+day, 'YYYY-MM-DD');
      var currentDateFormated = currentDate.format('YYYY-MM-DD');
      var classList = 'fyc-day ';
      if(options.isSundayHoliday && currentDate.day() == 0){
        classList += 'fyc-holiday ';
        if(options.publicHolidays.indexOf(currentDateFormated) > -1){
          classList += 'fyc-public-holiday ';
        }
        if(options.niwds.indexOf(currentDateFormated) > -1) {
          classList += 'fyc-niwd-holiday ';
        }
        if(options.halfDays.indexOf(currentDateFormated) > -1) {
          classList += 'fyc-halfDay-holiday ';
        }
      } else{
        if(options.publicHolidays.indexOf(currentDateFormated) > -1){
          classList += 'fyc-public-holiday ';
        }
        if(options.niwds.indexOf(currentDateFormated) > -1) {
          classList += 'fyc-niwd-holiday ';
        }
        if(options.halfDays.indexOf(currentDateFormated) > -1) {
          classList += 'fyc-halfDay-holiday ';
        }
      }
      tbody += '<td data-fyc-date=' + currentDateFormated + ' class="' + classList + '">' + day + '</td>';
      counter++;
      day++;
    }
    return tbody + '</tr></tbody>';
  }

  function _addHoliday(data){
    var className = "";
    switch (data.type) {
      case 'publicHolidays':
          className = "fyc-public-holiday";
        break;
        case 'niwds':
            className = "fyc-niwd-holiday";
          break;
          case 'halfDays':
              className = "fyc-halfDay-holiday";
            break;
      default:
        break;
    }
    var fromdate = moment(data.from, 'YYYY-MM-DD');
    if(data.to != undefined){
      var todate = moment(data.to, 'YYYY-MM-DD');
      while(todate >= fromdate){
        $('td[data-fyc-date=' + fromdate.format('YYYY-MM-DD') + ']').addClass(className);
        fromdate = fromdate.add(1, 'days');
      }
    } else {
      $('td[data-fyc-date=' + data.from + ']').addClass(className);
    }
  }

}(jQuery));
