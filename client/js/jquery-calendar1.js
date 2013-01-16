/* MarcGrabanski.com v2.5 */
/* Pop-Up Calendar Built from Scratch by Marc Grabanski */
/* Enhanced by Keith Wood (kbwood@iprimus.com.au). */
/* Time picker functionality added by Gregor Petrin*/
/* Under the Creative Commons Licence http://creativecommons.org/licenses/by/3.0/
	Share or Remix it but please Attribute the authors. */
/* Modify By liguodong 2009-9-19
	add:Time only、Date only
	blog:http://hi.baidu.com/guodong828*/
	var u=0;
var popUpCal = {
    selectedDay: 0,
    selectedMonth: 0, // 0-11
    selectedYear: 0, // 4-digit year
    selectedHour: 0,
    selectedMinute: 0,
    clearText: '清空', // Display text for clear link
    closeText: '关闭', // Display text for close link
    prevText: '&lt;上月', // Display text for previous month link
    nextText: '下月&gt;', // Display text for next month link
    currentText: '本日', // Display text for current month link
    appendText: '', // Display text following the input box, e.g. showing the format
    buttonText: '...', // Text for trigger button
    buttonImage: '', // URL for trigger button image
    buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
    dayNames: ['日', '一', '二', '三', '四', '五', '六'], // Names of days starting at Sunday
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], // Names of months
    dateFormat: 'YMD-', // First three are day, month, year in the required order, fourth is the separator, e.g. US would be 'MDY/'
    yearRange: '-50:+50', // Range of years to display in drop-down, either relative to current year (-nn:+nn) or absolute (nnnn:nnnn)//设置年份区间
    changeMonth: true, // True if month can be selected directly, false if only prev/next//true则月份可以下拉选择，false则不能，只能通过上月下月按钮来选择
    changeYear: true, // True if year can be selected directly, false if only prev/next
    firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...//设置第一列为星期几，0为星期日，1为星期一。。。。
    changeFirstDay: false, // True to click on day name to change, false to remain as set
    showOtherMonths: false, // True to show dates in other months, false to leave blank//表格最前面和最后面是否显示非本月日期
    minDate: null, // The earliest selectable date, or null for no limit
    maxDate: null, // The latest selectable date, or null for no limit
    speed: "fast", // Speed of display/closure
    autoPopUp: 'focus', // 'focus' for popup on focus, 'button' for trigger button, or 'both' for either
    closeAtTop: true, // True to have the clear/close at the top, false to have them at the bottom
    customDate: null, // Function that takes a date and returns an array with [0] = true if selectable, false if not,
    // [1] = custom CSS class name(s) or '', e.g. popUpCal.noWeekends
    fieldSettings: null, // Function that takes an input field and returns a set of custom settings for the calendar
    //timeSeparators:[' ',':','AM','PM'],	//An array of time separators: the first and second strings are obligatory, while the second and third strings specify
    //the AM and PM strings if they are needed; the first parameter separates the date and time fields.
    timeSeparators: [' ', ':'], 	//Enable the time selector without AM/PM
    //timeSeparators:[],


    /* Format and display the given date. */
    formatDate: function(day, month, year, hour, minute) {
        month++; // adjust javascript month
        var dateString = '';
        for (var i = 0; i < 3; i++) {
            dateString += this.dateFormat.charAt(3) +
				(this.dateFormat.charAt(i) == 'D' ? (day < 10 ? '0' : '') + day :
				(this.dateFormat.charAt(i) == 'M' ? (month < 10 ? '0' : '') + month :
				(this.dateFormat.charAt(i) == 'Y' ? year : '?')));
        }

        //append time info
        if (this.timeSeparators && this.timeSeparators.length > 1 && this.timeSeparators[0] && hour != null && minute != null) {
            dateString += this.timeSeparators[0] + this.hourString(hour) + this.timeSeparators[1] + ((minute >= 10) ? minute : ('0' + minute));
            if (this.timeSeparators.length == 4 && hour < 12) dateString += this.timeSeparators[2];
            else if (this.timeSeparators.length == 4 && hour >= 12) dateString += this.timeSeparators[3];
        }

        return dateString.substring(1);
    },


    /*Parses a string and returns a Date object获取文本框中的日期时间，如果没有则获取系统当前时间*/
    parseDate: function(Text) {
        var currentYear, currentMonth, currentDay, currentHour, currentMinute;
        if (this.timeSeparators && this.timeSeparators.length > 1) {
            var currentTimeAndDate = Text.split(this.timeSeparators[0]);//this.timeSeparators[0]为' ',所以将时期分割成日期与时间两部分
            var index = 0;
            while (index < currentTimeAndDate.length) if (currentTimeAndDate[index]) index++; else currentTimeAndDate.splice(index, 1);//删除currentTimeAndDate数组中无用的元素
            if (currentTimeAndDate.length > 0) var currentDate = currentTimeAndDate[0].split(this.dateFormat.charAt(3)); else var currentDate = [];//以'-'分割
            if (currentTimeAndDate.length > 1) var currentTime = currentTimeAndDate[1].split(this.timeSeparators[1]); else var currentTime = [];//有日期和时间两部分//以':'分割
        }
        else {//只有日期的日历框
            var currentDate = Text.split(this.dateFormat.charAt(3));
            var currentTime = null;
        }

        if (currentDate.length == 3) {
            currentDay = parseInt(this.trimNumber(currentDate[this.dateFormat.indexOf('D')]));
            currentMonth = parseInt(this.trimNumber(currentDate[this.dateFormat.indexOf('M')])) - 1;
            currentYear = parseInt(this.trimNumber(currentDate[this.dateFormat.indexOf('Y')]));
        } else {
            currentDay = new Date().getDate();
            currentMonth = new Date().getMonth();
            currentYear = new Date().getFullYear();
        }

        if (this.timeSeparators && this.timeSeparators.length > 1 && this.timeSeparators[0]) {//时间框或日期时间框
            if (currentTime != null && currentTime.length == 2) {//如果有时间
                currentHour = parseInt(this.trimNumber(currentTime[0]));

                if (this.timeSeparators.length > 2) {//有AM和PM时
                    if (currentTime[1].indexOf(this.timeSeparators[2]) == currentTime[1].length - this.timeSeparators[2].length) {
                        if (currentHour == 12) currentHour = 0;
                        currentMinute = parseInt(this.trimNumber(currentTime[1].substring(0, currentTime[1].length - this.timeSeparators[2].length)));
                    } else {
                        if (currentHour < 12) currentHour += 12;
                        currentMinute = parseInt(this.trimNumber(currentTime[1].substring(0, currentTime[1].length - this.timeSeparators[1].length)));
                    }
                }
                else currentMinute = parseInt(this.trimNumber(currentTime[1]));
            } else {
                currentHour = new Date().getHours();
                currentMinute = new Date().getMinutes();
            }
            return new Date(currentYear, currentMonth, currentDay, currentHour, currentMinute);
        }
        else return new Date(currentYear, currentMonth, currentDay);
    },


    /* Parse existing date and initialise calendar.分析现在的日期和初始化日历 */
    setDateFromField: function() {
		/*时间选择框*/
        if (arguments.length == 1 && this.input.val() != '') {//获取当前文本框的时间
            var pos = this.input.val().indexOf(':');
            this.selectedHour = parseInt(this.input.val().substring(0, pos),10);//substring与substr的区别(他们的作用相同，只是第二个参数的意义有点不同而已)，substr(start,length)、substring(start,end)
            this.selectedMinute = parseInt(this.input.val().substr(pos + 1),10);
            return;
        }
		/*日期选择框*/
        var currentDate = this.parseDate(this.input.val());//获取文本框中的日期时间，如果没有则获取系统当前时间，获取主要是为了打开日历框时设置它的默认日期时间
        this.currentDay = currentDate.getDate();
        this.currentMonth = currentDate.getMonth();
        this.currentYear = currentDate.getFullYear();
        if (this.timeSeparators && this.timeSeparators.length > 1 && this.timeSeparators[0]) {//如果不仅有日期还有时间
            this.currentHour = currentDate.getHours();
            this.currentMinute = currentDate.getMinutes();
        }


        this.selectedDay = this.currentDay;
        this.selectedMonth = this.currentMonth;
        this.selectedYear = this.currentYear;
        if (this.currentHour && this.currentMinute) {
            this.selectedHour = this.currentHour;
            this.selectedMinute = this.currentMinute;
        }
        this.adjustDate(0, 'D', true);
    },

    /*Translates this hour into the AM/PM number if neccessary*/
    hourString: function(Hour) {
        if (this.timeSeparators.length == 4) {
            if (Hour == 0) return '' + 12;
            else if (Hour > 12) return '' + (Hour - 12);
            else return '' + Hour;
        }
        else return '' + Hour;
    },

    /* Update the input field with the selected date. */
    /* Edited by Gregor Petrin to allow a custom input field as a parameter  - this can be used to display a date at start*/
    selectDate: function(Input) {
        if (!Input) var Input = this.input;
        this.hideCalendar(this.speed);
        if (this.timeSeparators.length > 1) Input.val(this.formatDate(this.selectedDay, this.selectedMonth, this.selectedYear, this.selectedHour, this.selectedMinute));
        else Input.val(this.formatDate(this.selectedDay, this.selectedMonth, this.selectedYear));
    },

    /* Construct and display the calendar. 构造并显示日历框（除时间选择框）*/
    showCalendar: function() {
        this.popUpShowing = true;
        // build the calendar HTML
        var timeSelect = '';
        if (this.timeSeparators.length > 1) {
            timeSelect += '<div id="calendar_time"><div class="select" style="width:37px;margin-left:55px;"><select id="calendar_hour" style="width:40px">';//小时下拉条

            if (this.timeSeparators.length == 4) {//支持AM/PM时
                if (this.selectedHour == 12 || this.selectedHour == 0) timeSelect += '<option value="12" selected="selected">12</option>';
                else timeSelect += '<option value="12">12</option>';
                for (var a = 1; a < 12; a++) {
                    if (this.selectedHour == a || (a == 12 && this.selectedHour == 0) || (a + 12 == this.selectedHour)) timeSelect += '<option value="' + a + '" selected="selected">' + a + '</option>';
                    else timeSelect += '<option value="' + a + '">' + a + '</option>';
                }
            } else {
                for (var a = 0; a < 24; a++) {
                    if (this.selectedHour == a) timeSelect += '<option value="' + a + '" selected="selected">' + a + '</option>';
                    else timeSelect += '<option value="' + a + '">' + a + '</option>';
                }
            }

            timeSelect += '</select></div><div class="select" style=" width:10px;">' + this.timeSeparators[1] + '</div> <div class="select" style="width:37px"><select id="calendar_minute" style="width:40px">';//分钟下拉条
            for (var a = 0; a <= 59; a++) {
                if (this.selectedMinute == a) timeSelect += '<option value="' + a + '" selected="selected">' + ((a >= 10) ? a : ('0' + a)) + '</option>';
                else timeSelect += '<option value="' + a + '">' + ((a >= 10) ? a : ('0' + a)) + '</option>';
            }
            timeSelect += '</select></div>';

            if (this.timeSeparators.length == 4) {
                timeSelect += ' <div class="select"><select id="calendar_ampm">';
                timeSelect += '<option value="AM"' + ((this.selectedHour < 12) ? ' selected="selected"' : '') + '>' + this.timeSeparators[2] + '</option>';
                timeSelect += '<option value="PM"' + ((this.selectedHour >= 12) ? ' selected="selected"' : '') + '>' + this.timeSeparators[3] + '</option>';
                timeSelect += '</select></div>';
            }

            timeSelect += '</div>';
        }

        var html = (this.closeAtTop ? '<div id="calendar_control">' +
			'<a id="calendar_clear" style="font-weight:normal">' + this.clearText + '</a>' +
			'<a id="calendar_close" style="font-weight:normal">' + this.closeText + '</a></div>' : '') +
			'<div id="calendar_links"><a id="calendar_prev">' + this.prevText + '</a>' +
			'<a id="calendar_current">' + this.currentText + '</a>' +
			'<a id="calendar_next">' + this.nextText + '</a></div>' +
			'<div id="calendar_header">';
        //alert(timeSelect);
        if (!this.changeMonth) {
            html += this.monthNames[this.selectedMonth] + '&nbsp;';
        }
        else {
            var inMinYear = (this.minDate && this.minDate.getFullYear() == this.selectedYear);
            var inMaxYear = (this.maxDate && this.maxDate.getFullYear() == this.selectedYear);
            html += '<div class="select" style="width:57px; margin-left:35px"><select id="calendar_newMonth" style="width:60px">';//月份下拉条
            for (var month = 0; month < 12; month++) {
                if ((!inMinYear || month >= this.minDate.getMonth()) &&
						(!inMaxYear || month <= this.maxDate.getMonth())) {
                    html += '<option value="' + month + '"' +
						(month == this.selectedMonth ? ' selected="selected"' : '') +
						'>' + this.monthNames[month] + '</option>';
                }
            }
            html += '</select></div>';
        }
        if (!this.changeYear) {
            html += this.selectedYear;
        }
        else {
            // determine range of years to display
            var years = this.yearRange.split(':');
            var year = 0;
            var endYear = 0;
            if (years.length != 2) {
                year = this.selectedYear - 10;
                endYear = this.selectedYear + 10;
            }
            else if (years[0].charAt(0) == '+' || years[0].charAt(0) == '-') {
                year = this.selectedYear + parseInt(years[0]);
                endYear = this.selectedYear + parseInt(years[1]);
            }
            else {
                year = parseInt(years[0]);
                endYear = parseInt(years[1]);
            }
            year = (this.minDate ? Math.max(year, this.minDate.getFullYear()) : year);
            endYear = (this.maxDate ? Math.min(endYear, this.maxDate.getFullYear()) : endYear);
            html += '<div class="select" style="width:49px"><select id="calendar_newYear" style="width:52px">';//年份下拉条
            for (; year <= endYear; year++) {
                html += '<option value="' + year + '"' +
					(year == this.selectedYear ? ' selected="selected"' : '') +
					'>' + year + '</option>';
            }
            html += '</select></div>';
        }
        html += '</div>' + timeSelect + '<table id="calendar" cellpadding="0" cellspacing="0"><thead>' +
			'<tr class="calendar_titleRow">';
        for (var dow = 0; dow < 7; dow++) {
            html += '<td>' + (this.changeFirstDay ? '<a>' : '') +
				this.dayNames[(dow + this.firstDay) % 7] + (this.changeFirstDay ? '</a>' : '') + '</td>';
        }
        html += '</tr></thead><tbody>';
        var daysInMonth = this.getDaysInMonth(this.selectedYear, this.selectedMonth);//获取某年某月的天数
        this.selectedDay = Math.min(this.selectedDay, daysInMonth);
        var leadDays = (this.getFirstDayOfMonth(this.selectedYear, this.selectedMonth) - this.firstDay + 7) % 7;//计算某月的第一天所在列到第一列的列数
        var currentDate = new Date(this.currentYear, this.currentMonth, this.currentDay);
        var selectedDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
        var printDate = new Date(this.selectedYear, this.selectedMonth, 1 - leadDays);//计算表格最前（非本月）的日期，因为本月不一定是从第一个表格开始的，如果不是，则把上一个月的最后几天填充到前面几个表格
		//calculate the number of rows to generate计算行数
        var numRows = Math.ceil((leadDays + daysInMonth) / 7);
        var today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // clear time保留日期，清空时间
        for (var row = 0; row < numRows; row++) { // create calendar rows
            html += '<tr class="calendar_daysRow">';
            for (var dow = 0; dow < 7; dow++) { // create calendar days
                var customSettings = (this.customDate ? this.customDate(printDate) : [true, '']);
                var otherMonth = (printDate.getMonth() != this.selectedMonth);//该表格是否是本月的日期
                var unselectable = otherMonth || !customSettings[0] ||
					(this.minDate && printDate < this.minDate) ||
					(this.maxDate && printDate > this.maxDate);
                html += '<td class="calendar_daysCell' +
					((dow + this.firstDay + 6) % 7 >= 5 ? ' calendar_weekEndCell' : '') + // highlight weekends//周末天class加上calendar_weekEndCell
					(otherMonth ? ' calendar_otherMonth' : '') + // highlight days from other months//表格前可能会有上月的日期，最后面可能有下月的日期
					(printDate.getTime() == selectedDate.getTime() ? ' calendar_daysCellOver' : '') + // highlight selected day突出当前选中的表格
					(unselectable ? ' calendar_unselectable' : '') +  // highlight unselectable days//突出不可选择的天，例如非本月的表格
					(!otherMonth || this.showOtherMonths ? ' ' + customSettings[1] : '') + '"' + // highlight custom dates
					(printDate.getTime() == currentDate.getTime() ? ' id="calendar_currentDay"' : // highlight current day//突出文本框中的日期，如果文本框中没有日期，则默认为当天
					(printDate.getTime() == today.getTime() ? ' id="calendar_today"' : '')) + '>' + // highlight today (if different)//突出今天
					(otherMonth ? (this.showOtherMonths ? printDate.getDate() : '&nbsp;') : // display for other months
					(unselectable ? printDate.getDate() : '<a>' + printDate.getDate() + '</a>')) + '</td>'; // display for this month//显示日期号
                printDate.setDate(printDate.getDate() + 1);
            }
            html += '</tr>';

        }
        html += '</tbody></table><!--[if lte IE 6.5]><iframe src="javascript:false;" id="calendar_cover"></iframe><![endif]-->' +

			(this.closeAtTop ? '' : '<div id="calendar_control"><a id="calendar_clear">' + this.clearText + '</a>' +

			'<a id="calendar_close">' + this.closeText + '</a></div>');
        // add calendar to element to calendar Div
        $('#calendar_div').empty().append(html).show(this.speed);
        this.input[0].focus();
        this.setupActions();
    }, // end showCalendar

    /* Initialisation. */
    init: function(e) {
        this.popUpShowing = false;//标识日历显示、隐藏
        this.lastInput = null;//记录当前引用日历框的input对象
        this.disabledInputs = [];//设置不能使用日历框的input,如this.disabledInputs = [$('#calendar2')[0]]，则表明id为calendar2的input不能使用日历框
        $('body').append('<div id="calendar_div"></div>');
        $(document).mousedown(popUpCal.checkExternalClick);//点击非日历框时隐藏日历框
    },

    /* Pop-up the calendar for a given input field. */
    showFor: function(target) {
        var input = (target.nodeName && target.nodeName.toLowerCase() == 'input' ? target : this);//如果是popUpCal调用该函数，则target为节点对象，this为是popUpCal。如果是事件处理函数（如：$input.focus(this.showFor);），则target为事件对象，this为节点对象//该语句的作用是将input对象赋给input.注：&&的优先级高于？：
        if (input.nodeName.toLowerCase() != 'input') { // find from button/image trigger
            input = $('../input', input)[0];
        }
        if (popUpCal.lastInput == input) { // already here
            return;
        }
        for (var i = 0; i < popUpCal.disabledInputs.length; i++) {  // check not disabled
            if (popUpCal.disabledInputs[i] == input) {
                return;
            }
        }
        popUpCal.input = $(input);
        popUpCal.hideCalendar();//关闭日历框
        popUpCal.lastInput = input;
        if (arguments.length == 2) {//arguments是javascript每个函数的自动生成的数组对象，用于保存形参的值。这里主要判断调用时是否传入'time'，传入则表明日历框只能选择时间，如果无则说明日历框还能选择日期
            popUpCal.setDateFromField('time');
        } else {
            popUpCal.setDateFromField();
        }
        popUpCal.setPos(input, $('#calendar_div'));

        $.extend(popUpCal, (popUpCal.fieldSettings ? popUpCal.fieldSettings(input) : {}));
        if (arguments.length == 2) {
            popUpCal.showTime();
        } else {
            popUpCal.showCalendar();
        }
    },

    /* Handle keystrokes. */
    doKeyDown: function(e) {
        if (popUpCal.popUpShowing) {
            switch (e.charCode) {
                case 9: popUpCal.hideCalendar(); break; // hide on tab out
                case 13: popUpCal.selectDate(); break; // select the value on enter
                case 27: popUpCal.hideCalendar(popUpCal.speed); break; // hide on escape
                case 33: popUpCal.adjustDate(-1, (e.ctrlKey ? 'Y' : 'M')); break; // previous month/year on page up/+ ctrl
                case 34: popUpCal.adjustDate(+1, (e.ctrlKey ? 'Y' : 'M')); break; // next month/year on page down/+ ctrl
                case 35: if (e.ctrlKey) $('#calendar_clear').click(); break; // clear on ctrl+end
                case 36: if (e.ctrlKey) $('#calendar_current').click(); break; // current on ctrl+home
                case 37: if (e.ctrlKey) popUpCal.adjustDate(-1, 'D'); break; // -1 day on ctrl+left
                case 38: if (e.ctrlKey) popUpCal.adjustDate(-7, 'D'); break; // -1 week on ctrl+up
                case 39: if (e.ctrlKey) popUpCal.adjustDate(+1, 'D'); break; // +1 day on ctrl+right
                case 40: if (e.ctrlKey) popUpCal.adjustDate(+7, 'D'); break; // +1 week on ctrl+down
            }
        }
        else if (e.keyCode == 36 && e.ctrlKey) { // display the calendar on ctrl+home
            popUpCal.showFor(this);//这里的this代表的是input对象，因为该行是是由$input.keydown(this.doKeyDown)调用的，而调用者是$input
        }
    },

    /* Filter entered characters. */
    doKeyPress: function(e) {
        var chr = String.fromCharCode(e.charCode == undefined ? e.keyCode : e.charCode);//兼容浏览器
        return (chr < ' ' || chr == popUpCal.dateFormat.charAt(3) || (chr >= '0' && chr <= '9')); // only allow numbers and separator//过滤不应该输入的字符
    },

    /* Attach the calendar to an input field. 为input绑定事件（如：获得焦点打开、关闭日期框。组合键等）*/
    connectCalendar: function(target) {
        var $input = $(target);
        $input.after('<span class="calendar_append">' + this.appendText + '</span>');
        if (this.autoPopUp == 'focus' || this.autoPopUp == 'both') { // pop-up calendar when in the marked fields
            $input.focus(this.showFor);//文本框获取焦点，打开日历框
        }
        if (this.autoPopUp == 'button' || this.autoPopUp == 'both') { // pop-up calendar when button clicked
            $input.wrap('<span class="calendar_wrap"></span>').
				after(this.buttonImageOnly ? '<img class="calendar_trigger" src="' +
				this.buttonImage + '" alt="' + this.buttonText + '" title="' + this.buttonText + '"/>' :
				'<button class="calendar_trigger">' + (this.buttonImage != '' ?
				'<img src="' + this.buttonImage + '" alt="' + this.buttonText + '" title="' + this.buttonText + '"/>' :
				this.buttonText) + '</button>');
            $((this.buttonImageOnly ? 'img' : 'button') + '.calendar_trigger', $input.parent('span')).click(this.showFor);
        }
        $input.keydown(this.doKeyDown).keypress(this.doKeyPress);
    },

    /* Enable the input field(s) for entry. */
    enableFor: function(inputs) {
        inputs = (inputs.jquery ? inputs : $(inputs));
        inputs.each(function() {
            this.disabled = false;
            $('../button.calendar_trigger', this).each(function() { this.disabled = false; });
            $('../img.calendar_trigger', this).each(function() { $(this).css('opacity', '1.0'); });
            var $this = this;
            popUpCal.disabledInputs = $.map(popUpCal.disabledInputs,
				function(value) { return (value == $this ? null : value); }); // delete entry
        });
        return false;
    },

    /* Disable the input field(s) from entry. */
    disableFor: function(inputs) {
        inputs = (inputs.jquery ? inputs : $(inputs));
        inputs.each(function() {
            this.disabled = true;
            $('../button.calendar_trigger', this).each(function() { this.disabled = true; });
            $('../img.calendar_trigger', this).each(function() { $(this).css('opacity', '0.5'); });
            var $this = this;
            popUpCal.disabledInputs = $.map(popUpCal.disabledInputs,
				function(value) { return (value == $this ? null : value); }); // delete entry
            popUpCal.disabledInputs[popUpCal.disabledInputs.length] = this;
        });
        return false;
    },
////////////////////
//////////////////////////
//////////////////////////
////////////////////////
    /* Connect behaviours to the calendar. */
    setupActions: function() {
        if (this.timeSeparators.length > 1) {
            $('#calendar_hour').change(function() {	//change hour//改变小时
                popUpCal.selecting = false;
                popUpCal.selectedHour = this.options[this.selectedIndex].value - 0;
                if (popUpCal.timeSeparators.length == 4) {
                    var ampm = $('#calendar_ampm').val();
                    if (ampm == 'AM' && popUpCal.selectedHour == 12) popUpCal.selectedHour = 0;
                    else if (ampm == 'PM' && popUpCal.selectedHour != 12) popUpCal.selectedHour += 12;
                }
                popUpCal.adjustDate();
                popUpCal.input.val(popUpCal.formatDate(popUpCal.selectedDay, popUpCal.selectedMonth, popUpCal.selectedYear, popUpCal.selectedHour, popUpCal.selectedMinute));
            }).click(this.selectMonthYear);
            $("#calendar_minute").change(function() {	//change minute
                popUpCal.selecting = false;
                popUpCal.selectedMinute = this.options[this.selectedIndex].value - 0;
                popUpCal.adjustDate();
                popUpCal.input.val(popUpCal.formatDate(popUpCal.selectedDay, popUpCal.selectedMonth, popUpCal.selectedYear, popUpCal.selectedHour, popUpCal.selectedMinute));
            }).click(this.selectMonthYear);
            $("#calendar_ampm").change(function() {		//change am/pm
                popUpCal.selecting = false;
                if (popUpCal.timeSeparators.length == 4) {
                    var ampm = $('#calendar_ampm').val();
                    if (ampm == 'AM' && popUpCal.selectedHour > 12) popUpCal.selectedHour -= 12;
                    else if (ampm == 'PM' && popUpCal.selectedHour < 12) popUpCal.selectedHour += 12;
                    else if (ampm == 'PM' && popUpCal.selectedHour == 12) popUpCal.selectedHour = 12;
                    else if (ampm == 'AM' && popUpCal.selectedHour == 12) popUpCal.selectedHour = 0;
                }
                popUpCal.adjustDate();
                popUpCal.input.val(popUpCal.formatDate(popUpCal.selectedDay, popUpCal.selectedMonth, popUpCal.selectedYear, popUpCal.selectedHour, popUpCal.selectedMinute));
            });
        }
        $('#calendar_clear').click(function() { // clear button link
            popUpCal.clearDate();
        });
        $('#calendar_close').click(function() { // close button link
            popUpCal.hideCalendar(popUpCal.speed);
        });
        $('#calendar_prev').click(function() { // setup navigation links
            popUpCal.adjustDate(-1, 'M');
        });
        $('#calendar_next').click(function() {
            popUpCal.adjustDate(+1, 'M');
        });
        $('#calendar_current').click(function() { // back to today
            popUpCal.selectedDay = new Date().getDate();
            popUpCal.selectedMonth = new Date().getMonth();
            popUpCal.selectedYear = new Date().getFullYear();
            popUpCal.adjustDate();
        });
        $('#calendar_newMonth').change(function() { // change month
            popUpCal.selecting = false;
            popUpCal.selectedMonth = this.options[this.selectedIndex].value - 0;
            popUpCal.adjustDate();
        }).click(this.selectMonthYear);
        $('#calendar_newYear').change(function() { // change year
            popUpCal.selecting = false;
            popUpCal.selectedYear = this.options[this.selectedIndex].value - 0;
            popUpCal.adjustDate();
        }).click(this.selectMonthYear);
        $('.calendar_titleRow a').click(function() { // change first day of week
            for (var i = 0; i < 7; i++) {
                if (popUpCal.dayNames[i] == this.firstChild.nodeValue) {
                    popUpCal.firstDay = i;
                }
            }
            popUpCal.showCalendar();
        });
        $('.calendar_daysRow td:has(a)').hover( // highlight current day
			function() {
			    $(this).addClass('calendar_daysCellOver');
			}, function() {
			    $(this).removeClass('calendar_daysCellOver');
			});
        $('.calendar_daysRow td:has(a)').click(function() { // select day
            popUpCal.selectedDay = $(this).find('>a').html();
            popUpCal.selectDate();
        });

    },

    /* Hide the calendar from view. */
    hideCalendar: function(speed) {//关闭（隐藏）日历框
        if (this.popUpShowing) {
            $('#calendar_div').hide(speed);
            this.popUpShowing = false;
            this.lastInput = null;
        }
    },

    /* Restore input focus after not changing month/year. */
    selectMonthYear: function() {
        if (popUpCal.selecting) {
            popUpCal.input[0].focus();
        }
        popUpCal.selecting = !popUpCal.selecting;
    },

    /* Erase the input field and hide the calendar. */
    clearDate: function() {
        this.hideCalendar(this.speed);
        this.input.val('');
    },

    /* Close calendar if clicked elsewhere. */
    checkExternalClick: function(event) {//点击其他地方，隐藏日历
        if (popUpCal.popUpShowing) {
			//alert(event.target.nodeName);
            var node = event.target;//获取当前点击节点对象
            var cal = $('#calendar_div')[0];//jquery对象转javascript对象
            while (node && node != cal && node.className != 'calendar_trigger') {//判断是否点击事件发生在$('#calendar_div')节点内
                node = node.parentNode;
            }
            if (!node) {
                popUpCal.hideCalendar();
            }
        }
    },

    /* Set as customDate function to prevent selection of weekends. */
    noWeekends: function(date) {
        var day = date.getDay();
        return [(day > 0 && day < 6), ''];
    },

    /* Ensure numbers are not treated as octal. */
    trimNumber: function(value) {//去除数字前的0，如05去除0变5，这样做为了使编译器不要误认为其是八进制
        if (value == '')
            return '';
        while (value.charAt(0) == '0') {
            value = value.substring(1);
        }
        return value;
    },

    /* Adjust one of the date sub-fields. */
    adjustDate: function(offset, period, dontShow) {//调整日期时间
        if (this.timeSeparators.length > 1) {
            var date = new Date(this.selectedYear + (period == 'Y' ? offset : 0),
			this.selectedMonth + (period == 'M' ? offset : 0),
			this.selectedDay + (period == 'D' ? offset : 0),
			this.selectedHour + (period == 'H' ? offset : 0),
			this.selectedMinute + (period == 'MIN' ? offset : 0));
        } else {
            var date = new Date(this.selectedYear + (period == 'Y' ? offset : 0),
			this.selectedMonth + (period == 'M' ? offset : 0),
			this.selectedDay + (period == 'D' ? offset : 0));
        }
        // ensure it is within the bounds set
        date = (this.minDate && date < this.minDate ? this.minDate : date);
        date = (this.maxDate && date > this.maxDate ? this.maxDate : date);
        this.selectedDay = date.getDate();
        this.selectedMonth = date.getMonth();
        this.selectedYear = date.getFullYear();
        if (this.timeSeparators.length > 1) {
            this.selectedHour = date.getHours();
            this.selectedMinute = date.getMinutes();
        }

        if (!dontShow) {
            this.showCalendar();
        }
    },

    /* Find the number of days in a given month. 解析某年某月的天数*/
    getDaysInMonth: function(year, month) {
        return 32 - new Date(year, month, 32).getDate();
    },

    /* Find the day of the week of the first of a month. 获取某年某月第一天是星期几*/
    getFirstDayOfMonth: function(year, month) {
        return new Date(year, month, 1).getDay();
    },

    /* Set an object's position on the screen. */
    setPos: function(targetObj, moveObj) {
        var coords = this.findPos(targetObj);
        moveObj.css('position', 'absolute').css('left', coords[0] + 'px').
			css('top', (coords[1] + targetObj.offsetHeight) + 'px');
    },

    /* Find an object's position on the screen. */
    findPos: function(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            curleft = obj.offsetLeft;
            curtop = obj.offsetTop;
            while (obj = obj.offsetParent) {
                var origcurleft = curleft;
                curleft += obj.offsetLeft;
                if (curleft < 0) {
                    curleft = origcurleft;
                }
                curtop += obj.offsetTop;
            }
        }
        return [curleft, curtop];
    },
    showTime: function() {
        this.popUpShowing = true;
        // build the calendar HTML
        var timeSelect = '';
        if (this.timeSeparators.length > 1) {
            timeSelect += '<div id="calendar_time"><div class="select" style="width:37px;margin-left:25px;"><select id="calendar_hour" style="width:40px">';
            if (this.timeSeparators.length == 4) {
                if (this.selectedHour == 12 || this.selectedHour == 0) timeSelect += '<option value="12" selected="selected">12</option>';
                else timeSelect += '<option value="12">12</option>';
                for (var a = 1; a < 12; a++) {
                    if (this.selectedHour == a || (a == 12 && this.selectedHour == 0) || (a + 12 == this.selectedHour)) timeSelect += '<option value="' + a + '" selected="selected">' + a + '</option>';
                    else timeSelect += '<option value="' + a + '">' + a + '</option>';
                }
            } else {
                for (var a = 0; a < 24; a++) {
                    if (this.selectedHour == a) timeSelect += '<option value="' + a + '" selected="selected">' + a + '</option>';
                    else timeSelect += '<option value="' + a + '">' + a + '</option>';
                }
            }

            timeSelect += '</select></div> <div class="select" style=" width:10px;">' + this.timeSeparators[1] + '</div> <div class="select" style="width:37px"><select id="calendar_minute" style="width:40px"';
            for (var a = 0; a <= 59; a++) {
                if (this.selectedMinute == a) {
                    timeSelect += '<option value="' + a + '" selected="selected">' + ((a >= 10) ? a : ('0' + a)) + '</option>';
                } else {
                    timeSelect += '<option value="' + a + '">' + ((a >= 10) ? a : ('0' + a)) + '</option>';
                }
            }
            timeSelect += '</select></div>';

            if (this.timeSeparators.length == 4) {
                timeSelect += ' <div class="select"><select id="calendar_ampm">';
                timeSelect += '<option value="AM"' + ((this.selectedHour < 12) ? ' selected="selected"' : '') + '>' + this.timeSeparators[2] + '</option>';
                timeSelect += '<option value="PM"' + ((this.selectedHour >= 12) ? ' selected="selected"' : '') + '>' + this.timeSeparators[3] + '</option>';
                timeSelect += '</select></div>';
            }

            timeSelect += '<div id="CLD_OK">确定</div></div>';
        }

        var html = (this.closeAtTop ? '<div id="calendar_control">' +
			'<a id="calendar_clear" style="font-weight:normal">' + this.clearText + '</a>' +
			'<a id="calendar_close" style="font-weight:normal">' + this.closeText + '</a></div>' : '');
        html += timeSelect;
        html += '<!--[if lte IE 6.5]><iframe src="javascript:false;" id="calendar_cover"></iframe><![endif]-->' +

			(this.closeAtTop ? '' : '<div id="calendar_control"><a id="calendar_clear">' + this.clearText + '</a>' +

			'<a id="calendar_close">' + this.closeText + '</a></div>');
        // add calendar to element to calendar Div
        $('#calendar_div').empty().append(html).show(this.speed);
        $('#CLD_OK').addClass('btOK_out');
        this.input[0].focus();
        //this.setupActions();
        popUpCal.timeActions();
    },
    timeActions: function() {
        if (this.timeSeparators.length > 1) {
            $('#calendar_hour').change(function() {	//change hour
                popUpCal.selecting = false;
                popUpCal.selectedHour = this.options[this.selectedIndex].value - 0;
                if (popUpCal.timeSeparators.length == 4) {
                    var ampm = $('#calendar_ampm').val();
                    if (ampm == 'AM' && popUpCal.selectedHour == 12) popUpCal.selectedHour = 0;
                    else if (ampm == 'PM' && popUpCal.selectedHour != 12) popUpCal.selectedHour += 12;
                }
                popUpCal.input.val(popUpCal.formatTime(popUpCal.selectedHour, popUpCal.selectedMinute));
            });
            $("#calendar_minute").change(function() {	//change minute
                popUpCal.selecting = false;
                popUpCal.selectedMinute = this.options[this.selectedIndex].value - 0;
                popUpCal.input.val(popUpCal.formatTime(popUpCal.selectedHour, popUpCal.selectedMinute));
            });
            $("#calendar_ampm").change(function() {		//change am/pm
                popUpCal.selecting = false;
                if (popUpCal.timeSeparators.length == 4) {
                    var ampm = $('#calendar_ampm').val();
                    if (ampm == 'AM' && popUpCal.selectedHour > 12) popUpCal.selectedHour -= 12;
                    else if (ampm == 'PM' && popUpCal.selectedHour < 12) popUpCal.selectedHour += 12;
                    else if (ampm == 'PM' && popUpCal.selectedHour == 12) popUpCal.selectedHour = 12;
                    else if (ampm == 'AM' && popUpCal.selectedHour == 12) popUpCal.selectedHour = 0;
                }
                popUpCal.input.val(popUpCal.formatTime(popUpCal.selectedHour, popUpCal.selectedMinute));
            });
        }
        $('#calendar_clear').click(function() { // clear button link
            popUpCal.clearDate();
        });
        $('#calendar_close').click(function() { // close button link
            popUpCal.hideCalendar(popUpCal.speed);
        });
        $('#CLD_OK').click(function() { // close button link
            if (popUpCal.input.val() == '') {
                popUpCal.input.val(popUpCal.formatTime(popUpCal.selectedHour, popUpCal.selectedMinute));
            }
            popUpCal.hideCalendar(popUpCal.speed);
        });
        $('#CLD_OK').hover(
			function() {
			    $(this).addClass('btOK_over');
			}, function() {
			    $(this).removeClass('btOK_over');
			    $(this).addClass('btOK_out');
			});
    },
    formatTime: function(hour, minute) {
        var timeString = '';
        //append time info
        if (this.timeSeparators && this.timeSeparators.length > 1 && this.timeSeparators[0] && hour != null && minute != null) {
            //alert(timeString)
            timeString += this.timeSeparators[0] + this.hourString(hour) + this.timeSeparators[1] + ((minute >= 10) ? minute : ('0' + minute));
            if (this.timeSeparators.length == 4 && hour < 12) timeString += this.timeSeparators[2];
            else if (this.timeSeparators.length == 4 && hour >= 12) timeString += this.timeSeparators[3];
        }
        return timeString.substring(1);
    }
};

/* Attach the calendar to a jQuery selection. */
$.fn.calendar = function(settings) {
	// customise the calendar object
	$.extend(popUpCal, settings || {});
	// attach the calendar to each nominated input element
	return this.each(function() {
		if (this.nodeName.toLowerCase() == 'input') {
			popUpCal.connectCalendar(this);
			var inputLen=this.maxLength;
			if(inputLen==10){
				popUpCal.timeSeparators=[];
			}
			if(inputLen==16){
				popUpCal.timeSeparators=[' ',':'];
			}
			if(inputLen==5){
				popUpCal.timeSeparators=[' ',':'];
				popUpCal.showFor(this,'time');//this代表input对象
			}else{
				popUpCal.showFor(this);
			}

		}
	});
};
$(function(){
	popUpCal.init();//初始化
});
