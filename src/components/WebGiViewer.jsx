import React,{useState,useRef,useCallback,useImperativeHandle, useEffect, forwardRef} from 'react';
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    addBasePlugins,
    mobileAndTabletCheck,
    CanvasSnipperPlugin,
    TweakpaneUiPlugin,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import { gsap } from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

// import image from ''
import { scrollAnimation } from '../lib/scroll-animation';

gsap.registerPlugin(ScrollTrigger)

const WebGiViewer=forwardRef((props,ref)=>{
  const canvasRef=useRef(null);
  const canvasContainerRef=useRef(null);
  const [viewerRef,setViewerRef]=useState(null);
  const [cameraRef,setCameraRef]=useState(null);
  const [targetRef,setTargetRef]=useState(null);
  const [positionRef,setPositionRef]=useState(null);
  const [previewMode,setPreviewMode]=useState(false);
  const [isMobile,setIsMobile]=useState(null);
  useImperativeHandle(ref,()=>({
    triggerPreview(){
      setPreviewMode(true)
      canvasContainerRef.current.style.pointerEvents="all",
      props.contentRef.current.style.opacity="0"
      gsap.to(positionRef,{
        x:13.04,
        y:-2.01,
        z:2.29,
        duration:2,
        onUpdate:()=>{
          viewerRef.setDirty();
          cameraRef.positionTargetUpdated(true);
        }
      })
      gsap.to(targetRef,{x:0.11,y:0.0,z:0.0,duration:2})
      viewerRef.scene.activeCamera.setCameraOptions({controlsEnabled:true})
    }
  }))
  const memoizedScrollAnimation=useCallback((position,target,isMobile,onUpdate)=>{
    if(position && target && onUpdate){
      scrollAnimation(position,target,isMobile,onUpdate);
    }
  },[])

  const setupViewer=useCallback(async()=>{
    
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas:canvasRef.current
    })
    
    setViewerRef(viewer);

    const isMobileOrTablet=mobileAndTabletCheck();
    setIsMobile(isMobileOrTablet)
    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    
    const camera=viewer.scene.activeCamera;
    const position=camera.position;
    const target=camera.target;
    setCameraRef(camera);
    setPositionRef(position);
    setTargetRef(target);
    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
    await viewer.addPlugin(new TonemapPlugin(true))
    await viewer.addPlugin(GammaCorrectionPlugin)
    await viewer.addPlugin(SSRPlugin)
    await viewer.addPlugin(SSAOPlugin)
    await viewer.addPlugin(BloomPlugin)
    
    viewer.renderer.refreshPipeline()
    
    await manager.addFromPath("scene-black.glb")
    viewer.getPlugin(TonemapPlugin).config.clipBackground=true;
    
    viewer.scene.activeCamera.setCameraOptions({controlsEnabled:false})
    // for mobile version
    if(isMobileOrTablet){
      position.set(-12.7,1.17,11.7);
      target.set(0,1.37,0);
      props.contentRef.current.className="mobile-or-tablet"
    }
    window.scrollTo(0,0)
    let needsUpdate=true;
    // onUpdate function
    const onUpdate=()=>{
      needsUpdate=true;
      viewer.setDirty()
    }
    
    viewer.addEventListener("preFrame",()=>{
      if(needsUpdate){
        camera.positionTargetUpdated(true);
        needsUpdate=false
      }
    })
    // animation function calling
    memoizedScrollAnimation(position,target,isMobileOrTablet,onUpdate);    
  },[])
  useEffect(()=>{
    setupViewer();
  },[])
  const handleExit=useCallback(()=>{
    canvasContainerRef.current.style.pointerEvents="none",
      props.contentRef.current.style.opacity="1",
      viewerRef.scene.activeCamera.setCameraOptions({controlsEnabled:false}),
      setPreviewMode(false)

      gsap.to(positionRef,{
        x:1.56,
        y:5,
        z:0.011,
        scrollTrigger:{
            trigger:".display-section",
            start:"top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
        onUpdate:()=>{
          viewerRef.setDirty(),
          cameraRef.positionTargetUpdated(true)
        }
    })
    .to(targetRef,{
      x:-0.55,
      y:0.32,
      z:0.0,
      scrollTrigger:{
          trigger:".display-section",
          start:"top bottom",
          end:"top top",
          scrub:2,
          immediateRender:false
      },
  })
  },[canvasContainerRef,viewerRef,positionRef,targetRef])
  return (
    <div ref={canvasContainerRef} id='webgi-canvas-container'>
      <canvas id="webgi-canvas" ref={canvasRef}/>
        {
          previewMode && <button className="button" onClick={handleExit}>Exit</button>
        }
      {/* </canvas> */}
    </div>
  )
}
) 
export default WebGiViewer;