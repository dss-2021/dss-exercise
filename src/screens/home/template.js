import '../../components/dis-hero';
import '../../components/dis-wall';

const template = `
  <style>
    :host {
      display: block;
      height: 100%;
      overflow: hidden;
    }

    ::part(heroArea) {
      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
    }

    dis-wall {
      width: 100%;
      height: 50%;

      position: absolute;
      bottom: 0;
    }
  </style>

  <div data-hero-area></div>
  <dis-wall></dis-wall>
`;

export default template;
