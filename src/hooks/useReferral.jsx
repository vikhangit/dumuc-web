"use client"
import { useEffect, useState } from "react";
import _get from "lodash/get";
import { setCookie, getCookie } from "@apis/auth";
import { useRouter } from 'next/navigation'
import { COOKIE_REF_TOKEN } from "utils/constants";

export default function useReferral() {
  const router = useRouter();
  //======Referral Tracking=======
  const [refId, setRefId] = useState();
  
  useEffect(() => {
    if (getCookie(COOKIE_REF_TOKEN)) {
      setRefId(getCookie(COOKIE_REF_TOKEN));
    }
  });

  useEffect(() => {
    if (_get(router, "query.r")) {
      setCookie(COOKIE_REF_TOKEN, router.query.r);
      setRefId(router.query.r);
      router.replace(window.location.pathname);
    }
  }, [router.query.r]);
  //======Referral Tracking=======

  return refId;
}
