window.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);


    const header = document.querySelector('header')
    const fixedSc = document.querySelector('.fixed-section')
    const container = document.querySelector('#container')
    const body = document.querySelector('body')
    const sc1 = document.querySelector('.sc-section-1')
    const sc3 = document.querySelector('.sc-section-3')
    const resultSc = document.querySelector('.result-section')
    const mobNavBtn = document.querySelector('.mob-nav-btn')

    const loading = document.querySelector('.loading')

    loading.classList.add('On')

    setTimeout(() => {
        const tl = gsap.timeline()

        tl.to(loading, {
            opacity: 0,
            duration: .3,
            ease: 'power2.out',
            onComplete: () => {
                loading.style.display = 'none'
                header.classList.add('load')

            }
        })
        tl.fromTo('.fixed-section .t-wrap>*', {
            delay: 1,
            opacity: 0,
            y: 10
        }, {

            y: 0,
            stagger: .3,
            opacity: 1
        })



    }, 2000)


    let hasEntered = false



    //1. header load 효과




    mobNavBtn.addEventListener('click', (e) => {
        e.preventDefault()
        body.classList.toggle('show-modal-nav')
    })


    // 5  sc1의 bottom이 viewport top에 닿을 때 - fixedSc z-index 조절
    ScrollTrigger.create({
        trigger: sc1,
        start: 'bottom top',
        onEnter: () => gsap.set(fixedSc, { zIndex: -1 }),
        onLeaveBack: () => gsap.set(fixedSc, { zIndex: 2 }),
    })


    // 6 result section 
    window.addEventListener('scroll', () => {
        const rect = sc3.getBoundingClientRect();
        const sc3BottomVp = rect.bottom <= 5

        if (sc3BottomVp && !hasEntered) {
            resultSc.style.position = 'relative'
            resultSc.style.zIndex = '1'
            container.style.paddingBottom = '0'
            hasEntered = true
        } else if (!sc3BottomVp && hasEntered) {
            resultSc.style.position = 'fixed'
            resultSc.style.zIndex = '-1'
            container.style.paddingBottom = '100vh'
            hasEntered = false
        }

    })




    //2. 헤더 효과 (휠 방향에 따라 클래스 토글)
    window.addEventListener('wheel', (event) => {
        if (event.deltaY < 0) {
            header.classList.add('up')

            if (window.scrollY === 0) {

                header.classList.remove('up')
            }
        }
        else {
            header.classList.remove('up')

        }
    })

    // 3 fixedSc 점차 어두워 지기
    gsap.to(fixedSc, {
        backgroundColor: '#000',
        ease: 'power2.out',
        scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    })

    // 4dark class binding


    gsap.to(sc1, {
        scrollTrigger: {
            trigger: sc1,
            start: 'bottom 70%',
            end: 'bottom 75%',
            scrub: true,
            onEnter: () => {
                body.classList.add('dark')

            },
            onLeaveBack: () => {
                body.classList.remove('dark')

            }
        }
    })




    $(function () {//jquery start

        const navSchBtn = $('nav .sch-btn')
        const body = $('body')
        const schModalBg = $('.sch-modal-bg')
        const overlay = $('.overlay')

        navSchBtn.on('click', function (e) {
            e.preventDefault()
            schModalBg.slideDown()

            setTimeout(function () {
                body.addClass('sch-modal-open')

            }, 200)
        })
        overlay.on('click', function (e) {
            e.preventDefault()
            schModalBg.slideUp()

            setTimeout(function () {
                body.removeClass('sch-modal-open')

            }, 200)
        })




    })    //jquery end



    const sc1Slider = new Swiper(".sc1-slider", {
        navigation: {
            nextEl: ".sc-section-1 .swiper-button-next",
            prevEl: ".sc-section-1 .swiper-button-prev",
        },
        spaceBetween: 30,
        slidesPerView: 1
    });


})