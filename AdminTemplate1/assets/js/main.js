$(document).ready(function () {

    let sidebar = $('.sidebar');
    let mainBody = $('.main-body');
    let body = $('body');
    let sidebarOpen = true;
    let sidebarForcedOpen = false;
    let minimumWindowSize = 700;

    if (sidebar.hasClass('closed')) {
        sidebar.find('.sidebar-toggler').css('display', 'none');
        if (!mainBody.hasClass('open')) {
            mainBody.addClass('open');
        }
        sidebarOpen = false;
    } else {
        mainBody.find('.sidebar-toggler').css('display', 'none');
    }

    $('.sidebar-toggler').click(function () {
        if (!sidebarOpen) {
            sidebarOpen = true;
            if (parseInt($('body').css('width').replace(/px/g, '')) < minimumWindowSize) {
                sidebarForcedOpen = true;
            }
            showSidebar(true);
        } else {
            sidebarOpen = false;
            showSidebar(false);
        }
    });

    $(window).on('resize', function () {
        if (parseInt($('body').css('width').replace(/px/g, '')) >= minimumWindowSize) {
            if (!sidebarOpen) {
                sidebarOpen = true;
                showSidebar(true);
            }
            sidebarForcedOpen = false;
        } else {
            if (sidebarOpen && !sidebarForcedOpen) {
                sidebarOpen = false;
                showSidebar(false);
            }
        }
        calculateMenuScroll();
    });

    calculateMenuScroll();

    function showSidebar(show = false) {
        let bodyWidth = parseInt(body.css('width').replace(/px/g, ''));
        if (show) {
            sidebar.find('.sidebar-toggler').css('display', 'inherit');
            mainBody.find('.sidebar-toggler').css('display', 'none');

            sidebar.animate({
                width: '300px'
            }, 200, function () {
                sidebar.removeClass('closed');
                sidebar.removeAttr('style');
            });

            mainBody.animate({
                width: (bodyWidth - 300).toString() + 'px'
            }, 200, function () {
                mainBody.removeClass('open');
                mainBody.removeAttr('style');
            });
        } else {
            sidebar.find('.sidebar-toggler').css('display', 'none');
            mainBody.find('.sidebar-toggler').css('display', 'inherit');

            sidebar.animate({
                width: '0'
            }, 200, function () {
                sidebar.addClass('closed');
                sidebar.removeAttr('style');
            });

            mainBody.animate({
                width: bodyWidth.toString() + 'px'
            }, 200, function () {
                mainBody.addClass('open');
                mainBody.removeAttr('style');
            });
        }
    }

    function calculateMenuScroll() {
        $('.menu').slimscroll({
            color: '#00f',
            size: '10px',
            height: (parseInt($('.sidebar').css('height').replace(/px/g, '')) - 60) + 'px',
            railVisible: true
        });
    }
});