import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breadcrumbs from '../../components/Breadcrumbs';
import { BiSolidCommentEdit } from "react-icons/bi";
import { IoIosMenu } from "react-icons/io";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { AiOutlineFileProtect } from "react-icons/ai";
import { TbDeviceDesktopShare } from "react-icons/tb";
import { MdOutlineRateReview } from "react-icons/md";
import { FaMinusSquare } from "react-icons/fa";
import { CgCopy } from "react-icons/cg";
import { PiKeyReturnBold } from "react-icons/pi";
import { CgAlbum } from "react-icons/cg";
import { Link } from 'react-router-dom';


const CMS: React.FC = () => {
  
  return (
    <div className=' d-flex flex-column'>
      <Breadcrumbs pageName="Content Management" />
        <div className='container m-2 d-flex justify-content-center align-items-center flex-wrap bg-white rounded-1 p-2' style={{gap:"1rem"}}>
            <Link to='/cms/blog-list' className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-info cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <BiSolidCommentEdit/>
              <p className=' m-0 p-l10'>Blogs</p>
            </Link>

            <Link to="/cms/herosection" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-secondary cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <IoIosMenu/>
              <p className=' m-0 p-l10'>Herosection</p>
            </Link>

            <Link to="/cms/ad" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-secondary cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <IoIosMenu/>
              <p className=' m-0 p-l10'>Ad</p>
            </Link>

            <Link to="/cms/footer" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-success cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <BsMenuButtonWideFill/>
              <p className=' m-0 p-l10'>Footer</p>
            </Link>

            <Link to="/cms/header" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-warning cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <BiSolidCommentEdit/>
              <p className=' m-0 p-l10'>Header</p>
            </Link>

            <Link to="/cms/top-product" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-danger cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <AiOutlineFileProtect/>
              <p className=' m-0 p-l10'>Top Product</p>
            </Link>

            <Link to="/cms/best-product" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-info cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <AiOutlineFileProtect/>
              <p className=' m-0 p-l10'>Best Selling Product</p>
            </Link>


            <Link to="/cms/popular-product" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-info cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <AiOutlineFileProtect/>
              <p className=' m-0 p-l10'>Popular Product</p>
            </Link>

            <Link to="/cms/top-category" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-info cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <TbDeviceDesktopShare/>
              <p className=' m-0 p-l10'>Top Category</p>
            </Link>

            <Link to='/cms/review' className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-secondary cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <MdOutlineRateReview/>
              <p className=' m-0 p-l10'>Review</p>
            </Link>

            <Link to="/cms/terms-conditions" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-success cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <CgCopy/>
              <p className=' m-0 p-l10'>Term and Conditions</p>
            </Link>

            <Link to="/cms/privacy-policy" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-warning cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <CgAlbum/>
              <p className=' m-0 p-l10'>Privacy Policy</p>
            </Link>

            <Link to="/cms/return-policy" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-danger cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <PiKeyReturnBold/>
              <p className=' m-0 p-l10'>Return Policy</p>
            </Link>

            <Link to="/cms/about-us" className=' d-flex align-items-center text-white px-3 py-1  rounded-4 bg-secondary cms_cards' style={{fontSize:"xxx-large", cursor:"pointer"}}>
              <FaMinusSquare/>
              <p className=' m-0 p-l10'>About Us</p>
            </Link>
        </div>
    </div>
  );
};

export default CMS;