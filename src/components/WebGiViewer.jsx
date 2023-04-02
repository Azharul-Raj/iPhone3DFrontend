import React,{useState,useRef,useCallback,useImperativeHandle, useEffect} from 'react';
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
export default function WebGiViewer() {
  const canvasRef=useRef(null);
  const memoizedScrollAnimation=useCallback((position,target,onUpdate)=>{
    if(position && target && onUpdate){
      scrollAnimation(position,target,onUpdate);
    }
  },[])
  const setupViewer=useCallback(async()=>{
  
    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas:canvasRef.current
    })
    
    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    
    const camera=viewer.scene.activeCamera;
    const position=camera.position;
    const target=camera.target;
    
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
    memoizedScrollAnimation(position,target,onUpdate);    
    },[])
    useEffect(()=>{
      setupViewer();
    },[])
  return (
    <div id='webgi-canvas-container'>
      <canvas id="webgi-canvas" ref={canvasRef}/>

      {/* </canvas> */}
    </div>
  )
}
