// const particlesConfigs = {
//   particles: {
//     number: {
//       value: 63,
//       density: {
//         enable: true,
//         value_area: 1000,
//       },
//     },

//     fullScreen: {
//       zIndex: -1,
//     },
//     color: {
//       value: "#007bff",
//     },
//     shape: {
//       type: "circle",
//       stroke: {
//         width: 0,
//         color: "#000000",
//       },
//       polygon: {
//         nb_sides: 5,
//       },
//       image: {
//         src: "img/github.svg",
//         width: 100,
//         height: "100vh",
//       },
//     },
//     opacity: {
//       value: 0.5,
//       random: false,
//       anim: {
//         enable: false,
//         speed: 1,
//         opacity_min: 0.1,
//         sync: false,
//       },
//     },
//     size: {
//       value: 5,
//       random: true,
//       anim: {
//         enable: false,
//         speed: 40,
//         size_min: 0.1,
//         sync: false,
//       },
//     },
//     line_linked: {
//       enable: true,
//       distance: 150,
//       color: "#000",
//       opacity: 0.3,
//       width: 1,
//     },
//     move: {
//       enable: true,
//       speed: 3,
//       direction: "none",
//       random: false,
//       straight: false,
//       out_mode: "out",
//       attract: {
//         enable: false,
//         rotateX: 600,
//         rotateY: 1200,
//       },
//     },
//   },
//   interactivity: {
//     style: {
//       position: "absolute",
//     },
//     detect_on: "canvas",
//     events: {
//       onhover: {
//         enable: true,
//         mode: "grab",
//       },
//       onclick: {
//         enable: true,
//         mode: "repulse",
//       },
//       resize: true,
//     },
//     modes: {
//       grab: {
//         distance: 165,
//         line_linked: {
//           opacity: 1,
//         },
//       },
//       bubble: {
//         distance: 400,
//         size: 40,
//         duration: 2,
//         opacity: 8,
//         speed: 3,
//       },
//       repulse: {
//         distance: 200,
//       },
//       push: {
//         particles_nb: 4,
//       },
//       remove: {
//         particles_nb: 2,
//       },
//     },
//   },
//   retina_detect: true,
//   config_demo: {
//     hide_card: false,
//     background_color: "#b61924",
//     background_image: "",
//     background_position: "50% 50%",
//     background_repeat: "no-repeat",
//     background_size: "cover",
//   },
// };
const particlesConfigs ={
  
  fullScreen: {
    zIndex: -1,
  },
  style:{
    position:"absolute"
  }
  ,
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: "grab",
      },
    },
    modes: {
      push: {
        distance: 200,
        duration: 15,
      },
      grab: {
        distance: 150,
      },
    },
  },
  particles: {
    color: {
      value: "#007bff",
    },
    links: {
      color: "#000",
      distance: 170,
      enable: true,
      opacity: 0.4,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: true,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 70,
    },
    opacity: {
      value: 1.0,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 3, max: 4 },
    },
  },
  detectRetina: true,
};

export default particlesConfigs;
