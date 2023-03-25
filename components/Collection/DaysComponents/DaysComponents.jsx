import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./DaysComponents.module.css";
import images from "../../../img";

const DaysComponents = ({ el, i }) => {
  return (
    <div className={Style.daysComponent}>
      <div>
        <div>
          <Image
            src={el.background}
            className={Style.topImage}
            alt="profile background"
            width={500}
            height={300}
            
            style={{objectFit:"cover"}}
          />
        </div>

        <div className={Style.daysComponent_box_profile}>
          <Image
            className={Style.bottomLeftImage}
            src={images[`creatorbackground${i + 2}`]}
            alt="profile"
            width={200}
            height={200}
            style={{objectFit:"cover"}}
          />
          <Image
            className={Style.bottomCenterImage}
            src={images[`creatorbackground${i + 4}`]}
            alt="profile"
            width={200}
            height={200}
            style={{objectFit:"cover"}}
          />
          <Image
            className={Style.bottomRightImage}
            src={images[`creatorbackground${i + 3}`]}
            alt="profile"
            width={200}
            height={200}
            style={{objectFit:"cover"}}
          />
        </div>

        <div className={Style.daysComponent_box_title}>

          <h2 className={Style.collectionHeading}>Amazing Collection</h2>

          <div className={Style.daysComponent_box_title_info}>
            <div className={Style.daysComponent_box_title_info_profile}>
              <Image
                className={Style.avatarCollection}
                src={el.user}
                alt="profile"
                width={30}
                height={30}
                style={{objectFit:"cover"}}
              />

              <p className={Style.pCollection}>
              Creator Cain
              </p>
            </div>

            <div className={Style.daysComponent_box_title_info_price}>
              <small>{i + 4}.255 ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
