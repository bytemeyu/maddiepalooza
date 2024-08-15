import React, { useEffect } from "react";
import { HeaderMaddie } from "../components/headerMaddie.tsx";
import { NavAdminPanelMaddie } from "../components/navAdminPanelMaddie.tsx";
import { Section } from "../components/basics/section.tsx";
import { UsersEditionList } from "../components/usersEditionList.tsx";
import { useAuth } from "../contexts/authContext.tsx";
import { LogoutButton } from "../components/basics/logoutButton.tsx";
import { FooterMaddie } from "../components/footerMaddie.tsx";

export const AdminPanelUsers = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.body.style.backgroundColor = isAuthenticated ? "#696969" : "";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [isAuthenticated]);

  return (
    <>
      <HeaderMaddie isAuthenticated={isAuthenticated} />

      <NavAdminPanelMaddie />

      <Section className="">
        <UsersEditionList
          className="font-beiruti-english text-2xl"
          divAddUserClassName="bg-orange-500"
          labelAddUserClassName=""
          inputAddUserClassName=""
          inputRoleAddUserClassName=""
          buttonAddUserClassName="font-beiruti-english text-xl md:text-2xl px-6 py-4 bg-orange-700"
          liClassName="font-beiruti-english text-2xl"
          buttonEditUserClassName="font-anton-sc-regular bg-orange-500 px-2 py-1"
          buttonRemoveUserClassName="font-anton-sc-regular bg-orange-500 px-2 py-1"
        />
      </Section>

      <LogoutButton className="font-beiruti-english bg-orange-500">
        Sair
      </LogoutButton>

      <FooterMaddie isAuthenticated={isAuthenticated} />
    </>
  );
};
