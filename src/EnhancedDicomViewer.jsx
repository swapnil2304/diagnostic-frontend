import React, { useEffect, useRef } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

// Initialize the WADO image loader (do this once, ideally in your top-level code)
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

// Configure Cornerstone Tools
cornerstoneTools.init();

// Optional: Set default tool configuration (you can customize the following as needed)
const defaultToolOptions = {
  getZoomSpeed: () => 1.5,
  getPanSpeed: () => 1,
};

// Register some basic tools (for measurement, pan/zoom, window leveling, etc.)
cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
cornerstoneTools.addTool(cornerstoneTools.PanTool);
cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
cornerstoneTools.addTool(cornerstoneTools.LengthTool);
cornerstoneTools.addTool(cornerstoneTools.AngleTool);

export default function EnhancedDicomViewer({ imageId }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    // Enable the Cornerstone element for this container
    cornerstone.enable(element);
    
    // Load and display the image. imageId must be a valid DICOM image identifier,
    // e.g. using WADO-URI such as "wadouri:http://localhost:8042/wado?objectUID=1.2.840...."
    cornerstone.loadImage(imageId).then((image) => {
      cornerstone.displayImage(element, image);

      // Activate default tools (for example, enable zoom tool on right-click)
      cornerstoneTools.setToolActive("ZoomTool", { mouseButtonMask: 2 });
      // Enable pan (left-click & drag) if desired
      cornerstoneTools.setToolActive("PanTool", { mouseButtonMask: 4 });
      // Enable window leveling (left-click & drag) for basic settings
      cornerstoneTools.setToolActive("WwwcTool", { mouseButtonMask: 1 });
    });

    // Cleanup: disable the element if the component unmounts
    return () => {
      cornerstone.disable(element);
    };
  }, [imageId]);

  return (
    <div
      ref={elementRef}
      style={{ width: "512px", height: "512px", backgroundColor: "black" }}
    >
      Loading DICOM Image...
    </div>
  );
}
