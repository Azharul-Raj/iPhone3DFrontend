import React,{useState,useRef,useCallback,useImperativeHandle} from 'react';
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
    IViewerPlugin,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";


export default function WebGiViewer() {
  const canvasRef=useRef(null);
  async function setupViewer(){
  
  // Initialize the viewer
  const viewer = new ViewerApp({
      canvas:canvas.current
  })
  
  // Add some plugins
  const manager = await viewer.addPlugin(AssetManagerPlugin)
  
  
  // Add plugins individually.
  // await viewer.addPlugin(GBufferPlugin)
  // await viewer.addPlugin(new ProgressivePlugin(32))
  // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
  // await viewer.addPlugin(GammaCorrectionPlugin)
  // await viewer.addPlugin(SSRPlugin)
  // await viewer.addPlugin(SSAOPlugin)
  // await viewer.addPlugin(DiamondPlugin)
  // await viewer.addPlugin(FrameFadePlugin)
  // await viewer.addPlugin(GLTFAnimationPlugin)
  // await viewer.addPlugin(GroundPlugin)
  // await viewer.addPlugin(BloomPlugin)
  // await viewer.addPlugin(TemporalAAPlugin)
  // await viewer.addPlugin(AnisotropyPlugin)
  
  // or use this to add all main ones at once.
  await addBasePlugins(viewer)
  
  // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
  await viewer.addPlugin(CanvasSnipperPlugin)
  
  // This must be called once after all plugins are added.
  viewer.renderer.refreshPipeline()
  
  await manager.addFromPath("./assets/sene-black.glb")
  
  // Load an environment map if not set in the glb file
  // await viewer.scene.setEnvironment(
  //     await manager.importer!.importSinglePath<ITexture>(
  //         "./assets/environment.hdr"
  //     )
  // );
  
  // Add some UI for tweak and testing.
  const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
  // Add plugins to the UI to see their settings.
  uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)
  
  }
  return (
    <div className='wbgi-canvas-container'>
      <canvas id="webgi-canvas" ref={canvasRef}>

      </canvas>
    </div>
  )
}
``