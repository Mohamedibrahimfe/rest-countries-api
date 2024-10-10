const Navbar = () => {
    return (
      <nav className="navbar">
        <h1>Where in the world ?</h1>
        <div
          className="toggle"
          onClick={() => document.body.classList.toggle("light")}
        >
          <svg
            fill="#ffffff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            id="moon-alt-7"
            className="icon glyph"
            transform="rotate(-45)matrix(-1, 0, 0, 1, 0, 0)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M5,21.21A10,10,0,1,0,5,2.79,10,10,0,0,1,5,21.21Z"></path>
            </g>
          </svg>
          <span>Dark Mode</span>
        </div>
      </nav>
    );
}
 
export default Navbar;