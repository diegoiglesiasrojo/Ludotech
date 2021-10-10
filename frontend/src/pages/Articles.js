import React, { useState } from "react"
import Article from "../components/Article"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Filter from "../components/Filter"
import HeroPages from "../components/HeroPages"
import Preloader from "../components/Preloader"

const Articles = (props) => {
  const [articles, setArticles] = useState({
    articles: [],
    page: 1,
    totalCounts: null,
    totalPages: 1,
  })
  const [loadingArticles, setLoadingArticles] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const filterArticles = (e) => {
    setArticles(e)
  }
  return (
    <>
      <div
        className="signInBody"
        style={{
          backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
        }}
      >
        <HeroPages />
        <Header />
        <div className="bodyArticles">
          <h2>Articles</h2>
          <div className="filterContainer">
            <Filter
              filterArticles={(e) => filterArticles(e)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setLoadingArticles={setLoadingArticles} // esto es nuevo! para un preloader se puede mandar esto. es opcional.
            />
            <div className="containerArticles">
              {loadingArticles ? (
                <Preloader /> // cambiarlo acá, es de prueba jj
              ) : (
                articles.articles.map((article) => {
                  return (
                    <Article
                      history={props.history}
                      article={article}
                      key={article._id}
                    />
                  )
                })
              )}
            </div>
            {articles.totalPages > 1 && (
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                {currentPage > 1 && (
                  <button
                    type="button"
                    style={{ padding: ".3rem 1.2rem" }}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Prev
                  </button>
                )}
                <p style={{ margin: "0", fontSize: "1.2rem", color: "white" }}>
                  Current page: {currentPage}/{articles.totalPages}
                </p>
                {currentPage < articles.totalPages && (
                  <button
                    style={{ padding: ".3rem 1.2rem" }}
                    type="button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Articles
