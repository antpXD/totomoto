const easing = [0.6, -0.05, 0.01, 0.99];

// login/user page animation
export const slideIn = {
  initial: {
    y: 400
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing
    }
  }
};

// home page animation
export const slideOut = {
  initial: {
    y: -200
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: easing
    }
  }
};

// home carousel animation
export const zoomOut = {
  initial: {
    scale: 1.2
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.2
    }
  }
};
