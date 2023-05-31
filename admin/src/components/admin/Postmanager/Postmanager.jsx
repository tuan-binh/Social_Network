import "./Postmanager.scss";

import React, { useEffect, useState } from "react";

import axios from "axios";

function Postmanager() {
  const [reload, setReload] = useState(false);

  const [dataPost, setDataPost] = useState([]);

  const loaderPost = async () => {
    await axios
      .get("http://localhost:8000/posts")
      .then((res) => setDataPost(res.data));
  };

  async function handleHidden(id) {
    await axios.patch(`http://localhost:8000/posts/${id}`, { isHidden: true });
    // dispatch(reloadPosts());
    setReload(!reload);
  }

  async function handleUnHidden(id) {
    await axios.patch(`http://localhost:8000/posts/${id}`, { isHidden: false });
    // dispatch(reloadPosts());
    setReload(!reload);
  }

  useEffect(() => {
    loaderPost();
  }, [reload]);

  return (
    <div>
      <h2 className="title">Postmanager</h2>
      <div className="flex-posts">
        <div className="show-posts">
          <ul className="posts-admin">
            {dataPost.map((e, i) => {
              if (e.isHidden === false) {
                return (
                  <li key={i} className="item">
                    <div className="head">
                      <div className="avatar">
                        <img src={e.idUser.urlAvatar} alt="" />
                      </div>
                      <p>{e.idUser.username}</p>
                      <i
                        onClick={() => handleHidden(e.id)}
                        className="fa-solid fa-eye-slash"
                      ></i>
                    </div>
                    <div className="content">
                      {e.dataPost.tagName ? (
                        <span className="tag-name">
                          {e.dataPost.tagName.map((e, i) => (
                            <b key={i}>{e.value} </b>
                          ))}
                        </span>
                      ) : (
                        ""
                      )}
                      {e.dataPost.text ? (
                        <p className="noidung">{e.dataPost.text}</p>
                      ) : (
                        ""
                      )}
                      {e.dataPost.urlUpload ? (
                        <img src={e.dataPost.urlUpload} alt="" />
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="hidden-posts">
          <ul className="posts-admin">
            {dataPost.map((e, i) => {
              if (e.isHidden === true) {
                return (
                  <li key={i} className="item">
                    <div className="head">
                      <div className="avatar">
                        <img src={e.idUser.urlAvatar} alt="" />
                      </div>
                      <p>{e.idUser.username}</p>
                      <i
                        onClick={() => handleUnHidden(e.id)}
                        className="fa-solid fa-eye"
                      ></i>
                    </div>
                    <div className="content">
                      {e.dataPost.text ? (
                        <p className="noidung">{e.dataPost.text}</p>
                      ) : (
                        ""
                      )}
                      {e.dataPost.urlUpload ? (
                        <img src={e.dataPost.urlUpload} alt="" />
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Postmanager;
