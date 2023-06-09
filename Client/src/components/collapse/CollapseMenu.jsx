import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Collapse } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { callAPI } from "../../utils/FetchData.jsx";
import ItemCard from "../itemCard/ItemCard.jsx";
import "./CollapseMenu.css";

function CollapseMenu({ booked, order, setOrder }) {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const [categories, setCategories] = useState("");
  const [items, setItems] = useState([]);
  const { Panel } = Collapse;
  useEffect(() => {
    let fetchData = async () => {
      await callAPI(
        `${import.meta.env.VITE__API_URL}/api/categories`,
        "GET",
        "",
        token
      ).then((res) => {
        if (!res.error) setCategories(res);
      });
    };
    fetchData();
  });
  function EditCategory(event, id) {
    event.stopPropagation();
    navigate(`editcategory/${id}`);
  }
  function DeleteCategory(event, id) {
    event.stopPropagation();
    callAPI(
      `${import.meta.env.VITE__API_URL}/api/categories/${id}`,
      "DELETE",
      {},
      token
    ).then((res) => {
      if (res === "Category deleted")
        setCategories(categories.filter((category) => category._id !== id));
    });
  }
  function onChange(key) {
    setItems([]);
    if (key.length !== 0) {
      callAPI(
        `${import.meta.env.VITE__API_URL}/api/items/getitems/${
          categories[key]._id
        }`,
        "GET",
        {},
        token
      ).then((res) => {
        setItems(res);
      });
    }
  }
  function onClick(id, name, price) {
    const index = order.findIndex((x) => x.id === id);
    if (index === -1) {
      const newOrder = [
        ...order,
        { id: id, name: name, price: price, quantity: 1 },
      ];
      setOrder(newOrder);
    } else {
      const newOrder = [...order];
      newOrder[index].quantity++;
      setOrder(newOrder);
    }
  }
  return (
    <div className="CollapseMenu">
      <Collapse accordion className="Collapse" onChange={onChange}>
        {categories &&
          categories.map((categorie, id) => {
            return (
              <Panel
                header={
                  <div className="Header">
                    {categorie.name}
                    {!booked && (
                      <div className="HeaderIcons">
                        <div className="Icons">
                          <EditFilled
                            style={{ color: "#ffffff" }}
                            onClick={(event) =>
                              EditCategory(event, categorie._id)
                            }
                          />
                        </div>
                        <div className="Icons">
                          <DeleteFilled
                            style={{ color: "#ffffff", marginLeft: "0px" }}
                            onClick={(event) =>
                              DeleteCategory(event, categorie._id)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                }
                key={id}
                className="Panel"
              >
                <div className="ItemsMenu">
                  {items?.map((item) => {
                    return booked ? (
                      <div
                        onClick={() => {
                          onClick(item._id, item.name, item.price);
                        }}
                        key={item._id}
                        className="ItemMenu"
                      >
                        <ItemCard
                          title={item.name}
                          price={item.price}
                          description={item.description}
                          img={item.img}
                          url={item.url}
                        />
                      </div>
                    ) : (
                      <Link to={`edititem/${item._id}`} key={item._id}>
                        <ItemCard
                          title={item.name}
                          price={item.price}
                          description={item.description}
                          img={item.picture}
                          url={item.url}
                        />
                      </Link>
                    );
                  })}

                  {!booked && (
                    <Link to={`additem/${categorie._id}`}>
                      <ItemCard
                        title={"Add new items"}
                        img={"add new items"}
                        url={
                          "https://firebasestorage.googleapis.com/v0/b/dineease-backend.appspot.com/o/plus_sign.png?alt=media&token=71d63aca-6746-4a20-80e3-8a18efdcd5b6"
                        }
                      />
                    </Link>
                  )}
                </div>
              </Panel>
            );
          })}
      </Collapse>
    </div>
  );
}

export default CollapseMenu;
