import axios, { AxiosError } from "axios";
import Container from "../../components/Container";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FreeSubscriberUserListing from "./FreeSubscriberUserListing";
import ProSubsriberUserListing from "./ProSubsriberUserListing";

export default function Listing() {
  const { user } = useUser();

  return user.plan === "free" ? (
    <FreeSubscriberUserListing />
  ) : (
    <ProSubsriberUserListing />
  );
}
