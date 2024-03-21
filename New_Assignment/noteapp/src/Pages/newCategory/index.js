import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Component/Button";
import SelectField from "../../Component/Dropdrown";
import InputField from "../../Component/InputField/InputField";
import { Navigation } from "../../Component/Navigation";
import Sidebar from "../../Component/Sidebar";
import { setSelectedDropdownValue, setToggle } from "../../Slice/Slice";

import axios from "axios";
import Table from "../../Component/Table";



const NewCategory = () => {
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  const [isModelOpen, setIsModelOpen] = useState(false)

  const productStatus = useSelector((state) => state?.task?.selectedStatus);

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/user/category", {
        category: categoryName,
        description: description,
        status: productStatus,
      });
      alert("Item saved successfully");
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <div>
      <div className="">
        <Navigation />
        <div className="flex flex-col sm:flex-row">
          <Sidebar />
          <div className="flex flex-col sm:w-full">
            <div className="flex items-center justify-between p-4">
              <div
                className="p-5 font-bold flex gap-x-5"
                onClick={() => dispatch(setToggle(false))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <Button>Add Category</Button>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-4">
                <div className="flex gap-10">
                  <InputField
                    borderColor="border-gray-900"
                    textColor="black"
                    label="Category Name"
                    placeholder="Category Name"
                    name="category"
                    type="text"
                    value={categoryName}
                    onChange={setCategoryName}
                  />
                  <InputField
                    borderColor="border-gray-900"
                    textColor="black"
                    label="Description"
                    placeholder="Description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={setDescription}
                  />

                  <SelectField
                    options={options}
                    label="Status"
                    onChange={(selectedValue) =>
                      dispatch(setSelectedDropdownValue(selectedValue))
                    }
                  />
                </div>
              </div>
              <div className="flex gap-x-4 absolute right-0 px-10 bottom-0">
                <Button
                  classes={"border-2 rounded-lg px-6 py-1 border-[#5C218B]"}
                >
                  Cancel
                </Button>
                <Button
                  classes={
                    "border-2 rounded-lg px-6 py-1 border-[#5C218B] bg-[#5C218B] text-white "
                  }
                  type={"submit"}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
