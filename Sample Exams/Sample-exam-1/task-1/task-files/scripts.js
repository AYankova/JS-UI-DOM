function createCalendar(selector, events) {
	var selectedElement = document.querySelector(selector);
	var dayBox = document.createElement("div");
	var dayBoxTitle = document.createElement('strong');
	var dayBoxContent = document.createElement("div");
	var fragment = document.createDocumentFragment();

	var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var selectedBox = null;

	selectedElement.style.width = (120 * 7.5) + 'px';
	dayBoxContent.innerHTML = '&nbsp;';

	dayBox.style.display = "inline-block";
	dayBox.style.border = "1px solid black";
	dayBox.style.margin = "0";
	dayBox.style.padding = "0";
	dayBox.style.width = "120px";
	dayBox.style.height = "120px";

	dayBoxTitle.style.display = "block";
	dayBoxTitle.style.background = "green";
	dayBoxTitle.style.borderBottom = "1px solid black";
	dayBoxTitle.style.textAlign = 'center';
	dayBoxTitle.style.color = 'pink';

	dayBoxTitle.className = 'day-title';
	dayBoxContent.className = 'day-content';

	dayBox.appendChild(dayBoxTitle);
	dayBox.appendChild(dayBoxContent);

	function createMonthBoxes(daysInMonth, daysOfWeek) {
		var dayBoxes = [];

		for (var i = 0; i < daysInMonth; i++) {
			var dayOfWeek = daysOfWeek[i % daysOfWeek.length];
			dayBoxTitle.innerHTML = dayOfWeek + ' ' + (i + 1) + ' Jun 2014';
			dayBoxes.push(dayBox.cloneNode(true));
		}

		return dayBoxes;
	}

	function addCalendarEvents(boxes, events) {
		for (var i = 0; i < events.length; i++) {
			var event = events[i];
			var content = boxes[event.date - 1].querySelector(".day-content");
			content.innerHTML = event.hour + " " + event.title;
		}
	}

	function hoverOnADay() {
		this.style.background = "blue";
	}

	function unhoverOnADay() {
		this.style.background = "green";
	}

	function clickADay() {
		if (selectedBox) { //no box is selected
			selectedBox.style.background = '';
		}

		if (selectedBox && selectedBox === this) {
			selectedBox = null;
		} else {
			this.style.background = 'yellowgreen';
			selectedBox = this;
		}
	}

	var boxes = createMonthBoxes(30, daysOfWeek);
	addCalendarEvents(boxes, events);

	for (var i = 0; i < boxes.length; i += 1) {
		fragment.appendChild(boxes[i]);
		boxes[i].querySelector(".day-title").addEventListener("mouseenter", hoverOnADay);
		boxes[i].querySelector(".day-title").addEventListener("mouseleave", unhoverOnADay);
		boxes[i].addEventListener("click", clickADay);
	}

	selectedElement.appendChild(fragment);
}