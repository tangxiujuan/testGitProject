// $(document).ready(function(){

// })
// 等同于
$(function(){
    $('.ws-list2').mouseenter(function(){
        $('.ws-dl2').show()
    })
    $('.ws-list2').mouseleave(function(){
        $('.ws-dl2').hide()
    })
    $('.ws-list3').mouseenter(function(){
        $('.ws-dl3').show()
    })
    $('.ws-list3').mouseleave(function(){
        $('.ws-dl3').hide()
    })
    new Swiper ('.swiper-container', {
        autoplay: 2000,//可选选项，自动滑动
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
    })        
    //跑马灯
    // $('.service-banner').liMarquee({
    //     direction: 'left',
    //     scrollamount:100,

    // });
})