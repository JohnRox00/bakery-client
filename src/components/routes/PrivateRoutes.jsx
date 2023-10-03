import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) authCheck();
  }, [userInfo]);
  const authCheck = async () => {
    let url = "/api/v1/auth/user-auth";
    let requestOptions = {
      method: "POST",
      credentials: "include",
    };
    try {
      const res = await fetch(url, requestOptions);
      if (res.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    } catch (err) {
      console.log(err?.error?.message);
    }
  };
  return ok ? <Outlet /> : <Spinner path="" />;
};

export default PrivateRoute;
