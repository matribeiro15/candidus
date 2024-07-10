type DeviceType = 'mobile-sm' | 'mobile-md' | 'tablet-sm' | 'tablet-md' | 'desktop';
type BreakpointSize = 0 | 575 | 767 | 992 | 1200 | 9999;

interface DeviceScreenBreakpointMap {
  device: DeviceType;
  breakpoint: {
    min: BreakpointSize;
    max: BreakpointSize;
  };
}

interface ResizingObserverConfig {
  isResizing: boolean;
  isScrolling: boolean;
  checkInterval: number;
}