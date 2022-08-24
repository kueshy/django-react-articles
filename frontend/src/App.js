import React, { useEffect, useState } from "react";
import "./App.css";
import ArticlesList from "./components/ArticlesList";
import ArticleForm from "./components/ArticleForm";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/articles/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setArticles(resp);
      })
      .catch((error) => error.message);
  }, []);

  const editBtn = (article) => {
    setEditArticle(article);
  };

  const deleteBtn = (article) => {
    const new_articles = articles.filter((myarticle) => {
      if (myarticle.id === article.id) {
        return false;
      } else {
        return true;
      }
    });
    setArticles(new_articles);
  };

  const updatedInformation = (article) => {
    const new_article = articles.map((my_article) => {
      if (my_article.id === article.id) {
        return article;
      } else {
        return my_article;
      }
    });
    setArticles(new_article);
  };

  const insertedInformation = (article) => {
    const newArticle = [...articles, article];
    setArticles(newArticle);
  };

  const articleForm = () => {
    setEditArticle({ title: "", description: "" });
  };

  useEffect(() => {
    if (!token["mytoken"]) {
      navigate("/login");
    }
  });

  const logout = () => {
    removeToken(["mytoken"]);
  };

  return (
    <div className="App">
      <div className="row">
        <div className="col-md-8">
          <div className="row ">
            <div className="col">
              <h1>Django and React App blog</h1>
            </div>
            <div className="col">
              <div className="d-flex justify-content-end">
                <button onClick={articleForm} className="btn btn-primary">
                  Insert Article
                </button>{" "}
                &ensp;
                <button onClick={logout} className="btn btn-warning">
                  Logout
                </button>
              </div>
            </div>
          </div>

          <ArticlesList
            articles={articles}
            editBtn={editBtn}
            deleteBtn={deleteBtn}
          />
        </div>
        <div className="col-md-4">
          {editArticle ? (
            <ArticleForm
              article={editArticle}
              updatedInformation={updatedInformation}
              insertedInformation={insertedInformation}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
