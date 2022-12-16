import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSpecificCommunities } from "../../api/community";
import { MainContentCard } from "../../components/MainContentCard";
import { Name, Wallpaper, WallpaperWrapper } from "./styled";

const Community: FC = () => {
  const [community, setCommunity] = useState<any>();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    fetchCommunity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const fetchCommunity = async () => {
    setCommunity(
      (await getSpecificCommunities([searchParams.get("id") as any]))[0]
    );
  };
  if (community) {
    return (
      <MainContentCard>
        <WallpaperWrapper>
          <Name>{community.name} Community</Name>
          <Wallpaper src={community.wallpaper} />
        </WallpaperWrapper>
      </MainContentCard>
    );
  } else {
    return <p>Attempting to fetch community...</p>;
  }
};

export default Community;
