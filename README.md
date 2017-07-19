# jquery-full-year-calendar
Full Year Grid Calendar jQuery plugin.

Version 1.0.0

## Getting Started

1. Download the full-year-calendar.js (or minified version).

2. Include it in your HTML file.
	```html
		<script src="full-year-calendar.js"></script>
	```
	
3. Initialize plugin.
	```javascript
		$(function(){
			$('div').fullYearCalendar();
		});
	```
	
## Options
You can initialize the full year calendar with following options
	```javascript
		yearStart: new Date(),
    		yearEnd: new Date().setFullYear(new Date().getFullYear() + 1),
    		weekDaysHolidays: [0],
    		publicHolidays: [],
    		niwds: [],
    		halfDays: [],
    		noSchools: []
	```
