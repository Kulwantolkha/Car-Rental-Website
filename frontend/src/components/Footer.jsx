import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20 bg-blue-100">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <img src={assets.logo} alt="logo" href="#" />
          <p className="mt-6 text-sm">
            Embark on your next adventure with ease. Discover the breathtaking
            beauty of India, from bustling city streets to serene landscapes,
            all from the comfort of your own car. Your journey, your story.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:text-primary" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+91 7727846777</p>
              <p>carrental@gmail.com</p>
              <div class="flex items-center gap-4 mt-8 text-indigo-500">
                <a
                  href="#"
                  class="hover:-translate-y-0.5 transition-all duration-300"
                >
                  <img src={assets.facebook_logo} alt="facebook_logo" />
                </a>
                <a
                  href="#"
                  class="hover:-translate-y-0.5 transition-all duration-300"
                >
                  <img src={assets.instagram_logo} alt="Instagram_logo" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kulwantolkha"
                  target="_blank"
                  class="hover:-translate-y-0.5 transition-all duration-300"
                >
                  <img src={assets.linkedin} alt="linkedIn_log" />
                </a>
                <a
                  href="https://www.github.com/Kulwantolkha"
                  target="_blank"
                  class="hover:-translate-y-0.5 transition-all duration-300"
                >
                  <img src={assets.github} alt="github_logo" />
                </a>
                <a
                  href="mailto:kulwantolkha@gmail.com"
                  target="_blank"
                  class="hover:-translate-y-0.5 transition-all duration-300"
                >
                  <img src={assets.gmail_logo} alt="gmail_logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2025 © <a href="#">CarRental</a>. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
