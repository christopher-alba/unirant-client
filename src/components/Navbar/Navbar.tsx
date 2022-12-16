import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Dropdown, DropdownItemProps } from "semantic-ui-react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import { DefaultTheme, ThemeContext } from "styled-components";
import AuthContext from "../../contexts/AuthContext";
import themes from "../../themes/schema.json";
import {
  Brand,
  InnerDiv,
  NavbarMainDiv,
  NavContentWrapper,
  StyledLink,
  ThemeButton,
  StyledImg,
  DropdownButton,
  DropdownIconDiv,
  DropdownMenu,
} from "./styled";
import { useAuth0 } from "@auth0/auth0-react";
import { getSpecificCommunities } from "../../api/community";
import CommunityContext from "../../contexts/CommunityContext";

const Navbar: FC<{
  setSelectedTheme: Dispatch<SetStateAction<DefaultTheme>>;
}> = ({ setSelectedTheme }) => {
  const [dropdownState, setDropdownState] = useState(false);
  const { user, setUser, fetchingUser } = useContext(AuthContext);
  const { communities } = useContext(CommunityContext);
  const [userCommunities, setUserCommunities] = useState<any>();
  const theme = useContext(ThemeContext);
  const { logout: clientLogout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserCommunities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, communities]);

  const fetchUserCommunities = async () => {
    console.log(user);
    const communities = await getSpecificCommunities(
      user?.communitiesAdmin.concat(user.communitiesMember) as any
    );
    console.log(communities);
    setUserCommunities(communities);
  };

  const handleLogout = async () => {
    clientLogout({
      returnTo: window.location.origin + "/login",
    });

    setUser(undefined);
    setDropdownState(false);
  };
  const toggleThemeChange = () => {
    if (theme.name === "light") {
      setSelectedTheme(themes.dark);
    } else {
      setSelectedTheme(themes.light);
    }
  };
  const toggleDropdownMenu = () => {
    setDropdownState(!dropdownState);
  };
  return (
    <NavbarMainDiv>
      <Container>
        <InnerDiv>
          <NavContentWrapper>
            <Brand>Unirant</Brand>
            {user?._id ? (
              <>
                <StyledLink to="/">
                  <Icon name="home" /> Trending
                </StyledLink>
                <StyledLink to="/feed">
                  <Icon name="feed" /> Feed
                </StyledLink>
                <StyledLink to="/communities">
                  <Icon name="users" /> Communities
                </StyledLink>
              </>
            ) : (
              <>
                <StyledLink to="/">
                  <Icon name="home" /> Trending
                </StyledLink>
                <StyledLink to="/communities">
                  <Icon name="users" /> Communities
                </StyledLink>
              </>
            )}
          </NavContentWrapper>
          <NavContentWrapper>
            <ThemeButton onClick={toggleThemeChange}>Toggle Theme</ThemeButton>
            {fetchingUser ? (
              <span>Fetching User...</span>
            ) : isAuthenticated ? (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Dropdown
                  search
                  selection
                  placeholder="Your Communities"
                  options={userCommunities?.map((community: any) => {
                    return {
                      value: community.name,
                      text: community.name,
                      onClick: () => {
                        navigate("/community/" + community._id);
                      },
                    } as DropdownItemProps;
                  })}
                />
                <DropdownButton tabIndex={0} onClick={toggleDropdownMenu}>
                  <StyledImg
                    src={
                      user?.profilePicture ||
                      "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                    }
                    alt="profilePic"
                    referrerPolicy="no-referrer"
                  />
                  {user?.displayName}
                  <DropdownIconDiv>
                    <Icon name={dropdownState ? "caret up" : "dropdown"} />
                  </DropdownIconDiv>
                </DropdownButton>
                {dropdownState && (
                  <DropdownMenu>
                    <Link to="/profile">
                      <Button
                        basic
                        icon
                        fluid
                        inverted={theme.name === "dark"}
                        tabIndex={-1}
                        labelPosition="left"
                      >
                        <Icon name="user" />
                        Profile
                      </Button>
                    </Link>
                    <Link to="/settings">
                      <Button
                        basic
                        icon
                        fluid
                        inverted={theme.name === "dark"}
                        tabIndex={-1}
                        labelPosition="left"
                      >
                        <Icon name="settings" />
                        Settings
                      </Button>
                    </Link>
                    <Button
                      icon
                      fluid
                      basic
                      inverted={theme.name === "dark"}
                      onClick={handleLogout}
                      labelPosition="left"
                    >
                      <Icon name="log out" />
                      Logout
                    </Button>
                  </DropdownMenu>
                )}
              </div>
            ) : (
              <Button.Group>
                <Link to="/login">
                  <Button tabIndex={-1}>Login</Button>
                </Link>
                <Button.Or text="OR" />
                <Link to="/register">
                  <Button tabIndex={-1} primary>
                    Register
                  </Button>
                </Link>
              </Button.Group>
            )}
          </NavContentWrapper>
        </InnerDiv>
      </Container>
    </NavbarMainDiv>
  );
};

export default Navbar;
