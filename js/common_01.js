$(document).ready(function () {
    var slider_quant = $('#slider .item').length; // item 개수
    var quant = slider_quant - 1; // 시작한거처럼 -1
    var tempoAutomatico = 8000; // 타이머

    // progress bar timer
    function timer() {
        $('.slider_timer').clearQueue().finish();
        $('.slider_timer').animate({ width: '0' }, 0);
        $('.slider_timer').animate({ width: '100%' }, tempoAutomatico);
    }

    //  자동 화면 슬라이드
    function automatic() {
        timer();
        var posicao = $('.item').index($('.item_active'));
        if (posicao < quant) {
            var atual = $('.item').eq(posicao);
            $('.nav-li').eq(posicao).removeClass('active');
            atual.fadeOut(300, function () {
                atual.removeClass('item_active');
            });

            posicao++;

            var atual2 = $('.item').eq(posicao);
            $('.nav-li').eq(posicao).addClass('active');
            atual2.fadeIn(300, function () {
                atual2.addClass('item_active');
            });
        } else {
            var atual = $('.item').eq(posicao);
            $('.nav-li').eq(posicao).removeClass('active');
            atual.fadeOut(300, function () {
                atual.removeClass('item_active');
            });

            posicao = 0;

            var atual2 = $('.item').eq(posicao);
            $('.nav-li').eq(posicao).addClass('active');
            atual2.fadeIn(300, function () {
                atual2.addClass('item_active');
            });
        }
    }

    // 처음부터 슬라이드 리셋
    var tempoSlide = window.setInterval(automatic, tempoAutomatico);
    function endAndStartTimer() {
        window.clearTimeout(tempoSlide);
        tempoSlide = window.setInterval(automatic, tempoAutomatico);
    }

    // 버튼 클릭 슬라이드 보이기
    function navigation() {
        for (var i = 1; i <= slider_quant; i++) {
            $('#navs').append("<li class='nav-li'>" + '</li>');
        }

        var marcado = $('.item').index($('.item_active'));
        $('.nav-li').eq(marcado).addClass('active');

        $('.nav-li').on('click', function () {
            endAndStartTimer();
            timer();
            var posicao = $(this).index();
            $('.nav-li').removeClass('active');
            var atual = $('.item_active');
            atual.fadeOut(300, function () {
                atual.removeClass('item_active');
            });

            var atual2 = $('.item').eq(posicao);
            $(this).addClass('active');
            atual2.fadeIn(300, function () {
                atual2.addClass('item_active');
            });
        });
    }

    timer();
    navigation();
});
