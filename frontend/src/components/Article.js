import React, { useState, useEffect } from "react"
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa"

import { useDispatch, useSelector } from "react-redux"
import articlesActions from "../redux/actions/articlesActions"
import usersActions from "../redux/actions/usersActions"
import toast from "react-hot-toast"

const Article = (props) => {
   const wishlist = useSelector((state) => state.users.wishList)
   const user = useSelector((state) => state.users.user)
   console.log(user)
   const dispatch = useDispatch()
   const {
      name,
      photos,
      price,
      hasDiscount,
      genres,
      gameType,
      minAge,
      _id,
      discountPrice,
      iconPhotos,
   } = props.article

   const addToCart = (e, id, value) => {
      e.stopPropagation()
      dispatch(articlesActions.updateCart("add", id))
      toast.custom((t) => (
         <div
            className={`${
               t.visible ? "animate-enter" : "animate-leave"
            } bg-white flex`}
            style={{
               display: "flex",
               alignContent: "center",
               alignItems: "center",
               padding: "5px 10px",
               borderRadius: "15px",
               backgroundImage:
                  "url('https://i.postimg.cc/D0zYct9S/card-Style56.png')",
               backgroundPosition: "center right 50px",
               backgroundSize: "cover",
            }}
         >
            <img
               style={{ width: "55px", height: "55px" }}
               className="h-3 w-3 rounded-full"
               src="https://i.postimg.cc/jSsTk02Z/robot-Cell.png"
               alt=""
            />
            <p
               className="text-sm"
               style={{
                  marginBottom: 0,
                  color: "#ff9424",
                  fontWeight: "bold",
               }}
            >
               You have {value} to the shopping cart
            </p>
         </div>
      ))
   }

   const handleFav = (e) => {
      e.stopPropagation()
      dispatch(usersActions.toggleWishList(_id))
   }

   return (
      <div
         style={{ textDecoration: "none", cursor: "pointer" }}
         onClick={() => props.history.push(`/article/${_id}`)}
      >
         <div
            className="cardArticle"
            style={{
               backgroundImage: `url("https://i.postimg.cc/sftdwcnd/article.png")`,
            }}
         >
            <div
               className="photosArticle"
               style={{ backgroundImage: `url('${iconPhotos}')` }}
            >
               {user ? (
                  <div className="circleFav" onClick={(e) => handleFav(e)}>
                     {wishlist.some((i) => {
                        return i._id === _id
                     }) ? (
                        <FaHeart />
                     ) : (
                        <FaRegHeart />
                     )}
                  </div>
               ) : (
                  <div
                     className="circleFav"
                     onClick={(e) => {
                        e.stopPropagation()
                        toast.custom((t) => (
                           <div
                              className={`${
                                 t.visible ? "animate-enter" : "animate-leave"
                              } bg-white flex`}
                              style={{
                                 display: "flex",
                                 alignContent: "center",
                                 alignItems: "center",
                                 padding: "5px 10px",
                                 borderRadius: "15px",
                                 backgroundImage:
                                    "url('https://i.postimg.cc/D0zYct9S/card-Style56.png')",
                                 backgroundPosition: "center right 50px",
                                 backgroundSize: "cover",
                              }}
                           >
                              <img
                                 style={{ width: "55px", height: "55px" }}
                                 className="h-3 w-3 rounded-full"
                                 src="https://i.postimg.cc/jSsTk02Z/robot-Cell.png"
                                 alt=""
                              />
                              <p
                                 className="text-sm"
                                 style={{
                                    marginBottom: 0,
                                    color: "#ff9424",
                                    fontWeight: "bold",
                                 }}
                              >
                                 You must be logged in to add an item to your
                                 wish list
                              </p>
                           </div>
                        ))
                     }}
                  >
                     <FaRegHeart />
                  </div>
               )}
            </div>
            <div className="gameInfo">
               <div className="price">
                  {" "}
                  {hasDiscount === false ? (
                     <p
                        style={{
                           color: "lightgreen",
                           fontSize: 21,
                           fontWeight: "bold",
                        }}
                     >
                        ${price.toFixed(2)} USD
                     </p>
                  ) : (
                     <div className="priceArticle">
                        <p
                           style={{
                              textDecoration: "line-through",
                              color: "lightgrey",
                              fontSize: 21,
                              fontWeight: "bold",
                              paddingRight: "1.2rem",
                           }}
                        >
                           ${price.toFixed(2)}
                        </p>
                        <p
                           style={{
                              color: "lightgreen",
                              fontSize: 21,
                              fontWeight: "bold",
                           }}
                        >
                           ${discountPrice.toFixed(2)} USD
                        </p>
                     </div>
                  )}
               </div>
               <div className="gameName">
                  <h4>{name}</h4>
               </div>
               <div className="gameDetails">
                  <p>
                     <img src="./assets/gener.png" />{" "}
                     {genres.map((genre) => genre.name)}
                  </p>
                  <p>
                     <img src="./assets/type.png" /> {gameType.name}
                  </p>
                  <div className="buyLine">
                     <p>
                        <img src="./assets/age.png" /> {minAge}
                     </p>
                     {user ? (
                        <div className="divCart">
                           <FaCartPlus
                              id="buy"
                              src="./assets/buy.png"
                              onClick={(e) => addToCart(e, _id, name)}
                           />
                        </div>
                     ) : (
                        <div className="divCart">
                           <FaCartPlus
                              id="buy"
                              src="./assets/buy.png"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 toast.custom((t) => (
                                    <div
                                       className={`${
                                          t.visible
                                             ? "animate-enter"
                                             : "animate-leave"
                                       } bg-white flex`}
                                       style={{
                                          display: "flex",
                                          alignContent: "center",
                                          alignItems: "center",
                                          padding: "5px 10px",
                                          borderRadius: "15px",
                                          backgroundImage:
                                             "url('https://i.postimg.cc/D0zYct9S/card-Style56.png')",
                                          backgroundPosition:
                                             "center right 50px",
                                          backgroundSize: "cover",
                                       }}
                                    >
                                       <img
                                          style={{
                                             width: "55px",
                                             height: "55px",
                                          }}
                                          className="h-3 w-3 rounded-full"
                                          src="https://i.postimg.cc/jSsTk02Z/robot-Cell.png"
                                          alt=""
                                       />
                                       <p
                                          className="text-sm"
                                          style={{
                                             marginBottom: 0,
                                             color: "#ff9424",
                                             fontWeight: "bold",
                                          }}
                                       >
                                          You must log in to add an item to the
                                          shopping cart
                                       </p>
                                    </div>
                                 ))
                              }}
                           />
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Article
