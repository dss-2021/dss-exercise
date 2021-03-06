// TODO: templates as HTML fragments
const template = `
  <style>
    :host {
      background: black;
      height: 100%;
    }

    ::part(background),
    video {
      width: 100%;
      height: auto;

      position: absolute;
      top: 0;
      left: 0
    }

    ::part(details) {
      background-image:
        linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.6) 50%,
          transparent
        );
      color: white;
      padding: 8vh 8vw;

      width: 50%;
      height: 100%;

      position: absolute;
      top: 0;
      left: 0;
    }

    ::part(title) {
      font-size: 5vh;
      font-weight: bold;
      text-shadow: 2px 2px 0 black;
    }

    ::part(background)::after {
      content: 'TEST';
      display: block;
      background-image:
        linear-gradient(
          rgba(0, 0, 0, 0.6) 50%,
          transparent
        );

      width: 100%;
      height: 100%;

      position: absolute;
      bottom: 0;
      left: 0;
    }
  </style>

  <img
    part="background"
    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  />
  <video
    autoplay
    muted
    loop
  ></video>

  <div part="details">
    <div part="title"></div>
  </div>
`;

export default template;
