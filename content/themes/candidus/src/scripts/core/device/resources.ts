export const defaultBreakpointMap: DeviceScreenBreakpointMap[] = [
  {
    device: 'mobile-sm',
    breakpoint: {
      min: 0,
      max: 575,
    },
  }, {
    device: "mobile-md",
    breakpoint: {
      min: 575,
      max: 767
    }
  },
  {
    device: 'tablet-sm',
    breakpoint: {
      min: 575,
      max: 992,
    },
  },
  {
    device: 'tablet-md',
    breakpoint: {
      min: 992,
      max: 1200,
    },
  },
  {
    device: 'desktop',
    breakpoint: {
      min: 1200,
      max: 9999,
    },
  },
];

export const defaultObserverConfig: ResizingObserverConfig = {
  isScrolling: false,
  isResizing: false,
  checkInterval: 250,
};
