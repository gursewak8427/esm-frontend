import React, { useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCookie, getToken } from "../../../../helper/auth";
import axios from "axios";
import Cross from "../../../website/images/cross.png";
var firstTime = true;

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [permissions, setPermissions] = useState([]);

  const [state, setState] = useState({
    totalAgentsUnapproved: 0,
    totalAssessmentForms: 0,
    totalSearchQueryForms: 0,
    menu: -1,
    isWait: true,
  });

  const role = getCookie("role")

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: (
        <>
          <i class="fa-solid fa-chart-line"></i>
        </>
      ),
      path: "/d/admin/dashboard",
      matchings: ["dashboard"],
    },
    {
      label: "Roles",
      icon: (
        <>
          <i class="fa-solid fa-chart-line"></i>
        </>
      ),
      path: "/d/admin/roles",
      matchings: ["roles"],
      permission: "ROLES"
    },
    {
      label: "Employees",
      icon: (
        <>
          <i class="fa-solid fa-chart-line"></i>
        </>
      ),
      path: "/d/admin/employees",
      matchings: ["dashboard"],
      permission: "EMPLOYEES"
    },
    {
      label: "Salaries",
      icon: (
        <>
          <i class="fa-solid fa-chart-line"></i>
        </>
      ),
      path: "/d/admin/tasks",
      matchings: ["dashboard"],
      permission: "SALARIES"
    },
    {
      label: "Attendance",
      icon: (
        <>
          <i class="fa-solid fa-chart-line"></i>
        </>
      ),
      path: "/d/admin/tasks",
      matchings: ["dashboard"],
      permission: "ATTENDANCE"
    },
    {
      label: "Teams",
      icon: (
        <>
          <i class="fa-solid fa-chart-line"></i>
        </>
      ),
      path: "/d/admin/teams",
      matchings: ["dashboard"],
      permission: "TEAMS"
    },
    {
      label: "My Teams",
      icon: (
        <>
          <i class="fa-solid fa-chart-line"></i>
        </>
      ),
      path: "/d/admin/my-teams",
      matchings: ["dashboard"],
      permission: "MY_TEAMS"
    },
    {
      label: "Tasks",
      icon: (
        <>
          <i class="fa-solid fa-chart-line"></i>
        </>
      ),
      path: "/d/admin/tasks",
      matchings: ["dashboard"],
      permission: "TASKS"
    },
  ];

  useEffect(() => {
    if (role == "ADMIN") {
      setState({
        ...state,
        isWait: false,
      });
    } else {
      axios.post(process.env.REACT_APP_NODE_URL + "/users_roles/get_permissions", { role }).then((response) => {
        setPermissions(response.data.details.permissions)
        console.log({ permissions: response.data.details.permissions })
        setState({
          ...state,
          isWait: false,
        });

      });
    }
  }, []);

  return (
    <>
      {/* overlay */}
      <div
        className="overlay"
        id="overlay"
        onClick={() => {
          document.getElementById("aside").classList.toggle("show");
          document.getElementById("overlay").classList.toggle("show");
        }}
      ></div>
      <div
        id="aside"
        className={`xl:fixed h-screen transform ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col`}
      >
        {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
        <img
          className="closebar-btn"
          src={Cross}
          onClick={() => {
            document.getElementById("aside").classList.add("hidebar");
            document.getElementById("overlay").classList.add("hidebar");
          }}
        />
        {/* <div className="bg-[#e2e8f0] xl:flex justify-center p-3 items-center space-x-3"> */}
        {/* <img src="/assets/img/logo-main.png" className="w-10/12" alt="" /> */}
        {/* <svg width={34} height={34} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z" fill="white" />
                        </svg> */}
        {/* <p className="text-2xl leading-6 text-white">OvonRueden</p> */}
        {/* </div> */}
        <p className="roleStyle">
          <span>Welcome</span>
          {/* <p>{role}</p> */}
        </p>
        {state.isWait ? (
          <></>
        ) : (
          sidebarItems.map((singleItem, index) => {
            if (false) {
              // multi level sidebar
              // console.log({ isAdmin });
              // if (!permissions.includes(singleItem.permissions) && !isAdmin)
              //   return;

              return (
                <div
                  className={`flex flex-col justify-start items-center border-b border-gray-600 w-full ${state.menu == index ? "active-link-group" : ""
                    }`}
                >
                  <button
                    onClick={() => null}
                    className="focus:outline-none text-left text-white flex justify-between items-center w-full px-5 py-3 space-x-14"
                  >
                    <p className="text-left text-sm leading-5 uppercase">
                      {singleItem.label}
                    </p>
                    <svg
                      id="icon1"
                      className={`${state.menu != index ? "rotate-180" : "rotate-0"
                        }`}
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 15L12 9L6 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    className={`subGroupMenuItems ${state.menu != index ? "hidden-now" : "show-now"
                      } flex justify-end flex-col w-full items-end pb-1 `}
                  >
                    {singleItem.items.map((subItem) => {
                      if (
                        !permissions.includes(subItem.permissions)
                      )
                        return;
                      return (
                        <button
                          onClick={() => navigate(subItem.path)}
                          className={`${subItem.matchings.includes(active)
                            ? "active-link"
                            : ""
                            } flex justify-start items-center space-x-6 hover:text-white my-1 hover:bg-gray-700 text-gray-400 rounded-l w-11/12 py-3 px-4`}
                        >
                          <div className="w-4 subItemIconDot">
                            {/* {subItem.icon} */}
                          </div>
                          <p
                            className="sidebaritem text-left text-base leading-4"
                            style={{ marginLeft: "15px" }}
                          >
                            {subItem.label}{" "}
                            {subItem?.count || subItem?.count === 0 ? (
                              <span className="count" id={subItem.id}>
                                {subItem.count}
                              </span>
                            ) : (
                              <></>
                            )}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            } else {
              // single sidebar
              if (!permissions.includes(singleItem.permission) && singleItem.permission && role != "ADMIN") return;

              return (
                <>
                  <div
                    className={`pt-6 flex flex-col justify-start items-center pl-8 w-full border-gray-600 border-b space-y-3 pb-5 ${state.menu == index ? "active-link" : ""
                      }`}
                  >
                    <button
                      onClick={() => navigate(singleItem.path)}
                      className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded "
                    >
                      <span className="">{singleItem.icon}</span>
                      <p className="text-base leading-4">{singleItem.label}</p>
                    </button>
                  </div>
                </>
              );
            }
          })
        )}
      </div>
    </>
  );
};

export default Header;
