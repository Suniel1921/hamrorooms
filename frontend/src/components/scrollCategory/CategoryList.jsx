import React, { useEffect, useRef, useState } from "react";
import "./categorylist.css";
import { SiKashflow } from "react-icons/si";
import { GrFilter } from "react-icons/gr";
import { toast } from "react-toastify";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Modal, Slider, InputNumber } from "antd";
import { NavLink } from "react-router-dom";


const CategoryList = ({
  onCategoryClick,
  onAllClick,
  products,
  setPriceRange,
}) => {
  // State to manage loading state of category list
  const [isLoading, setIsLoading] = useState(true);

  // State to store the category list
  const [categoryList, setCategoryList] = useState([]);

  // State to manage the visibility of the filter modal
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // State to manage the price range filter
  const [priceRange, setPriceRangeLocal] = useState([0, 30000]);

  // State to store the currently selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Effect to fetch category data when the component mounts
  useEffect(() => {
    getAllCategory();
  }, []);

  // Ref to get the container element for smooth scrolling
  const containerRef = useRef(null);

  // Function to handle smooth scrolling of category list
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (container) {
      // ... (existing smooth scrolling logic)
    }
  };

  // Function to fetch all categories from the server
  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_URL}/api/v1/category/allCategory`
      );
      if (response.data.success) {
        // Set the fetched category list to state
        setCategoryList(response.data.allCategory);
      }
    } catch (error) {
      // Handle errors during category fetching
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      // Set loading state to false after category data is fetched
      setIsLoading(false);
    }
  };

  // Function to show the filter modal
  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  // Function to handle the OK action in the filter modal
  const handleFilterOk = () => {
    // Apply filter logic here
    setPriceRangeLocal(priceRange); // Update the local state
    setPriceRange(priceRange); // Update the parent state
    setIsFilterModalVisible(false);
  };

  // Function to handle the Cancel action in the filter modal
  const handleFilterCancel = () => {
    setIsFilterModalVisible(false);
  };

  // Function to filter products based on the price range
  const filteredProducts = products.filter((product) => {
    const productPrice = product.price; 
    return productPrice >= priceRange[0] && productPrice <= priceRange[1];
  });

  // Log the current price range for debugging
  // console.log("Price Range in CategoryList:", priceRange);

  // Function to handle the reset of the filter
  const handleResetFilter = () => {
    window.location.reload(); // Reload the entire page
  };

  // Function to handle a category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryClick(category);
  };

  return (
    <>
      {/* Main Category Section */}
      <section className="mainCategory">
        {/* Left Section for Category List */}
        <div
          className="leftSection category "
          ref={containerRef}
          onMouseMove={handleMouseMove}
        >
          {/* Render skeleton loading or category list based on loading state */}
          {isLoading ? (
            <div className="skeleton">
              {[...Array(11)].map((_, index) => (
                <div className="chilCategory" key={index}>
                  <i>
                    <Skeleton circle={true} height={30} width={30} />
                  </i>
                  <p>
                    <Skeleton height={10} width={55} />
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Render "All" button */}
              <div
                className={`chilCategory ${
                  selectedCategory === null ? "activeCategory" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(null);
                  onAllClick();
                }}
              >
                {/* <i>
                  <SiKashflow />
                </i> */}
               <div>
                <p>All</p>
               </div>
              </div>
              {/* Render category list */}
              {categoryList?.length > 0 ? (
                categoryList.map((category) => (
                  <div
                    className={`chilCategory ${
                      selectedCategory === category ? "activeCategory" : ""
                    }`}
                    key={category._id}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {/* <i>
                      <SiKashflow /> //this is for icon
                    </i> */}
                    <div className="categoryName">
                    <p>{category.name}</p>
                    </div>
                  </div>
                ))
              ) : (                
                <p>No categories available</p>                
              )}
            </>
          )}
        </div>

        {/* Right Section for Filter */}
        <div className="righSection">
          <div className="filter" onClick={showFilterModal}>
            <div className="filterbyPrice">
              {/* <div className="filterIonc"><GrFilter className='icon' /></div> */}
              <div className="filterIonc"><img className="filterImg" src="/img/filter2.png" alt="" /></div>
             <span className="filterText"> Filters</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ant Design Modal for Price Range Filter */}
      <Modal
        title="Filter By Price Range"
        open={isFilterModalVisible}
        onOk={handleFilterOk}
        onCancel={handleFilterCancel}
        okButtonProps={{ style: { backgroundColor: '#7571F9' } }} // Set background color for the Ok button
        cancelButtonProps={{ style: { backgroundColor: 'transparent', borderColor: '#7571F9', color: '#7571F9' } }} // Set styles for the Cancel button
      >
        {/* Slider for selecting price range */}
        <Slider
          range
          step={100}
          defaultValue={priceRange}
          min={0}
          max={30000}
          onChange={(value) => setPriceRangeLocal(value)}
          trackStyle={[{ backgroundColor: '#7571F9' }]} // Set track color for the Slider
          
        />
        {/* InputNumber components for fine-tuning the selected price range */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <InputNumber
            style={{ width: 100, borderColor: '#7571F9'}}
            value={priceRange[0]}
            onChange={(value) => setPriceRangeLocal([value, priceRange[1]])}
          />
          <InputNumber
            style={{ width: 100, borderColor: '#7571F9' }}
            value={priceRange[1]}
            onChange={(value) => setPriceRangeLocal([priceRange[0], value])}
          />
        </div>
        {/* Reset button to reset the filter and reload the page */}
        <div style={{ marginTop: 16 }}>
          <button className="resetBtn" onClick={handleResetFilter}>Reset</button>
        </div>
      </Modal>
    </>
  );
};

export default CategoryList;
