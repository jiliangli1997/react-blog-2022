import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Jiliang</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://images.squarespace-cdn.com/content/v1/55c8073fe4b02a74ffe18e48/1628556762510-1SDLZZQJ9Z58N1NVUQ79/ddpcpd5-2652a1e9-8d33-46d4-95b7-84fccb3a8694.jpg?format=1500w"
        alt="headerImg"
      />
    </div>
  );
}
