import React, { Fragment, useState, useEffect, useCallback } from "react";
import { MENUITEMS } from "../../Sidebar/Menu";
import plusIcon from "../../../assets/used-files/icons/plus.svg";
import { Image } from "../../../AbstractElements";

const BookmarkHeader = () => {
  // eslint-disable-next-line
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [bookmarkSearch, SetBookmarkSearch] = useState(false);
  const [bookmarkItems, setBookmarkItems] = useState([]);
  const [bookmarkDropDown, setBookmarkDropDown] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      SetBookmarkSearch(false);
      document.querySelector(".filled-bookmark").classList.remove("is-open");
      document
        .querySelector(".page-wrapper")
        .classList.remove("offcanvas-bookmark");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    mainmenu.map((menuItems) => {
      menuItems.Items.filter((items) => {
        if (items.bookmark) {
          setBookmarkItems((bookmarkItems) => [...bookmarkItems, items]);
        }
        return items;
      });
      return menuItems;
    });
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [mainmenu, escFunction]);

  const handleSearchKeyword = (keyword) => {
    keyword ? addFix() : removeFix();
    const items = [];
    mainmenu.map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (
          Items.title.toLowerCase().includes(keyword) &&
          Items.type === "link"
        ) {
          items.push(Items);
        }
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (
            subItems.title.toLowerCase().includes(keyword) &&
            subItems.type === "link"
          ) {
            subItems.icon = Items.icon;
            items.push(subItems);
          }
          if (!subItems.children) return false;
          subItems.children.filter((suSubItems) => {
            if (suSubItems.title.toLowerCase().includes(keyword)) {
              suSubItems.icon = Items.icon;
              items.push(suSubItems);
            }
            return suSubItems;
          });
          return subItems;
        });
        checkSearchResultEmpty(items);
        return Items;
      });
      return menuItems;
    });
  };

  const checkSearchResultEmpty = (items) => {
    if (!items.length) {
      document.querySelector(".empty-bookmark").classList.add("is-open");
    } else {
      document.querySelector(".empty-bookmark").classList.remove("is-open");
    }
  };

  const addFix = () => {
    document.querySelector(".filled-bookmark").classList.add("is-open");
  };

  const removeFix = () => {
    document.querySelector(".filled-bookmark").classList.remove("is-open");
  };

  const addToBookmark = (event, items) => {
    const index = bookmarkItems.indexOf(items);
    if (index === -1 && !items.bookmark) {
      items.bookmark = true;
      event.currentTarget.classList.add("starred");
      setBookmarkItems([...bookmarkItems, items]);
    } else {
      event.currentTarget.classList.remove("starred");
      bookmarkItems.splice(index, 1);
      setBookmarkItems(bookmarkItems);
      items.bookmark = false;
    }
  };

  const removeOffcanvas = () => {
    if (bookmarkSearch) {
      document.querySelector(".filled-bookmark").classList.remove("is-open");
      document
        .querySelector(".page-wrapper")
        .classList.remove("offcanvas-bookmark");
    }
    SetBookmarkSearch(!bookmarkSearch);
  };

  const addnewbookmark = () => {
    document.querySelector(".flip-card-inner").classList.add("flipped");
  };
  const backtobookmark = () => {
    document.querySelector(".flip-card-inner").classList.remove("flipped");
  };

  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div
          className="notification-box"
          onClick={() => setBookmarkDropDown(!bookmarkDropDown)}
          style={{ background: "black", borderRadius: "30px" }}
        >
          <Image
            attrImage={{
              src: plusIcon,
              className: `header-icon-margin`,
              alt: "",
            }}
          />
        </div>
        {/* <div
          className={`onhover-show-div bookmark-flip ${
            bookmarkDropDown ? "active" : ""
          }`}
        >
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="front">
                <h6
                  onClick={removeOffcanvas}
                  className="f-18 mb-0 dropdown-title"
                >
                  {Bookmark}
                </h6>
                <ul className="droplet-dropdown bookmark-dropdown">
                  <li className="custom-scrollbar">
                    <Row>
                      <Col xs="4" className="text-center">
                        <div className="bookmark-content">
                          <div className="bookmark-icon">
                            <Link to="/">
                              <Image
                                attrImage={{
                                  src: jobIcon,
                                  className: `header-icon-margin`,
                                  alt: "",
                                }}
                              />
                            </Link>
                          </div>
                          <span>Add new Job</span>
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <li className="text-center">
                    <Btn
                      attrBtn={{
                        color: "transparent",
                        className:
                          "text-uppercase text-decoration-underline flip-btn f-w-700",
                        onClick: addnewbookmark,
                      }}
                    >
                      Add new Job
                    </Btn>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </li>
    </Fragment>
  );
};

export default BookmarkHeader;
