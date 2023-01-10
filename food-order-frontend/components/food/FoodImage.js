import { useState, useRef } from "react";
import Image from "next/image";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
function FoodImage({ src, alt }) {
  return (
    <div className="w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg">
      <div className="relative h-96">
        <img
          src={src}
          alt={alt}
          layout="fill"
          style={{
            position: "absolute",
            inset: 0,
            padding: 0,
            border: "none",
            margin: "auto",
            display: "block",
            width: 0,
            height: 0,
            minWidth: "100%",
            maxWidth: "100%",
            minHeight: "100%",
            maxHeight: "100%",
          }}
        />
      </div>
    </div>
  );
}

export default FoodImage;
