import React from 'react'
import './Header.css'

const Header = () => {
  const onClickHandler = () => {
    const foodSection = document.getElementById('food-display');
    if (foodSection) {
      foodSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the food section
    }
  }
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our motive is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <button onClick={onClickHandler}>View Menu</button>
        </div>
    </div>
  )
}

export default Header