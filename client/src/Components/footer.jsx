import github from "../assets/github.svg";
function Footer() {
  return (
    <footer id="footer" className="border-header-footer flexrow justifyCenter ">
      <p>
        Made by Kevin Jean.
        <a target="_blank" href="https://github.com/KevinJN03">
          <span>Github</span>

          <div id="image-wrapper">
            <img src={github}></img>
          </div>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
