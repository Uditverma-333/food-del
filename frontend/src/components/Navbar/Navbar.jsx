import { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import FaTimes for the cross icon

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [isOpen, setIsOpen] = useState(false); // State to track if the dropdown is open

    const { getTotalCartAmount, token, setToken, searchQuery, setSearchQuery, setSearchTriggered, food_list } = useContext(StoreContext);

    const navigate = useNavigate(); // to navigate user to home page after he gets logged out
    const logout = () => { // removing the token will result in logout
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.success("Logged Out Successfully");
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim();

            if (query) {
                setSearchQuery(query);
                setSearchTriggered(true);

                // Apply the filter logic here to check if there are any results
                const filteredFoodList = food_list.filter(item => {
                    const matchesSearchQuery = item.name.toLowerCase().includes(query.toLowerCase())
                        || item.description.toLowerCase().includes(query.toLowerCase())
                        || item.category.toLowerCase().includes(query.toLowerCase());
                    return matchesSearchQuery;
                });

                // Scroll to the food display section only if there are matching results
                if (filteredFoodList.length > 0) {
                    const foodSection = document.getElementById('food-display');
                    if (foodSection) {
                        foodSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            } else {
                // Show error toast if the search query is empty
                toast.error('Please enter a valid search query.');
            }
        }
    };

    const handleNavigate = (path, sectionId) => {
        navigate(path);
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    };

    return (
        <div className='navbar'>
            <div className="navbar-left">
                <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />} {/* Toggle between hamburger and cross icons */}
                </div>
                <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
            </div>
            <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
                <Link to='/' onClick={() => { setMenu("home"); setIsOpen(false); }} className={menu === "home" ? "active" : ""}>home</Link>
                <Link to='/' onClick={() => { setMenu("menu"); handleNavigate('/', 'explore-menu'); setIsOpen(false); }} className={menu === "menu" ? "active" : ""}>menu</Link>
                <Link to='/' onClick={() => { setMenu("mobile app"); handleNavigate('/', 'app-download'); setIsOpen(false); }} className={menu === "mobile app" ? "active" : ""}>mobile app</Link>
                <Link to='/' onClick={() => { setMenu("contact us"); handleNavigate('/', 'footer'); setIsOpen(false); }} className={menu === "contact us" ? "active" : ""}>contact us</Link>
            </ul>
            <div className="search-container">
                <img src={assets.search_icon} alt="" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyUp={handleSearch} // Trigger search on Enter press
                />
            </div>
            <div className="navbar-right">
                <div className="navbar-cart-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button className='Sign-in' onClick={() => setShowLogin(true)}>Sign In</button> //if there doesn't exists a token then SignIn button 
                    //if token does exists then this div which removes sinup button and displays profile photo
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    );
};

export default Navbar;
