import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import Button from "../../Component/Button";
import { Navigation } from "../../Component/Navigation";
import SearchBar from "../../Component/Searchbar";
import Sidebar from "../../Component/Sidebar";
import axios from "axios";
import NewTable from "../../Component/Table/NewTable";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../Slice/Slice";
import NewCategory from "../newCategory";
import Modal from "../../Component/Modal/Modal";

const Category = () => {
  const dispatch = useDispatch();
  const isToggleScreen = useSelector((state) => state?.task?.screenToggle);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/getAllCategoryData"
        );
        setCategoryData(response.data);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const deleteCatgoryItem = async (id) => {
    console.log("open---");

    setIsModalOpen(true);

    try {
      await axios.delete(`http://localhost:5000/api/user/deleteCategory/${id}`);
      const response = await axios.get(
        "http://localhost:5000/api/user/getAllCategoryData"
      );
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteIconClick = () => {
    deleteCatgoryItem();

  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const filterProduct = categoryData?.filter((el) => {
    return el?.category?.toLowerCase()?.includes(searchText?.toLowerCase());
  });
  


 

  return (
    <div className="">
      {isToggleScreen ? (
        <NewCategory />
      ) : (
        <div>
          <Navigation />
          <div className="flex flex-col sm:flex-row">
            <Sidebar />
            <div className="flex flex-col sm:w-full">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                    />
                  </svg>
                  <p className="font-bold text-lg">Category</p>
                </div>
                <div>
                  <SearchBar searchText={searchText} onChange={setSearchText} placeholder={"Search by category"} />
                </div>
                <div className="flex items-center">
                  <Button
                    classes="bg-[#5C218B] text-white px-6 py-2 rounded-md ml-2"
                    onClick={() => dispatch(setToggle(true))}
                  >
                    Add New
                  </Button>
                </div>
              </div>

              <div className="p-4">
              {/* {filterProduct.length > 0 } */}
                <NewTable
                  columns={[
                    "ID",
                    "Category",
                    "Description",
                    "Status",
                    "Edit/Delete",
                  ]}
                  Data={filterProduct}
                  onClick={deleteCatgoryItem}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
            </div>
            {isModalOpen && <Modal />}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default Category;
