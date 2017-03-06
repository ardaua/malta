//посмотреть больше
$(function () {
    var h = 360, t = $('#ta'), max = t[0].scrollHeight, min = 320;
    $('.read-next').on('click', function (event) {
        var H = t.height();
        if (H == max) {
            H = min
        }
        else if (H + h > max) {
            H = max
        }
        else {
            H += h
        }
        t.height(H);
        $(this).text(H == max ? 'скрыть' : 'узнать больше');
        return false
    })
});
