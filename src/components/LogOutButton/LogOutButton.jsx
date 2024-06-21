import React from "react";
import { useDispatch } from "react-redux";

function LogOutButton(props) {
  const dispatch = useDispatch();
  const logOut = () => {
    swal({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Log Out",
          value: true,
          visible: true,
          className: "",
          closeModal: true,
        },
      },
    }).then((value) => {
      if (value) {
        dispatch({ type: "LOGOUT" });
      }
    });
  };

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => logOut()}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
