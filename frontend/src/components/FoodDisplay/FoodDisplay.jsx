import React, { useContext, useEffect } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { toast } from 'react-toastify';

const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery, searchTriggered, setSearchTriggered } = useContext(StoreContext);

  const filteredFoodList = food_list.filter(item => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      || item.description.toLowerCase().includes(searchQuery.toLowerCase())
      || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  useEffect(() => {
    if (searchTriggered) {
        if (filteredFoodList.length === 0) { 
            // Show error toast if no results found
            toast.error('No results found for your search.');
        }
        // Reset the searchTriggered state after handling
        setSearchTriggered(false);
    }
  }, [searchTriggered, filteredFoodList, setSearchTriggered]);

  return (
    <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {filteredFoodList.map((item, index) => (
                    <FoodItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
  )
}

export default FoodDisplay