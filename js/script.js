"use strict";

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
var agent = navigator.userAgent.toLowerCase();
var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);

var _w;
var _breakpoint = 720;
var _breakpointDesktop = 1099;
var _wrap;
var _wid;

$(function(){
    tmapInit();
});

function tmapInit(){
    create();
    addEvent();
    slideEvent();
    menuAction();
    pageMove('.page-move');
    // thumbEvent();

    if( isMobile ) {
        // onlyMobile();
    }
}

function create(){
    _w = $(window);
    _wrap = $('#wrap');
    _wid = _w.width();
}

function addEvent(){
    _w.on("resize", resizeEvent);
    resizeEvent();

    $('.popup-dim').on('click', function(){
        $(this).hide();
        $('.popup').hide();
    });
}

function resizeEvent(){
    _wid = _w.width();

    $('.responsive').each(function() {
        var $src = $(this).attr("src");
        var val = (_wid > _breakpointDesktop) ? $src.replace('mobile', 'pc') : $src.replace('pc', 'mobile');

        $(this).attr("src", val);
    });
}

function slideEvent(){
    $('.slide-list').each(function(key, item) {
        var sliderIdName = 'slider' + key;
            this.id = sliderIdName;
        var sliderId = '#' + sliderIdName;
    
        $(sliderId).slick({
            mobileFirst: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 10000,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            arrows: false,
            focusOnSelect: true,
            pauseOnHover: true,
            pauseOnFocus: true,
        });

        // $(sliderId).slick('slickPlay').slick('setOption', 'autoplay', true);
    });

    $('.slide-list .slick-slide').hover(function(){
        var $neededSpace = (170 + 95);
        // $(this).removeClass('display-left');

        // console.log(1);
        var $myPosX = (($('.slide-list').offset().left) + ($('.slide-list').outerWidth(true))) - $(this).offset().left;

        if ($myPosX < $neededSpace) {
            // $(this).addClass('display-left');
            $(this).parents().find('.slide-list').slick('slickPause')
        }
    });


    function slickPause() {
        $('.slide-list').slick('slickPause');
    }
    // slickPause();

    $('.slide-list a').mouseover(function() {
        slickPause();
        $('.slide-list').slick('slickPause');
    });
    $('.slide-list a').mouseout(function() {
        $('.slide-list').slick('slickPlay');
    });
}

function menuAction(){
    $('.js-menu').on('click', function(e){
        e.preventDefault();

        $(this).parent().toggleClass('active');
    });
}

function thumbEvent(){
    $('.thumbnail-list a').on('click', function(){
        var _src = $(this).children('img').attr('src');

        popupOpen('', 'thumbnailLayer');
        $('.thumbnail-layer').find('img').attr('src', _src);
    });
}

function pageMove($selector, $position){
    if($position == undefined) $position = 0;

    var selector = $selector;
    $(selector).on('click', function (e) {
        e.preventDefault();

        var _top = $($(this).attr('href'));
        var $target = _top.offset().top;

        $('html,body').animate({
            scrollTop: $target+$position
        }, 500);
    });
}

// popupClose('.dimmed','popup_open');
function popupClose($dimName, $idName){
    var dimName = $dimName;
    var $popupLayer = $("#"+$idName);
    $(dimName).hide();
    $popupLayer.hide();
}

// popupOpen('.dimmed', 'popup_open');
function popupOpen($dimName, $idName){
    var dimName = $dimName;
    var $popupLayer = $("#"+$idName);
    $(dimName).show();
    $popupLayer.show();
    popupPosition($popupLayer);
    popupSlideEvent($popupLayer);
}

function popupSlideEvent($popupLayer){
    $popupLayer.children().find('.preview-list').not('.slick-initialized').slick({
        mobileFirst: true,
        infinite: true,
        // autoplay: true,
        lazyLoad: 'progressive',
        adaptiveHeight: true,
        arrows: false,
        dots: true
    });

    // $('.preview-list').each(function(key, item) {
    //     var sliderIdName = 'preview' + key;
    //         this.id = sliderIdName;
    //     var sliderId = '#' + sliderIdName;

    //     $(sliderId).slick({
    //         mobileFirst: true,
    //         infinite: true,
    //         autoplay: true,
    //         adaptiveHeight: true
    //     });
    // });
}

function popupPosition($popupLayer) {
    var st = $(window).scrollTop();
    var winHeight = $(window).height();
    var popupHeight = $popupLayer.outerHeight();

    var topValue = (st + ( winHeight / 2 - popupHeight / 2 ));
    if($(window).height() < popupHeight){
        topValue = st;
    }

    $popupLayer.css({top:topValue});
}