import { gsap } from "gsap";

export const scrollAnimation=(position,target,isMobile,onUpdate)=>{
    const tl=gsap.timeline();
    tl.to(position,{
        x:isMobile?-7.0:-1.38,
        y:isMobile?-12.2:-10.74,
        z:isMobile?-6.0:-6.93,
        scrollTrigger:{
            trigger:".sound-section",
            start:"top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
        onUpdate
    })
    .to(target,{
        x:isMobile?0.7:1.52,
        y:isMobile?1.9:0.77,
        z:isMobile?0.7:1.08
    })
    .to(".jumbotron-section",{
        opacity:0,
        scrollTrigger:{
            trigger:".sound-section",
            start:"top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
    .to(".sound-section-content",{
        opacity:1,
        scrollTrigger:{
            trigger:".sound-section",
            start:"top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
    .to(position,{
        x:isMobile?20.56:1.56,
        y:isMobile?10.95:5,
        z:isMobile?0.09: 0.011,
        scrollTrigger:{
            trigger:".display-section",
            start:"top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
        onUpdate
    })
    .to(target,{
        x:isMobile?-1.62:-0.55,
        y:isMobile?0.2: 0.32,
        z:isMobile?-0.6: 0.0,
        scrollTrigger:{
            trigger:".display-section",
            start:"top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
    .to(".display-section",{
        opacity:1,
        scrollTrigger:{
            trigger:".display-section",
            start:"top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
}