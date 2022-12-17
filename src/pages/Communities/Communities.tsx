import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCommunities } from "../../api/community";
import { MainContentCard } from "../../components/MainContentCard";
import CreateCommunityModal from "../../components/Modals/CreateCommunityModal";
import { StyledH1 } from "../../components/Titles";
import CommunityContext, { Community } from "../../contexts/CommunityContext";

const Communities: FC = () => {
  const { isLoading, user: auth0user } = useAuth0();
  const { communities, setCommunities } = useContext(CommunityContext);
  const fetchCommunities = async () => {
    const response = await getAllCommunities();
    console.log(response);
    setCommunities(response);
  };
  useEffect(() => {
    fetchCommunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainContentCard>
      {!isLoading && !auth0user && <p>Log in to create communities.</p>}
      {!isLoading && auth0user && <StyledH1>Browse Communities</StyledH1>}
      <CreateCommunityModal />
      {communities?.map((community: Community) => {
        return (
          <div>
            {community.name}
            <Link to={`/community?id=` + community._id}>Visit</Link>
          </div>
        );
      })}
    </MainContentCard>
  );
};

export default Communities;
