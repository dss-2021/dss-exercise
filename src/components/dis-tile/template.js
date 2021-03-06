// TODO: templates as HTML fragments
const template = `
  <style>
    :host {
      position: relative;
    }

    ::part(content) {
      width: 100%;
      height: 100%;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: height 0.2s, width 0.2s;
    }

    [focus]::part(content) {
      border: 3px solid white;

      width: 120%;
      height: 120%;

      z-index: 1;
    }

    ::part(background) {
      border: none;
      object-fit: cover;

      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
      left: 0;
    }
  </style>

  <div part="content">
    <img
      part="background"
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    />
  </div>
`;

export default template;
