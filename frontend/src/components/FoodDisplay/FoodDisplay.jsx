import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery } = useContext(StoreContext);

  const filteredFoodList = food_list.filter(item => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      || item.description.toLowerCase().includes(searchQuery.toLowerCase())
      || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

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