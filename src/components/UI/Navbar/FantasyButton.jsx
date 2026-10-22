import "./FantasyButton.css";

export default function FantasyButton({
  label = "FANTASY",
  badge = "NEW",
  onClick,
}) {
  return (
    <div onClick={onClick} className="fantasy-header-btn">
      {" "}
      <li>
        <a className="nav_item c_text">
          <div className="taj_icon_img">
            <img src="/icon/taj_icon-DlEhzIqk.svg" />
          </div>{" "}
          {label}
        </a>
        <div className="fantasy_new_tag">
          <img src="/icon/new_tag_icon-CpQ1UtEL.svg" />
          <span>{badge}</span>
        </div>
      </li>
    </div>
  );
}
