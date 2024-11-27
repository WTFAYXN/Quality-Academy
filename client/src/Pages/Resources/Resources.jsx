
import React from 'react';
import './Resources.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import line from "../../assets/svgs/Line.svg";
import download from "../../assets/images/download-icon.png";
import filter from "../../assets/svgs/filter.svg";
import upload from "../../assets/svgs/upload.svg";

const Resources =() => {
    return ( 
        <>

        <Navbar />

        <div class="heading-resources">
            <h1 class="heading-resources-text">Elevate your knowledge with Our Resources</h1>
            <img src={line} />
            <p class="heading-p">One solution for your Education Preparation</p>
        </div>

<div class="resources">
    <div class="search-filter">
    <input className='resources-search' type="text" placeholder="Search Resources" />
    <div class="resource-button">
    <button className='upload'> <img src={upload} /> </button>
    <button className='filter'> <img src={filter} /> </button>
    </div>
    </div>
    
    <div class="resource-grid">
     <div>
        <img src="https://i.pinimg.com/736x/28/c1/2c/28c12c12a4e8776324f5195200d4db05.jpg" />
            <div class="download-resources">
            <h3> Hello World</h3>
            <img src={download} />

            </div>
        </div>
        <div></div>
        <div></div>
</div>

</div>


        <Footer />  
        </>
    )
}

export default Resources