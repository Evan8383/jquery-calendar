const mainElement = $('main')

let timeBlockArr = [9, 10, 11, 12, 13, 14, 15, 16, 17]

timeBlockArr.forEach((hour, i) => {
  const containerDiv = $('<div>')
  const containerTime = $('<div>')
  const containerTextArea = $('<textarea>')
  const containerButton = $('<button>')

  mainElement.append(containerDiv)

  containerDiv.attr('id', 'hour-' + timeBlockArr[i])
  containerDiv.attr('class', 'row time-block')

  containerTime.attr('class', 'col-2 col-md-1 hour text-center py-3')

  containerTime.text(hour - 12 === 0 ? 12 + 'pm'
    : hour - 12 === 12 ? 12 + 'am'
      : hour < 12 ? hour + 'am'
        : hour - 12 + 'pm')

  containerTextArea.attr('class', 'col-8 col-md-10 description')
  containerTextArea.attr('rows', '3')

  containerButton.attr('class', 'btn saveBtn col-2 col-md-1')
  containerButton.append('<i class="fas fa-save" aria-hidden="true">')

  containerDiv.append(containerTime)
  containerDiv.append(containerTextArea)
  containerDiv.append(containerButton)
})


$(function () {
  $('button').on('click', function () {
    const scheduledTask = $(this).parent().find('textarea').val()
      alert("Task Saved"); 
    localStorage.setItem($(this).parent().attr('id'), scheduledTask)
  })

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

  $(Array.from($(document.body.children[1]).find('.time-block'))).each(function () {
    for (let i = 0; i < localStorage.length; i++) {
      if ($(this).attr('id') === localStorage.key(i)) {
        $(this).find('textarea').text(localStorage.getItem(localStorage.key(i)))
      }
    }
  })

  $('#currentDay').text(dayjs().format('dddd,') + ' ' + dayjs().format('MMMM DD') + ', ' + dayjs().format('hh:mma'))
  setInterval(() => {
    $('#currentDay').text(dayjs().format('dddd,') + ' ' + dayjs().format('MMMM DD') + ', ' + dayjs().format('hh:mma'))
  }, 1000)
});