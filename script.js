// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// 

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours of 9am&ndash;5pm
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist


// adding/removing these classes on each div by comparing the hour in the
// id to the current hour
// ? If statement/switch to check current hour. Could make this a function and call it for each.
// ! save icon:  <i class="fas fa-save" aria-hidden="true"></i>





$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  let currentHour = dayjs().get('hour') // creating a new Date

  $(Array.from($(document.body.children[1]).find('.time-block'))).each(function () {
    const hourCheck = /\d{2}|\d/gi;

    if ($(this).attr('id').match(hourCheck)) {
      const timeBlockHour = $(this).attr('id').match(hourCheck).toString();
      switch (true) {
        case timeBlockHour == currentHour:
          $(this).addClass('present');
          break;
        case timeBlockHour < currentHour:
          $(this).addClass('past');
          break;
        default:
          $(this).addClass('future');
          break;
      }
    }
  });
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  let currentDate
  switch (true) {
    case dayjs().day() == 0:
      currentDate = 'Sunday'
      break;
    case dayjs().day() == 1:
      currentDate = 'Monday'
      break;
    case dayjs().day() == 2:
      currentDate = 'Tuesday'
      break;
    case dayjs().day() == 3:
      currentDate = 'Wednesday'
      break;
    case dayjs().day() == 4:
      currentDate = 'Thursday'
      break;
    case dayjs().day() == 5:
      currentDate = 'Friday'
      break;
    case dayjs().day() == 6:
      currentDate = 'Saturday'
      break;
  }
  $('#currentDay').text(currentDate + ', ' + dayjs().get('hour') + ':' + dayjs().get('minute') + ':' + dayjs().get('second'))
  setInterval(() => {
    $('#currentDay').text(currentDate + ', ' + dayjs().get('hour') + ':' + dayjs().get('minute') + ':' + dayjs().get('second'))
  }, 1000)

});