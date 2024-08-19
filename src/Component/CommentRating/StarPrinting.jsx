import React, { useState, useEffect } from "react";
import { api_url, endpoints } from "../../Api/Api";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function StarPrinting({ blogids }) {
    // let receivedValue = blogids===undefined?[0]:blogids
  // console.log("Blog Received Ids",blogids);
  let api_link = api_url + endpoints.reviews;
  // console.log(api_link);
  let [blogdetails, setBlogdetails] = useState();
  let getApi = () => {
    axios
      .get(api_link)
      .then((res) => {
        setBlogdetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getApi();
  }, []);
  let filterRating = blogdetails?.filter((value) => value.blogid === blogids);
//   console.log(filterRating);
// console.log("blogids",blogids);
let totalValue=0

if(filterRating!=undefined)
{
  let filterRatingValue = filterRating?.map((value) => Number(value.review));
  // let filterRatingValue=[4,5,3,3,5]
  // console.log(filterRatingValue,"filter");
 if(filterRatingValue.length>0)
   totalValue = filterRatingValue?.reduce((prev, curr) => {
    return prev + curr;
  });

}
  
  // console.log("Total Value",totalValue);

  let averageRating = totalValue / filterRating?.length;
//   console.log("Avarage Value", averageRating);

  let randerStar = (inputStar) => {
    let stars = [];
    let fullStar = Math.floor(inputStar);
    let halfStar = inputStar % 1 !== 0;
    let emptyStar = 5 - fullStar;

    for (let i = 1; i <= fullStar; i++) {
      stars.push(<FaStar key={`full-${i}`} style={{ color: "orange" }} />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" style={{ color: "orange" }}/>);
    }

    for (let i = 1; i <= emptyStar; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  };
  return (
    <>
      {randerStar(averageRating)} {`(${filterRating?.length})`}
    </>
  );
}

export default StarPrinting;
