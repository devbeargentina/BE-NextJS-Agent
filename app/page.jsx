"use client";

import Wrapper from "@/components/layout/Wrapper";
import ModalSigninSignup from "@/components/header/ModalSigninSignup";
import MainHome from "../app/(homes)/home_3/page";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getUser, logoutUser } from '@/features/hero/authSlice';
import { metadata } from './metadata'; // Import the metadata

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isUserLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.firstname) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <>
      <Wrapper>
        {isUserLoggedIn ? (<MainHome />) : (<ModalSigninSignup />)}
      </Wrapper>
    </>
  );
}
