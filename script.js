var input = document.querySelector('input');

function numberWithCommas(num) {
    if (num.match(/^0\..*/g)) return num;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getInputValue() {
    return input.value.replace(/,/g, "");
}

function setContent(selector, value, accuracy)
{
    accuracy = accuracy || 2;
    value = parseFloat(value).toFixed(accuracy);
    document.querySelector(selector).textContent = numberWithCommas(value);
}

input.addEventListener('input', function()
{
    var value = getInputValue();
    input.value = numberWithCommas(value);
    if (!isNaN(value))
    {
        setContent("#perYear", value*12);
        setContent("#perMonth", value*1);
        setContent("#perWeek", value/4);
        setContent("#perDay", value/30);
        setContent("#perHour", value/(30*12));
        setContent("#perWorkedHour", value/(30*7));
        setContent("#perMinute", value/(30*12*60), 4);
        setContent("#perSecond", value/(30*12*60*60), 4);
    }
});

var startTime = new Date();

function updateSinceArrived() {
    var value = getInputValue();
    var nowTime = new Date();
    var timeDiff = (nowTime - startTime) / 1000;
    var seconds = Math.round(timeDiff % 60);
    var moneySinceArrived = seconds * value / (30*12*60*60);
    setContent("#sinceArrived", moneySinceArrived, 4);
}

setInterval(updateSinceArrived, 1000);

if(window.innerHeight > window.innerWidth){
    alert("Please rotate your device in landscape!");
}
