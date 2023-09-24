import React from "react";
import styled from "styled-components";

const Footer = () => {
  const FooterStyled = styled.div`
    background: linear-gradient(155deg, #00b4aa 6.67%, #a4d96c 84.1%);
  `;
  return (
    <FooterStyled>
      <div className="flex flex-col gap-y-10 px-28 py-10">
        {/* <div className="w-full h-[2px] bg-[#00D1ED]"></div> */}
        <div className="flex items-start justify-between gap-x-72">
          <img
            src="/giffooter.gif"
            alt="giffooter"
            className="w-[250px] h-[250px] rounded-full max-md:hidden"
            loading="lazy"
          />
          <div className="flex flex-col gap-y-10 py-14">
            <h4 className="font-bold text-white text-2xl">Follow Me</h4>
            <div className="flex items-center justify-between p-2 gap-5">
              <a
                href="https://www.facebook.com/tansama01"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer"
                lo
              >
                <i
                  class="fa-brands fa-facebook fa-bounce fa-2xl"
                  style={{ color: "#E7ECF3" }}
                ></i>
              </a>
              <a
                href="https://twitter.com/RioKun60709186"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer"
              >
                <i
                  class="fa-brands fa-twitter fa-bounce fa-2xl"
                  style={{ color: "#E7ECF3" }}
                ></i>
              </a>
            </div>
          </div>
          <iframe
            width={905}
            height={509}
            src="https://www.youtube.com/embed/lbvzkdYqJDc"
            title="Hot Chelle Rae - I Like It Like That ft. New Boyz"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="flex-1 h-[250px] rounded-2xl"
            allowFullScreen
          />
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
