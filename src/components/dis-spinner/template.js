// TODO: templates as HTML fragments
const template = `
  <style>
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    :host {
      animation: 1s linear infinite spin;

      border-radius: 30vh;
      background-image:
        conic-gradient(
          #0064e5,
          #36ffff,
          #0064e5
        );
      -webkit-mask-image:
        radial-gradient(
          transparent 4.5vh,
          white 5vh,
          transparent 12vh
        );
      transition: opacity 0.3s;

      width: 15vh;
      height: 15vh;

      position: absolute;
      top: calc(50% - 15vh / 2);
      left: calc(50% - 15vh / 2);
    }
  </style>
`;

export default template;
