import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useEffect, useState } from "react";
import { getAllCommunities } from "../../api/community";
import { MainContentCard } from "../../components/MainContentCard";
import CreateCommunityModal from "../../components/Modals/CreateCommunityModal";
import { StyledH1 } from "../../components/Titles";

const Communities: FC = () => {
  const { isLoading, user: auth0user } = useAuth0();
  const [communities, setCommunities] = useState<any>();
  const fetchCommunities = async () => {
    const response = await getAllCommunities();
    console.log(response);
    setCommunities(response);
  };
  useEffect(() => {
    fetchCommunities();
  }, []);
  return (
    <MainContentCard>
      {!isLoading && !auth0user && <p>Log in to create communities.</p>}
      {!isLoading && auth0user && <StyledH1>Browse Communities</StyledH1>}
      <CreateCommunityModal />
      {communities?.map((community: any) => community.name)}
    </MainContentCard>
  );
};

export default Communities;
