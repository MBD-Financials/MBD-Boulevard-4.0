import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./SliderCard.module.css";
import images from "../../../img";
import LikeProfile from "../../LikeProfile/LikeProfile";

const SliderCard = ({ el, i }) => {
  return (
    <motion.div className={Style.sliderCard}>
      <div className={Style.sliderCard_box}>
        <motion.div>
          <Image
            className={Style.sliderCard_box_image}
            src={el.background}
            alt="slider profile"
            width={500}
            height={300}
            // style={{objectFit:"cover"}}
          />
        </motion.div>
        <div className={Style.sliderCard_box_title}>
          <p>NFT Video #{i + 1}</p>
          <div className={Style.sliderCard_box_title_like}>
            {/* <LikeProfile /> */}
            <small>{i + 4} 0f 100</small>
          </div>
        </div>

        <div className={Style.sliderCard_box_price}>
          <div className={Style.sliderCard_box_price_box}>
            <small>Current Bid</small>
            <p>{i + 2} ETH</p>
          </div>

          <div className={Style.sliderCard_box_price_time}>
            <p className="text-xs sm:text-xs">Remaining time</p>
            <p className="text-xs sm:text-xs">{i + 1}h : 15m : {i + 4}0s</p>
            
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SliderCard;
