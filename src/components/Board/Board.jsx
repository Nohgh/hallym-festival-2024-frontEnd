import React, { useEffect, useState } from "react";
import "./Board.scss";

const Board = ({ data }) => {
  const [load, setLoad] = useState(false);
  const [openMdl, setOpenMdl] = useState(false);

  const clickModal = () => {
    setOpenMdl(true);
  };

  const handleBoardClick = () => {
    if (openMdl) {
      setOpenMdl(false);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setLoad(true);
    }
  }, [data]);

  return (
    <div className="Board" onClick={handleBoardClick}>
      <div className="Board-list">
        {openMdl && <div className="Board-list-img"></div>}
        {load ? (
          data.map((it, index) => (
            <div className="item" key={index}>
              <img src={it.url} alt={it.title} />
              <div className="text">
                <div id="text1">{it.title}</div>
                <div id="text2">{it.content}</div>
              </div>
            </div>
          ))
        ) : (
          <h2>이번년도 축제는 뭔가 달라....</h2>
        )}
      </div>
      <div
        className="Board-btn"
        onClick={(e) => {
          e.stopPropagation();
          clickModal();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M565.6 36.2C572.1 40.7 576 48.1 576 56V392c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456V120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5V421.2l120-45.7V90.8L48 136.5zM360 422.7V137.3l-144-48V374.7l144 48zm48-1.5l120-45.7V90.8L408 136.5V421.2z" />
        </svg>
      </div>
    </div>
  );
};

export default Board;
